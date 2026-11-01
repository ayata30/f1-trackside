import { useEffect, useState } from "react";

function DriverStandings({ sessionKey }) {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionKey) {
      setDrivers([]);
      setError("");
      return;
    }

    const controller = new AbortController();

    async function fetchDriverStandings() {
      setLoading(true);
      setError("");
      setDrivers([]);

      try {
        const [standingsResponse, driversResponse] = await Promise.all([
          fetch(
            `https://api.openf1.org/v1/championship_drivers?session_key=${encodeURIComponent(sessionKey)}`,
            { signal: controller.signal }
          ),
          fetch(
            `https://api.openf1.org/v1/drivers?session_key=${encodeURIComponent(sessionKey)}`,
            { signal: controller.signal }
          )
        ]);

        if (!standingsResponse.ok || !driversResponse.ok) {
          throw new Error("Failed to load standings.");
        }

        const [standings, driverInfo] = await Promise.all([
          standingsResponse.json(),
          driversResponse.json()
        ]);

        const combined = standings.map((standing) => {
          const driver = driverInfo.find(
            (d) => d.driver_number === standing.driver_number
          );

          return {
            ...standing,
            driverName: driver ? driver.full_name : "Unknown Driver"
          };
        });

        combined.sort(
          (a, b) => a.position_current - b.position_current
        );

        setDrivers(combined);

      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Could not load driver standings.");
          console.error(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchDriverStandings();

    return () => controller.abort();
  }, [sessionKey]);

  return (
    <section className="drivers-standings">
      <h2>Drivers' Championship</h2>

      {!sessionKey && <p>Select a race session to view standings.</p>}

      {loading && <p>Loading driver standings...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && sessionKey && drivers.length === 0 && (
        <p>No standings available for this session.</p>
      )}

      {drivers.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Pos.</th>
              <th>Driver</th>
              <th>Points</th>
            </tr>
          </thead>

          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.driver_number}>
                <td>{driver.position_current}</td>
                <td>{driver.driverName}</td>
                <td>{driver.points_current}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default DriverStandings;
