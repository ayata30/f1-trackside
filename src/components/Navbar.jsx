import { Link } from "react-router-dom";

function Navbar(){


    return (
        <nav> 
            <section className="nav-buttons">
            

                <Link to="/ai-rundown">
                <button>AI rundown</button></Link>
                <Link to="/standings">
                <button>Standings</button></Link>
            </section>

        </nav>
    )
}

export default Navbar