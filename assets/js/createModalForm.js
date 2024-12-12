export function createModalForm(addPokemonCallback) {
  const modalHTML = `
      <div id="add-pokemon-modal" class="modal" style="display: none;">
        <div class="modal-content">
          <span id="close-modal" class="close">&times;</span>
          <form id="add-pokemon-form">
            <label for="name">Nom du Pokémon</label>
            <input type="text" id="name" name="name" placeholder="Nom du Pokémon" required />
  
            <label for="id">ID du Pokémon</label>
            <input type="number" id="id" name="id" placeholder="ID du Pokémon" required />
  
            <label for="type">Type du Pokémon</label>
            <input type="text" id="type" name="type" placeholder="Type du Pokémon" required />
  
            <label for="image">URL de l'image</label>
            <input type="url" id="image" name="image" placeholder="URL de l'image" required />
  
            <button type="submit">Ajouter</button>
          </form>
        </div>
      </div>
    `;

  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);

  const addPokemonBtn = document.createElement("button");
  addPokemonBtn.id = "add-pokemon-btn";
  addPokemonBtn.textContent = "Ajouter un Pokémon";
  document.body.insertBefore(addPokemonBtn, document.body.firstChild);

  const modal = document.getElementById("add-pokemon-modal");
  const closeModal = document.getElementById("close-modal");

  addPokemonBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  const addPokemonForm = document.getElementById("add-pokemon-form");

  addPokemonForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const type = document.getElementById("type").value;
    const image = document.getElementById("image").value;

    const newPokemon = {
      name,
      id,
      type,
      image,
    };

    addPokemonCallback(newPokemon);

    addPokemonForm.reset();
    modal.style.display = "none";
  });
}
