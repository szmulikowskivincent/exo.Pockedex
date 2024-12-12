const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());

app.options("*", cors());
const dbFilePath = path.join(__dirname, "db.json");

const readDbFile = () => {
  try {
    const fileContent = fs.readFileSync(dbFilePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    throw new Error("Erreur lors de la lecture du fichier DB");
  }
};

const saveToDbFile = (data) => {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    throw new Error("Erreur lors de l'écriture dans le fichier DB");
  }
};

app.get("/pokemon", (req, res) => {
  try {
    const pokemons = readDbFile();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/pokemon", (req, res) => {
  try {
    const newPokemon = req.body;
    const pokemons = readDbFile();
    pokemons.push(newPokemon);
    saveToDbFile(pokemons);
    res.status(201).json({ message: "Pokémon ajouté avec succès!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Serveur Express démarré sur http://localhost:${port}`);
});
