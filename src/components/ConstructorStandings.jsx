
import { useEffect, useState } from "react";

function ConstructorStandings({ sessionKey }) {
  const [constructors, setConstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionKey) {
      setConstructors([]);
      setError("");
      return;
    }

    const controller = new AbortController();

    async function fetchConstructorStandings() {
      setLoading(true);
      setError("");
      setConstructors([]);

      try {
        const response = await fetch(
          `https://api.openf1.org/v1/championship_teams?session_key=${encodeURIComponent(sessionKey)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to load constructor standings.");
        }

        const data = await response.json();

        const sortedConstructors = data.sort(
          (a, b) => a.position_current - b.position_current
        );

        setConstructors(sortedConstructors);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Could not load championship standings.");
          console.error(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchConstructorStandings();

    return () => controller.abort();
  }, [sessionKey]);

  return (
    <section className="constructor-standings">
      <h2>Constructors' Championship</h2>

      {!sessionKey && (
        <p>Select a race session to view championship standings.</p>
      )}

      {loading && <p>Loading constructor standings...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading &&
        !error &&
        sessionKey &&
        constructors.length === 0 && (
          <p>
            No standings available. Choose a completed or supported
            race session.
          </p>
        )}

      {constructors.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Pos.</th>
              <th>Constructor</th>
              <th>Points</th>
            </tr>
          </thead>

          <tbody>
            {constructors.map((team) => (
              <tr key={team.team_name}>
                <td>{team.position_current}</td>
                <td>{team.team_name}</td>
                <td>{team.points_current}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default ConstructorStandings;
