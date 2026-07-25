import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [sessions, setSessions] = useState([])

  const [raceResult, setraceResult] = useState([])

  useEffect (() =>{
    fetch("https://api.openf1.org/v1/session_result?session_key=11338&position%3C=10",

    ) 
    .then((response) => response.json())
    .then((jsonContent) => {
      console.log(jsonContent)
      setraceResult(jsonContent)
    }); 

  }, []

  )

  useEffect (() => {
   fetch(
  "https://api.openf.org/v1/sessions?country_name=Hungary&session_name=Qualifying&year=2026",
)
  .then((response) => response.json())
  .then((jsonData) => { 
      console.log(jsonData)
      setSessions(jsonData)

}); }, []

)

  return (
    <div>
      <h1> F1 Trackside</h1>
      <p> Welcome to a Formula1 dashboard </p>
       <pre>{JSON.stringify(sessions, null, 2)}</pre>
       <p> ==================================================</p>
        <pre>{JSON.stringify(raceResult, null, 2)}</pre>
  
    </div>
     
  )
}


export default App
