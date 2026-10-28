import { useState } from "react";

function DriverComparison({ drivers, raceResult }) {

  const [driver1, setDriver1] = useState("");
  const [driver2, setDriver2] = useState("");

  const selectedDriver1 = drivers.find(
    (driver) => driver.driver_number == driver1
  );

  const selectedDriver2 = drivers.find(
    (driver) => driver.driver_number == driver2
  );
  const result1 = raceResult.find(
  (result) => result.driver_number == driver1
);

const result2 = raceResult.find(
  (result) => result.driver_number == driver2
);

  return (
    <div>
      <h2>Driver Comparison</h2>

      <select
        value={driver1}
        onChange={(e) => setDriver1(e.target.value)}
      >
        <option value="">Select Driver</option>

        {drivers.map((driver) => (
          <option
            key={driver.driver_number}
            value={driver.driver_number}
          >
            {driver.full_name}
          </option>
        ))}
      </select>

      <select
        value={driver2}
        onChange={(e) => setDriver2(e.target.value)}
      >
        <option value="">Select Driver</option>

        {drivers.map((driver) => (
          <option
            key={driver.driver_number}
            value={driver.driver_number}
          >
            {driver.full_name}
          </option>
        ))}
      </select>

      

      {driver1 && driver2 && (
        <div>
          <h3>Comparison</h3>

            <h4>{selectedDriver1?.full_name}</h4>
    <p>Team: {selectedDriver1?.team_name}</p>
    <p>Position: {result1?.position}</p>

    <h4>{selectedDriver2?.full_name}</h4>
    <p>Team: {selectedDriver2?.team_name}</p>
    <p>Position: {result2?.position}</p>

       
        </div>
      )}
    </div>
  );
}

export default DriverComparison;