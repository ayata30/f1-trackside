function LeaderBoard({ leaderboard }) {

     const sortedLeaderBoard = [...leaderboard].sort(

                (a, b) => a.postion - b.position );
            
    return (
        <>
            <h1>Race leaderboard </h1>

            {leaderboard.length === 0 ? (
                <p> No results avaliable for this race yet.</p>
            ):(

                <table>
                    <thead>
                     <tr>
                        <th> Pos. </th>
                        <th> Driver</th>
                        <th>Team</th>
                        <th>Points</th>
                     </tr>
                
                    </thead>


            <tbody>
            {sortedLeaderBoard.map((driver) => (
                <tr key={driver.position}>
                   <td>{driver.position}</td>
                    <td>{driver.name}</td>
                    <td>{driver.team}</td>
                    <td>{driver.points}</td>
                   
                </tr>
            ))}
                </tbody>
                </table>
            )
            }
        </>
    );
}

export default LeaderBoard;