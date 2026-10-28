
function DriverStandings(){
    return(
        <>
        fetch(
            `https://api.openf1.org/v1/championship drivers?
        sessionkey={meetingKey} `){
            .then((res) => res.json())
            .then
            .then((data) =>{
                console.log(data)
            })
           
        }
        
        
        </>
    )
}
export default App;
