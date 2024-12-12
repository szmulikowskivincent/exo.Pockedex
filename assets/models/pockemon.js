import { createFooter } from "../js/footer.js";
import { addToPockemon } from "../services/addToPockemon.js";
import { createModalForm } from "../js/createModalForm.js";

class Pokemon {
  constructor(name, id, type, image) {
    this.name = name;
    this.id = id;
    this.type = type;
    this.image = image;
    this.stars = this.getRandomStars();
    this.speed = this.getRandomSpeed();
    this.gameSpeed = this.getRandomGameSpeed();
  }

  getRandomStars() {
    return Math.floor(Math.random() * 5) + 1;
  }

  getRandomSpeed() {
    return Math.floor(Math.random() * 10) + 5;
  }

  getRandomGameSpeed() {
    return Math.floor(Math.random() * 100) + 1;
  }

  renderCard() {
    const stars = Array(this.stars).fill("⭐").join("");
    return `
      <div class="pokemon-card" style="animation-duration: ${this.speed}s;">
        <img src="${this.image}" alt="${this.name}">
        <h2>${this.name}</h2>
        <p>ID: #${this.id}</p>
        <p>Type: <span class="type">${this.type}</span></p>
        <p class="game-speed">Vitesse de jeu: <span style="color: red;">${this.gameSpeed}</span></p>
        <div class="stars">${stars}</div>
        <button class="delete-btn">🗑️</button>
      </div>
    `;
  }
}

async function fetchPokemonData() {
  try {
    const response = await fetch("assets/data/myPockedex.json");
    const pokemonList = await response.json();
    displayAllPokemons(pokemonList);
    createFooter();
    updatePokemonAlert();
  } catch (error) {
    console.error("Erreur de chargement des données Pokémon:", error);
  }
}

function displayAllPokemons(pokemonList) {
  const cardContainer = document.getElementById("pokemon-card");
  cardContainer.innerHTML = "";

  pokemonList.forEach((pokemonData) => {
    const pokemon = new Pokemon(
      pokemonData.name,
      pokemonData.id,
      pokemonData.type,
      pokemonData.image
    );
    cardContainer.innerHTML += pokemon.renderCard();
  });

  addDeleteEventListeners();
}

function addDeleteEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const pokemonCard = button.closest(".pokemon-card");
      if (pokemonCard) {
        pokemonCard.remove();
        updatePokemonAlert();
      }
    });
  });
}

function handleAddPokemon(newPokemon) {
  const cardContainer = document.getElementById("pokemon-card");
  const pokemon = new Pokemon(
    newPokemon.name,
    newPokemon.id,
    newPokemon.type,
    newPokemon.image
  );
  cardContainer.innerHTML += pokemon.renderCard();

  addDeleteEventListeners();
  addToPockemon(newPokemon);
  updatePokemonAlert(); // Update the alert after adding a new Pokémon
}

function createPokemonAlert() {
  const alert = document.createElement("div");
  alert.className = "pokemon-alert";
  alert.style.backgroundColor = "red";
  alert.style.color = "white";
  alert.style.width = "200px";
  alert.style.height = "35px";
  alert.style.marginLeft = "2280px";
  alert.style.marginTop = "-110px";
  alert.style.padding = "5px 10px";
  alert.style.borderRadius = "5px";
  alert.style.fontSize = "16px";
  alert.style.fontWeight = "bold";
  alert.style.marginBottom = "10px";
  alert.textContent = "Pokémons attrapés : 0";
  return alert;
}

function updatePokemonAlert() {
  const savedPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
  const alert = document.querySelector(".pokemon-alert");
  if (alert) {
    alert.textContent = `Pokémons attrapés : ${savedPokemons.length}`;
  }
}

fetchPokemonData();
createModalForm(handleAddPokemon);

document.body.prepend(createPokemonAlert());
