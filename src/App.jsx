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
import ConstructorStandings from "./components/ConstructorStandings";

function App() {

  const [raceResult, setraceResult] = useState([])

  const [drivers, setDrivers] = useState([])
  const [meetingKey, setMeetingKey] = useState("");
  const [sessionKey, setSessionKey] = useState("");


  const leaderboard = raceResult.map((result) =>{
    const driver = drivers.find(
      (driver) => driver.driver_number == result.driver_number
    )

    return {
      position: result.position,
       name: driver ? driver.full_name : "Unknown Driver",
    team: driver ? driver.team_name : "Unknown Team",
   
    };
  }
);


useEffect(() => {
  fetch("https://api.openf1.org/v1/drivers?session_key=latest")
    .then((response) => response.json())
    .then((jsonContent) => {
      console.log("COMPARISON DRIVERS:", jsonContent);

      if (Array.isArray(jsonContent)) {
        setDrivers(jsonContent);
      }
    })
    .catch((error) => {
      console.error("DRIVER ERROR:", error);
    });
}, []);

  useEffect(()=> {
    if (!sessionKey) return;
    fetch(`https://api.openf1.org/v1/drivers?&session_key=${sessionKey}`,
    )
    .then((response) => response.json())
    .then((jsonContent) => {

     console.log("DRIVERS:",jsonContent)
     if (Array.isArray(jsonContent)) {
    setDrivers(jsonContent)
}
   
    });



  }, [sessionKey] )

  useEffect (() =>{
      if (!sessionKey) return;

    console.log("SELECTED SESSION:", sessionKey);


    fetch(`https://api.openf1.org/v1/session_result?session_key=${sessionKey}`) 
    .then((response) => response.json())
    .then((jsonContent) => {
        console.log("race results:", jsonContent);

        if (Array.isArray(jsonContent)) {
                setraceResult(jsonContent);
            } else {
                console.error("Session result API did not return an array:", jsonContent);
      
        }
        
})
.catch(error => {
            console.error("RESULT ERROR:", error);
        });
   }, [sessionKey]);




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
    
     
  )
}


export default App
