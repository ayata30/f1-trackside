function LeaderBoard({ leaderboard }) {
    return (
        <>
            <h1>Race leaderboard </h1>

            {leaderboard.length === 0 ? (
                <p> No results avaliable for this session yet.</p>
            ):(
                
            leaderboard.map((driver) => (
                <div key={driver.position}>
                   <h3>{driver.position}</h3>
                    <p>{driver.name}</p>
                    <p>{driver.team}</p>
                   
                </div>
            ))
            )}
        </>
    );
}

export default LeaderBoard;