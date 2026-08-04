import { useState } from "react";


function RaceSelector(){

    const [selectedRace, setSelectedRace] = useState("");

    return(
        <section >

  
        <div>
            <h2>Select Race</h2>

            <select className="select-btn">
                <option>Belgian Grand Prix</option>
                <option>British Grand Prix</option>
                <option>Monaco Grand Prix</option>
            </select>

        </div>
              </section>
    )
}

export default RaceSelector;