import { useState, useEffect } from 'react'
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import RaceCard from "./components/RaceCard"
import './App.css'

function App() {


  const [raceResult, setraceResult] = useState([])

  const [drivers, setDrivers] = useState([])


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

  useEffect(()=> {
    fetch("https://api.openf1.org/v1/drivers?&session_key=latest",
    )
    .then((response) => response.json())
    .then((jsonContent) => {

     console.log(jsonContent)
     if (Array.isArray(jsonContent)) {
    setDrivers(jsonContent)
}
   
    });



  }, [] )

  useEffect (() =>{
    fetch("https://api.openf1.org/v1/session_result?session_key=latest&position%3C=20",

    ) 
    .then((response) => response.json())
    .then((jsonContent) => {
        console.log(jsonContent)

  if (Array.isArray(jsonContent)) {
    setraceResult(jsonContent)
  }
})
   }, [])




  return (
    <div>
    
       <Hero />
      <Navbar/> 
      <RaceCard />

   
       {leaderboard.map((driver) => (
  <div key={driver.position}>
    <h3>P{driver.position}</h3>
    <p>{driver.name}</p>
    <p>{driver.team}</p>
    <hr />

  </div>
))}
  
    <Footer/>
    </div>
    
     
  )
}


export default App
