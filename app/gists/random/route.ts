import { availableLanguages } from "@/utils/languages";
import fs from "fs";

export async function GET(request: Request) {
  try {
    let gistFolder = fs.readdirSync("./public/gists");
    let GetRandomGist =
      gistFolder[Math.floor(Math.random() * gistFolder.length)];

    let content = fs.readFileSync(`./public/gists/${GetRandomGist}`);
    content = JSON.parse(content.toString());

    let randomGist: any = content[Math.floor(Math.random() * content.length)];

    let otherOptions = availableLanguages.filter(
      (e: string) => e !== randomGist.language
    );

    let options = [];

    for (let i of [1, 2, 3, 4]) {
      let randomIdx = Math.floor(Math.random() * otherOptions.length);

      options.push(otherOptions[randomIdx]);
      otherOptions.splice(randomIdx, 1);
    }

    randomGist = {
      ...randomGist,
      options: options,
    };

    return Response.json({ data: randomGist });
  } catch (e: any) {
    return Response.json({ error: e.message });
  }
}
