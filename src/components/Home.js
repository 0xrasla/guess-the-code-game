import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <div>
        <h1>
          Hey! Welcome To <span>FindtheCode!</span> <br /> Lets Check Your
          Coding Skills
        </h1>
        <p>Made by Rasla</p>
        <button>
          <Link to="/game">Play</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
