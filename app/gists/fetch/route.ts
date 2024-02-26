import fs from "fs";

export async function GET(request: Request) {
  const limit = request.headers.get("limit") || "30";
  const fileExtensions = "js,ts,css,html,md,json,py,java,php,rb,go,sh,pyc";

  let url = `https://api.github.com/gists?per_page=${limit}&file_extension=${fileExtensions}`;
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let publicGists = await fetch(url, options);

  publicGists = await publicGists.json();

  fs.writeFileSync("./public/gists.json", JSON.stringify(publicGists));

  return Response.json({ publicGists });
}
