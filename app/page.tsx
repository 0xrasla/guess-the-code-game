"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [gist, setGist] = useState<any>({});
  const [currentGistContent, setCurrentGistContent] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [reload, setReload] = useState<boolean>(false);

  const fixFileName = (fileName: string) => {
    return fileName.replace(/\.[^/.]+$/, "");
  };

  useEffect(() => {
    if (localStorage.getItem("highscore") === null) {
      localStorage.setItem("highscore", "0");
    }

    let res = fetch("/gists/random");
    res
      .then((res) => res.json())
      .then((res) => {
        setGist(res.data);
        const gistContainer = document.getElementById("gist-container");
        const rawUrl = `${res.data.url}/raw`;
        fetch(rawUrl)
          .then((res) => res.text())
          .then((html) => {
            if (gistContainer) {
              setCurrentGistContent(html);
            }
          });
      });
  }, [reload]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    let _score = score;
    if (e.target.value === gist.language) {
      _score = score + 1;
    } else {
      if (score === 0) {
        _score = 0;
      } else {
        _score = score - 1;
      }
    }

    setScore(_score);

    if (_score > Number(localStorage.getItem("highscore"))) {
      localStorage.setItem("highscore", _score.toString());
    }
    setReload(!reload);
    setSelectedOption("");
  };

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  if (!gist || !gist.url) {
    return (
      <div className="flex flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex flex-col w-screen items-center justify-center min-h-screen py-2">
      <h1 className="absolute top-0 right-6 text-2xl text-gray-700 font-bold">
        Score : {score} || highscore :{" "}
        {Number(localStorage.getItem("highscore"))}
      </h1>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">{fixFileName(gist.name)}</h1>
      </div>
      <br />
      <div
        id="gist-container"
        className="container min-w-[400px] min-h-[400px] max-h-[400px] max-w-[800px] mx-auto bg-gray-100 rounded-lg overflow-auto p-4 shadow-md"
      >
        <pre>
          <code>{currentGistContent}</code>
        </pre>
      </div>
      {gist.options && (
        <div className="flex flex-col justify-center mt-4">
          <div className="flex flex-col items-start">
            <label className="font-bold mb-2">
              Choose the correct language:
            </label>
            {shuffleArray([gist.language, ...gist.options]).map(
              (option: string) => (
                <div key={option} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="language"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  <span>{option}</span>
                </div>
              )
            )}
          </div>
        </div>
      )}
      <p className="text-sm text-gray-500 mt-4 absolute bottom-6">
        Just a small game to improve my coding skills also test your knowledge
        of a language.
      </p>
    </main>
  );
}
