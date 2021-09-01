import React, { useEffect, useState } from "react";
import env from "react-dotenv";
import ReactEmbedGist from "react-embed-gist";

function Game() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [crctAns, setcrctAns] = useState("");
  const [supportedAns, setsupportedAns] = useState([]);
  const [renderer, setRenderer] = useState(false);
  const [score, setscore] = useState(0);

  function check(ans, target) {
    if (ans === crctAns) {
      setscore(score + 2);
      target.target.style.backgroundColor = "rgb(78, 214, 78)";
      setTimeout(() => {
        setRenderer(!renderer);
        target.target.style.backgroundColor = "rgb(212, 211, 208)";
      }, 600);
      target.target.className = "btn";
    } else {
      target.target.style.backgroundColor = "red";
      setscore(score - 2);
      setTimeout(() => {
        setRenderer(!renderer);
        target.target.style.backgroundColor = "rgb(212, 211, 208)";
      }, 600);
    }
  }

  useEffect(() => {
    let supportedLanguages = [
      "JSON",
      "Text",
      "Ignore List",
      "XML",
      "Jupyter Notebook",
      "CSV",
      "Maven POM",
      "YAML",
      "AutoHotkey",
      "TSV",
      "reStructuredText",
      "VCL",
      "Diff",
      "TeX",
      "TOML",
      "Windows Registry Entries",
      "SVG",
      "Ballerina",
      "Org",
      "Markdown",
      null,
    ];

    let randomLanguages = [
      "Swift",
      "JavaScript",
      "Java",
      "Kotlin",
      "Shell",
      "PowerShell",
      "C++",
      "C",
      "C#",
      "Ruby",
      "Dart",
      "Python",
      "Objective-C",
      "Perl",
      "Go",
      "PHP",
      "R",
      "Dockerfile",
      "CSS",
      "HTML",
      "TypeScript",
      "Haskell",
      "GLSL",
    ];

    let possibles = [];

    fetch(env.API_URL + String(Math.floor(Math.random() * 100)))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          for (let i of data) {
            for (let j of supportedLanguages) {
              let cur_file = i.files[Object.keys(i.files)[0]].language;
              if (
                j !== cur_file &&
                !supportedLanguages.includes(cur_file) &&
                !possibles.includes(cur_file)
              ) {
                possibles.push(i);
              }
            }
          }
        }
      })
      .then(() => {
        let selected = possibles[Math.floor(Math.random() * possibles.length)];
        setData(selected);
        let supp = [selected.files[Object.keys(selected.files)[0]].language];
        setcrctAns(supp[0]);
        for (let i = 0; i < 4; i++) {
          let rand = Math.floor(Math.random() * randomLanguages.length);
          if (randomLanguages[rand] !== supp[0]) {
            supp.push(randomLanguages[rand]);
          }
        }
        supp = supp.sort(() => Math.random() - 0.5);
        setsupportedAns(supp);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        console.log(e);
      });
  }, [renderer]);

  return (
    <div className="game">
      Guess The Code ? <br /> <br />
      {"Score : " + score}
      {!error && (
        <div id="coding-block">
          {error && <h1>Some Error Happening!</h1>}
          {!error && !loading && data && (
            <ReactEmbedGist gist={data.owner.login + "/" + data.id} />
          )}
        </div>
      )}
      {supportedAns &&
        supportedAns.map((e, i) => {
          return (
            <button key={i} className="btn" onClick={(cl) => check(e, cl)}>
              {e}
            </button>
          );
        })}
    </div>
  );
}

export default Game;
