import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import DriverCard from "./components/DriverCard"
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
            console.log("DRIVERS:", data);
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

           const leaderboard = raceResult.map((result) => {
        const driver = drivers.find(
            (driver) =>
                String(driver.driver_number) ===
                String(result.driver_number)
        );

        return {
            driver_number: result.driver_number,
            position: result.position,
            name: driver ? driver.full_name : "Unknown Driver",
            team: driver ? driver.team_name : "Unknown Team",
            points: result.points ?? "—",
        };
    });
   

  return (
    <div className="app">
      <Hero />
      <Navbar/> 
      
      <main>
        <section className="panel" >
        <h2>Races</h2>
      <RaceSelector
      meetingKey={meetingKey}
      setMeetingKey={setMeetingKey}
      />
    </section>


     <section className="panel">
      <h2>Sessions</h2>
      <SessionSelector 
          race={meetingKey}
          sessionKey={sessionKey}
          setSessionKey={setSessionKey} 
          />
      </section>

    
    <section className="panel" >
        <LeaderBoard leaderboard={leaderboard} />
        
        </section>

          <section className="panel" >
        <ConstructorStandings sessionKey={sessionKey} />
    </section>

          <section className="panel" >
        <DriverStandings sessionKey={sessionKey} />
    </section>

    <section className="panel" >
      <DriverComparison
      drivers={drivers}
      raceResult={raceResult}
    />
    </section>

        <Routes>
            <Route path="/ai-rundown"  />
            <Route path="/standings"  />
        </Routes>
      </main>
        
      <Footer/>
    </div>
    
     
  );
}

export default App;
