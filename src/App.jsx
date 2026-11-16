import { useState, useEffect } from 'react'
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import LeaderBoard from "./components/LeaderBoard";
import './App.css'
import RaceSelector from './components/RaceSelector'
import SessionSelector from "./components/SessionSelector"
import DriverComparison from "./components/DriverComparison";
import DriverStandings from "./components/DriverStandings";
import ConstructorStandings from "./components/ConstructorStandings";
import { getDrivers, getSessionResults } from "./api/openf1";

function App() {

  const [raceResult, setRaceResult] = useState([])
  const [drivers, setDrivers] = useState([])
  const [meetingKey, setMeetingKey] = useState("");
  const [sessionKey, setSessionKey] = useState("");


useEffect(() => {
    if (!sessionKey) return;
    getDrivers(sessionKey)
        .then(data => {
          console.log("DRIVER SAMPLE:", data[0]);
            setDrivers(Array.isArray(data) ? data : []);
        })
        .catch(error => console.error("DRIVER ERROR:", error));
     
}, [sessionKey]);

        useEffect(() => {
  setRaceResult([]);

  if (!sessionKey) return;

  console.log("FETCHING RESULTS FOR SESSION:", sessionKey);

  getSessionResults(sessionKey)
    .then((data) => {
      console.log("RESULTS RECEIVED:", data);
      console.log("RESULTS ARRAY?", Array.isArray(data));

      setRaceResult(Array.isArray(data) ? data : []);
    })
    .catch((error) => {
      console.error("RESULT FETCH FAILED:", error);
    });
}, [sessionKey]);


    const leaderboard = [...raceResult]
  .sort((a, b) => {
    // Classified drivers first, ordered by position.
    if (a.position != null && b.position != null) {
      return a.position - b.position;
    }

    if (a.position != null) return -1;
    if (b.position != null) return 1;

    // Keep unclassified drivers together.
    return b.number_of_laps - a.number_of_laps;
  })
  .map((result) => {
    const driver = drivers.find(
      (driver) =>
        String(driver.driver_number) === String(result.driver_number)
    );

    let status = "Finished";

    if (result.dsq) {
      status = "Disqualified";
    } else if (result.dns) {
      status = "Did not start";
    } else if (result.dnf) {
      status = "Did not finish";
    }

    return {
      
      driver_number: result.driver_number,
      position: result.position,
      name: driver?.full_name ?? "Unknown Driver",
      team: driver?.team_name ?? "Unknown Team",
      team_colour: driver?.team_colour ?? "64748b",
      points: result.points ?? 0,
      laps: result.number_of_laps ?? 0,
      gap: result.gap_to_leader,
      status,
    };
  });
 

return (
  <div className="app">
    <header className="app-header">
      <Hero />
      <Navbar />
    </header>

    <main className="dashboard">

      <div className="selector-row">
        <section className="panel selector-panel">
          <h2>Races</h2>
          <RaceSelector
            meetingKey={meetingKey}
            setMeetingKey={setMeetingKey}
          />
        </section>

        <section className="panel selector-panel">
          <h2>Sessions</h2>
          <SessionSelector
            race={meetingKey}
            sessionKey={sessionKey}
            setSessionKey={setSessionKey}
          />
        </section>
      </div>

      <section id="leaderboard" className="panel leaderboard-panel">
        <LeaderBoard leaderboard={leaderboard} />
      </section>

      <div  id="standings" className="standings-grid">
        <section className="panel">
          <ConstructorStandings sessionKey={sessionKey} />
        </section>

        <section className="panel">
          <DriverStandings sessionKey={sessionKey} />
        </section>
      </div>

      <section  id="comparison" className="panel comparison-panel">
        <DriverComparison
          drivers={drivers}
          raceResult={raceResult}
        />
      </section> 

    </main>

    <Footer />
  </div>
);

}

export default App;
