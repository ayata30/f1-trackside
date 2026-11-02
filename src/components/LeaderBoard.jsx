function LeaderBoard({ leaderboard }) {

     const sortedLeaderBoard = [...leaderboard].sort(

                (a, b) => a.position - b.position );
            
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
                <tr key={driver.drivevr_number}>
                   <td>{driver.position}</td>
                    <td>{driver.name}</td>
                    <td>{driver.team}</td>
                    <td>{driver.points}</td>
                   
                </tr>
                
            ))}
           
                </tbody>
                 console.log("Leaderboard:", leaderboard);
                </table>
            )
            }
            
        </>
    );
}

export default LeaderBoard;