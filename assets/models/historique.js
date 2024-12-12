import Store from "../services/store.js";
import { createFooter } from "../js/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  const historyContainer = document.createElement("div");
  historyContainer.style.padding = "20px";
  historyContainer.style.fontFamily = "Arial, sans-serif";

  const header = document.createElement("h2");
  header.textContent = "Historique des Pokémon attrapés";
  historyContainer.appendChild(header);

  const pokemonCountContainer = document.createElement("div");
  pokemonCountContainer.style.backgroundColor = "red";
  pokemonCountContainer.style.color = "white";
  pokemonCountContainer.style.width = "320px";
  pokemonCountContainer.style.padding = "10px";
  pokemonCountContainer.style.borderRadius = "5px";
  pokemonCountContainer.style.fontSize = "18px";
  pokemonCountContainer.style.fontWeight = "bold";
  pokemonCountContainer.style.marginBottom = "20px";

  const savedPokemons = Store.getPokemons();
  pokemonCountContainer.textContent = `Nombre de Pokémon attrapés : ${savedPokemons.length}`;

  historyContainer.appendChild(pokemonCountContainer);

  const pokemonList = document.createElement("ul");
  pokemonList.style.listStyle = "none";
  pokemonList.style.padding = "0";

  if (savedPokemons.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Aucun Pokémon attrapé pour le moment.";
    historyContainer.appendChild(emptyMessage);
  } else {
    savedPokemons.forEach((pokemon) => {
      const listItem = document.createElement("li");
      listItem.style.margin = "10px 0";
      listItem.style.padding = "10px";
      listItem.style.border = "1px solid #ddd";
      listItem.style.borderRadius = "5px";
      listItem.style.display = "flex";
      listItem.style.alignItems = "center";

      const image = document.createElement("img");
      image.src = pokemon.image;
      image.alt = pokemon.name;
      image.style.width = "50px";
      image.style.height = "50px";
      image.style.marginRight = "10px";

      const details = document.createElement("div");
      details.innerHTML = `<strong>${pokemon.name}</strong><br>Types: ${pokemon.types}`;

      listItem.appendChild(image);
      listItem.appendChild(details);
      pokemonList.appendChild(listItem);
    });
  }

  historyContainer.appendChild(pokemonList);
  document.body.appendChild(historyContainer);

  const footer = createFooter();
  document.body.appendChild(footer);
});
