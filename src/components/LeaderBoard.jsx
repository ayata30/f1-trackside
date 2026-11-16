function LeaderBoard({ leaderboard }) {

    if (leaderboard.length === 0){
        return (
            <>
                <h2>Race Leaderboard</h2>
                <p>No results avaliable for this session yet.</p>
            </>
        );
    }
    
    return (
        <>
            <h2>Race Leaderboard </h2>

                <table>
                    <thead>
                     <tr>
                        <th>Pos. </th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Laps</th>
                        <th>Gap</th>
                        <th>Points</th>
                        <th>Status</th>
                     </tr>
                    </thead>

            <tbody>
                {leaderboard.map((driver)  => (
                <tr key={driver.driver_number}
                    className={driver.position === 1 ? "winner-row" : ""}
                >
                 <td>
                {driver.position ?? "—"}
                 </td>

                <td>
                    <span
                    className="team-indicator"
                    style={{ backgroundColor: `#${driver.team_colour}` }}
                    />
                    {driver.name}
                </td>

                    <td>{driver.team}</td>
                    <td>{driver.laps}</td> 

                <td>
                    {driver.position === 1 
                        ? "-" 
                        : driver.gap != null 
                              ? String(driver.gap).toUpperCase().includes("LAP")
                                 ? String(driver.gap).replace(/LAP/i, "Lap")
                                : Number.isFinite(Number(driver.gap))
                                     ? `+${Number(driver.gap).toFixed(3)} s` 
                                    : "-"
                            : "-"}
                </td>

                <td>{driver.points}</td>
                <td>{driver.status}</td>
            
                </tr>
               ))}
               </tbody>
            </table>
        </>
    );
}

export default LeaderBoard;