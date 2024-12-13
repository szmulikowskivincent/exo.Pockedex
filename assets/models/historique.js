import Store from "../services/store.js";
import { createFooter } from "../js/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------
  // Historique des Pokémon
  // --------------------------

  const historyContainer = document.createElement("div");
  historyContainer.style.padding = "20px";
  historyContainer.style.fontFamily = "Arial, sans-serif";

  const header = document.createElement("h2");
  header.textContent = "💾 Historique des Pokémon attrapés";
  historyContainer.appendChild(header);

  const savedPokemons = Store.getPokemons();

  const pokemonCountContainer = document.createElement("div");
  pokemonCountContainer.style.backgroundColor = "red";
  pokemonCountContainer.style.color = "white";
  pokemonCountContainer.style.width = "450px";
  pokemonCountContainer.style.padding = "10px";
  pokemonCountContainer.style.borderRadius = "5px";
  pokemonCountContainer.style.fontSize = "18px";
  pokemonCountContainer.style.fontWeight = "bold";
  pokemonCountContainer.style.marginBottom = "20px";
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

      // Ajouter l'image du Pokémon
      const imageContainer = document.createElement("div");
      const image = document.createElement("img");
      image.src = pokemon.image; // Assurez-vous que chaque Pokémon a une propriété `image`
      image.alt = pokemon.name;
      image.style.width = "50px";
      image.style.height = "50px";
      image.style.objectFit = "contain"; // Pour garder l'aspect original de l'image
      imageContainer.appendChild(image);

      // Ajouter les détails du Pokémon
      const details = document.createElement("div");
      details.innerHTML = `<strong>${pokemon.name}</strong><br>Types: ${pokemon.types}`;

      // Ajouter l'image et les détails à l'élément de la liste
      listItem.appendChild(imageContainer);
      listItem.appendChild(details);
      pokemonList.appendChild(listItem);
    });
  }

  historyContainer.appendChild(pokemonList);
  document.body.appendChild(historyContainer);

  /// ----------------------------------------
  // Affichage de l'historique des combats
  // ----------------------------------------

  const historySection = document.createElement("div");
  historySection.style.padding = "20px";

  const historyHeader = document.createElement("h2");
  historyHeader.textContent = "💾 Historique des combats Pokémon";
  historySection.appendChild(historyHeader);

  const combatHistoryList = document.createElement("div");
  combatHistoryList.style.display = "flex";
  combatHistoryList.style.flexWrap = "wrap";
  combatHistoryList.style.gap = "20px";
  combatHistoryList.style.padding = "0";

  const combatHistory = JSON.parse(localStorage.getItem("combatHistory")) || [];

  if (combatHistory.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Aucun combat n'a eu lieu pour le moment.";
    historySection.appendChild(emptyMessage);
  } else {
    combatHistory.forEach((combat, index) => {
      const combatItem = document.createElement("div");
      combatItem.style.width = "250px";
      combatItem.style.padding = "10px";
      combatItem.style.border = "1px solid #ddd";
      combatItem.style.borderRadius = "5px";
      combatItem.style.display = "flex";
      combatItem.style.flexDirection = "column";
      combatItem.style.justifyContent = "space-between";

      const details = document.createElement("div");
      details.innerHTML = `
        <strong>📌Combat #${index + 1}</strong><br>
        🐣Pokémon 1 : ${combat.pokemon1}<br>
        🐦‍🔥Pokémon 2 : ${combat.pokemon2}<br>
        🥇Gagnant : ${combat.winner}<br>
        🗓️Date : ${combat.date}
      `;

      combatItem.appendChild(details);
      combatHistoryList.appendChild(combatItem);
    });
  }

  historySection.appendChild(combatHistoryList);
  document.body.appendChild(historySection);

  // ---------------------------
  // Modal Arena et Combats
  // ---------------------------

  const bonusButton = document.createElement("button");
  bonusButton.textContent = "🎁 Bonus";
  bonusButton.style.position = "fixed";
  bonusButton.style.top = "20px";
  bonusButton.style.right = "20px";
  bonusButton.style.backgroundColor = "#f39c12";
  bonusButton.style.color = "white";
  bonusButton.style.fontSize = "18px";
  bonusButton.style.padding = "10px 20px";
  bonusButton.style.border = "2px solid #2c3e50";
  bonusButton.style.borderRadius = "8px";
  bonusButton.style.cursor = "pointer";
  bonusButton.style.zIndex = "1000";
  document.body.appendChild(bonusButton);

  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.right = "0";
  modal.style.bottom = "0";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modal.style.display = "none";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "999";

  const modalContent = document.createElement("div");
  modalContent.style.backgroundColor = "white";
  modalContent.style.borderRadius = "8px";
  modalContent.style.width = "1000px";
  modalContent.style.height = "850px";
  modalContent.style.padding = "20px";
  modalContent.style.textAlign = "center";
  modalContent.style.display = "flex";
  modalContent.style.flexDirection = "column";
  modalContent.style.justifyContent = "space-between";

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = "⚔️ 💥 Combat de l'arène 💪 👊 🛠️ 🗡️";
  modalContent.appendChild(modalTitle);

  const battleContainer = document.createElement("div");
  battleContainer.style.display = "flex";
  battleContainer.style.justifyContent = "space-around";

  const pokemon1Div = document.createElement("div");
  pokemon1Div.style.textAlign = "left";
  pokemon1Div.style.marginTop = "20px";

  const pokemon2Div = document.createElement("div");
  pokemon2Div.style.textAlign = "left";
  pokemon2Div.style.marginTop = "20px";

  const pokemon1Display = document.createElement("div");
  const pokemon2Display = document.createElement("div");

  pokemon1Div.appendChild(pokemon1Display);
  pokemon2Div.appendChild(pokemon2Display);

  battleContainer.appendChild(pokemon1Div);
  battleContainer.appendChild(pokemon2Div);

  modalContent.appendChild(battleContainer);

  function displayPokemon(pokemon, displayElement) {
    const imageContainer = document.createElement("div");
    imageContainer.style.textAlign = "center";
    imageContainer.style.marginBottom = "20px";

    const image = document.createElement("img");
    image.src = pokemon.image; // Assurez-vous que chaque Pokémon a une propriété `image`
    image.alt = pokemon.name;
    image.style.width = "350px";
    image.style.height = "350px";
    image.style.objectFit = "contain";
    imageContainer.appendChild(image);

    displayElement.appendChild(imageContainer);

    const tableContainer = document.createElement("div");
    tableContainer.style.marginTop = "20px";

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.textAlign = "left";

    const tableHeader = document.createElement("thead");
    tableHeader.innerHTML = `
      <tr>
        <th style="padding: 10px; background-color: #f2f2f2;">Caractéristique</th>
        <th style="padding: 10px; background-color: #f2f2f2;">Valeur</th>
      </tr>
    `;
    table.appendChild(tableHeader);

    const tableBody = document.createElement("tbody");
    tableBody.innerHTML = `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">🐣Nom</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${pokemon.name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">⚡Types</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${pokemon.types}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">🚀Vitesse</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${pokemon.speed}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">💪Force</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${pokemon.strength}</td>
      </tr>
    `;
    table.appendChild(tableBody);

    tableContainer.appendChild(table);
    displayElement.appendChild(tableContainer);
  }

  function startBattle() {
    const randomIndex1 = Math.floor(Math.random() * savedPokemons.length);
    const randomIndex2 = Math.floor(Math.random() * savedPokemons.length);
    const pokemon1 = savedPokemons[randomIndex1];
    const pokemon2 = savedPokemons[randomIndex2];

    displayPokemon(pokemon1, pokemon1Display);
    displayPokemon(pokemon2, pokemon2Display);

    const loadingBarContainer = document.createElement("div");
    loadingBarContainer.style.width = "100%";
    loadingBarContainer.style.height = "20px";
    loadingBarContainer.style.backgroundColor = "#ddd";
    loadingBarContainer.style.marginTop = "20px";

    const loadingBar = document.createElement("div");
    loadingBar.style.height = "100%";
    loadingBar.style.backgroundColor = "#4caf50";
    loadingBar.style.width = "0%";

    loadingBarContainer.appendChild(loadingBar);
    modalContent.appendChild(loadingBarContainer);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      loadingBar.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);
        const winner = Math.random() > 0.5 ? pokemon1.name : pokemon2.name;
        const resultMessage = document.createElement("p");
        resultMessage.textContent = `${winner} a gagné le combat !`;
        modalContent.appendChild(resultMessage);

        const combatData = {
          pokemon1: pokemon1.name,
          pokemon2: pokemon2.name,
          winner: winner,
          date: new Date().toLocaleString(),
        };

        const combatHistory =
          JSON.parse(localStorage.getItem("combatHistory")) || [];
        combatHistory.push(combatData);
        localStorage.setItem("combatHistory", JSON.stringify(combatHistory));
      }
    }, 100);
  }

  bonusButton.addEventListener("click", () => {
    modal.style.display = "flex";
    startBattle();
  });

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.backgroundColor = "red";
  closeButton.style.color = "white";
  closeButton.style.padding = "10px 20px";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "5px";
  closeButton.style.cursor = "pointer";
  closeButton.style.marginTop = "20px";

  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const footer = createFooter();
  document.body.appendChild(footer);
});
