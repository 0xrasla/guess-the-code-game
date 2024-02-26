"use client";

import Gist from "super-react-gist";
import { useEffect, useState } from "react";

export default function Home() {
  const [gist, setGist] = useState<any>({});

  useEffect(() => {
    let res = fetch("/gists/random");

    res
      .then((res) => res.json())
      .then((res) => {
        setGist(res.data);
      });
  }, []);

  if (!gist || !gist.url) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <p>Welcome to coding with rasla</p>
      <pre>{JSON.stringify(gist, null, 2)}</pre>

      <Gist
        url={gist?.url}
        LoadingComponent={() => <strong>Custom loading component...</strong>}
        file={gist?.name}
      />
    </main>
  );
}
