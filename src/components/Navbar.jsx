import { NavLink } from "react-router-dom";

function Navbar(){
      const links = [
    { href: "#", label: "Home"},
     { href: "#leaderboard", label: "Leaderboard" },
    { href: "#standings", label: "Standings" },
  ///  { href: "#ai-rundown", label: "AI Rundown" },
    { href: "#about", label: "About" },
    { href: "#comparison", label: "Driver Comparison" },
  //  { href: "#f1-dict", label: "F1 Dictionary" },
  ];



    return (
        <nav className="navbar"> 
        <div className="navbar-inner">
        <a href="#" className="nav-brand">
          <span className="brand-mark">F1</span>
          <span className="brand-name">
            TRACKSIDE
            <span className="brand-period">.</span>
          </span>
        </a>

        <div className="nav-buttons" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
         
              className="nav-link" >

              {link.label}
            </a>
          ))}
        </div>
      </div>
    
        </nav>
    )
}

export default Navbar