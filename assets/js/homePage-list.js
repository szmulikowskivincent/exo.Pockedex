import Modal from "../js/modal.js";
import Store from "../services/store.js";

export default class HomePageListe {
  constructor() {
    this.pokemonTableBody = document.querySelector("#pokemonTable tbody");
    this.refreshButton = document.querySelector(".btn-refresh");
    this.modal = new Modal();
    this.pokemonAlert = this.createPokemonAlert();
  }

  initialize() {
    if (
      window.location.pathname === "/index.html" ||
      window.location.pathname === "/"
    ) {
      document.body.prepend(this.pokemonAlert);
    }

    this.refreshButton.addEventListener("click", () =>
      this.refreshPokemonList()
    );
    this.refreshPokemonList();
    this.updatePokemonAlert();
  }

  async fetchPokemonList() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=50"
      );
      const data = await response.json();
      const pokemonList = data.results.map((pokemon, index) => ({
        number: index + 1,
        name: pokemon.name,
        types: "Pockemon",
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
      }));
      return pokemonList;
    } catch (error) {
      console.error("Erreur lors de la récupération des Pokémon", error);
      return [];
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  async refreshPokemonList() {
    const pokemonList = await this.fetchPokemonList();
    this.shuffleArray(pokemonList);
    this.renderPokemonList(pokemonList);
  }

  renderPokemonList(pokemonList) {
    this.pokemonTableBody.innerHTML = "";
    pokemonList.forEach((pokemon) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>🆔 ${pokemon.number}</td>
          <td>🏷️ ${pokemon.name}</td>
          <td>⚡${pokemon.types}</td>
        `;
      row.addEventListener("click", () => this.modal.openModal(pokemon));
      this.pokemonTableBody.appendChild(row);
    });

    this.updatePokemonAlert();
  }

  createPokemonAlert() {
    const alert = document.createElement("div");
    alert.className = "pokemon-alert";
    alert.style.backgroundColor = "red";
    alert.style.color = "white";
    alert.style.width = "200px";
    alert.style.height = "35px";
    alert.style.marginLeft = "2280px";
    alert.style.padding = "5px 10px";
    alert.style.borderRadius = "5px";
    alert.style.fontSize = "16px";
    alert.style.fontWeight = "bold";
    alert.style.marginBottom = "10px";

    alert.textContent = "Pokémons attrapés : 0";
    return alert;
  }

  updatePokemonAlert() {
    const savedPokemons = Store.getPokemons();
    this.pokemonAlert.textContent = `Pokémons attrapés : ${savedPokemons.length}`;
  }
}
