import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import http from "http";
import pug from "pug";
import { setCharacter } from "./utils.js";

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const baseUrl = process.env.BASE_URL;

let player = null;
let hydra = null;

// get characters data
const characters = JSON.parse(fs.readFileSync("./characters.json")).characters;

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  console.log(req.method, req.url);

  // favicon route
  if (url === "favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    return res.end(fs.readFileSync("./favicon.ico"));

    // post method
  } else if (url === "" && req.method === "POST") {
    let formData = "";

    req.on("data", (data) => {
      formData += data;
    });

    req.on("end", () => {
      const data = {
        character: "",
        name: "",
        level: "",
      };

      const char = formData.split("&");

      for (const e of char) {
        const res = e.split("=");

        data[res[0]] = res[1];
      }

      console.log(data);

      // Création du perso
      player = setCharacter(data.character, characters);

      // Création de l'hydre
      hydra = setCharacter("hydra", characters);

      res.writeHead(302, {
        location: "/fight",
      });

      return res.end();
    });
  } else if (url === "fight") {
    pug.renderFile("./views/fight.pug", { player, hydra }, (err, data) => {
      if (err) return console.log(err.message);

      res.end(data);
    });

    // other routes else
  } else {
    pug.renderFile("./views/home.pug", { characters: ["Magician", "Barbarian", "Paladin"], levels: ["Easy", "Medium", "Hard"] }, (err, data) => {
      if (err) return console.log(err.message);

      res.end(data);
    });
  }
});

// create hydra
// let hydra = setCharacter("hydra");
// let player = null;
// let turn = 1;

// // call recursion
// prompt("list", "What difficulty do you want", ["Easy", "Medium", "Hard"], 1);

server.listen(PORT, HOST, () => console.log(`Server running at http://${HOST}:${PORT}/`));
