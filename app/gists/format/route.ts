import fs from "fs";

function isEnglish(str = "") {
  return /^[a-zA-Z0-9_\-\.]+$/.test(str);
}

export async function GET(request: Request) {
  try {
    let content = fs.readFileSync("./public/gists.json");

    let gists: any[] = [];

    content = JSON.parse(content.toString());
    gists.push(content);
    gists = gists.flat();

    let files = [];

    for (let i of gists) {
      let fileDetails = [];
      let filesNames = Object.keys(i.files);

      filesNames = filesNames.filter((i) => isEnglish(i));

      let extensionsToExclude = [
        "pyc",
        "txt",
        "pyo",
        "sh",
        "json",
        "lock",
        "md",
      ];

      filesNames = filesNames.filter(
        (i) => !extensionsToExclude.includes(i.split(".")[1])
      );

      for (let name of filesNames) {
        let url = i.files[name].raw_url,
          language = i.files[name].language;

        if (!language) continue;

        fileDetails.push({
          name: name,
          url,
          language,
        });
      }

      files.push(fileDetails);
    }

    files = files.flat();

    if (!fs.existsSync("./public/gists")) {
      fs.mkdirSync("./public/gists");
    }

    let latestFileCount = fs.readdirSync("./public/gists").length;
    let latestFile = `./public/gists/${latestFileCount + 1}.json`;
    fs.writeFileSync(latestFile, JSON.stringify(files));

    return Response.json({ data: files });
  } catch (e: any) {
    return Response.json({ error: e.message });
  }
}
