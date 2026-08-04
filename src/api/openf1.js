 
 export async function getDrivers(){
    const response = await fetch(
        "https://api.openf1.org/v1/drivers"
    );

    return response.json
    }
 
 
 
 
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


