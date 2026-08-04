function DriverCard(props){
    return(
        <div>
            <section>
                <h1>DriverCard</h1>
                <p>{props.name}</p>
                <p>{props.number}</p>
                <p>{props.team}</p>
            </section>
        </div>
    )

}

export default DriverCard