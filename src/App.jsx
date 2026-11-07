import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
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
            setDrivers(Array.isArray(data) ? data : []);
        })
        .catch(error => console.error("DRIVER ERROR:", error));
}, [sessionKey]);

        useEffect(() => {
        setRaceResult([]);

        if (!sessionKey) return;

        getSessionResults(sessionKey)
            .then((data) => {
                console.log("RACE RESULTS:", data);
                setRaceResult(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                console.error("RESULT ERROR:", error);
            });
    }, [sessionKey]);

console.table(
  raceResult.map(result => ({
    driver_number: result.driver_number,
    position: result.position,
    points: result.points
  }))
);


              const leaderboard = [...raceResult]
          .sort((a, b) => {
              const positionA = Number(a.position);
              const positionB = Number(b.position);

              const invalidA =
                a.position == null ||
                a.position === "" ||
                !Number.isFinite(positionA) ||
                positionA <= 0;

              const invalidB =
                b.position == null ||
                b.position === "" ||
                !Number.isFinite(positionB) ||
                positionB <= 0;

              if (invalidA && !invalidB) return 1;
              if (!invalidA && invalidB) return -1;
              if (invalidA && invalidB) return 0;

              return positionA - positionB;
          })
         .map((result) => {
        const driver = drivers.find(
            (driver) =>
                String(driver.driver_number) ===
                String(result.driver_number)
        );
        console.table(
  raceResult.map(result => ({
    driver_number: result.driver_number,
    position: result.position,
    status: result.status,
    points: result.points
  }))
);

        return {
            driver_number: result.driver_number,
            position: result.position,
            name: driver ? driver.full_name : "Unknown Driver",
            team: driver ? driver.team_name : "Unknown Team",
            points: result.points ?? "—",
        };
    });
   

    console.table(
  raceResult.map(result => ({
    driver_number: result.driver_number,
    position: result.position,
    status: result.status,
    points: result.points
  }))
);

  
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

      <section className="panel leaderboard-panel">
        <LeaderBoard leaderboard={leaderboard} />
      </section>

      <div className="standings-grid">
        <section className="panel">
          <ConstructorStandings sessionKey={sessionKey} />
        </section>

        <section className="panel">
          <DriverStandings sessionKey={sessionKey} />
        </section>
      </div>

      <section className="panel comparison-panel">
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
