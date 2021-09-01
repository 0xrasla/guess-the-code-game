import { Link } from "react-router-dom";
import "../styles/index.css";

function NaveBar() {
  return (
    <header>
      <nav className="navebar">
        <h2>LazyCode</h2>
        <ul>
          <li>
            <Link to="/" className="nav-btn">
              Home
            </Link>
          </li>
          <li>
            <Link to="/game" className="nav-btn">
              Play
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NaveBar;
