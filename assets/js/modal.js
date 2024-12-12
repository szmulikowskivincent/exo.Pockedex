import Store from "../services/store.js";

export default class Modal {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.classList.add("modal");
    this.modal.style.display = "none";

    this.modalContent = document.createElement("div");
    this.modalContent.classList.add("modal-content");

    this.header = document.createElement("h3");
    this.header.style.backgroundColor = "#f0f0f0";
    this.header.style.padding = "10px";
    this.header.style.borderRadius = "5px";
    this.modalContent.appendChild(this.header);

    this.closeModal = document.createElement("span");
    this.closeModal.id = "closeModal";
    this.closeModal.textContent = "×";
    this.closeModal.classList.add("close");
    this.modalImage = document.createElement("img");
    this.modalImage.id = "modalImage";
    this.modalImage.alt = "Image de Pokémon";
    this.modalImage.style.width = "50%";
    this.modalImage.style.height = "auto";
    this.modalImage.style.border = "2px solid gray";
    this.modalImage.style.padding = "10px";

    this.modalText = document.createElement("pre");
    this.modalText.id = "modalText";

    this.backArrow = document.createElement("span");
    this.backArrow.textContent = "< Back";
    this.backArrow.style.cursor = "pointer";
    this.backArrow.style.fontSize = "24px";
    this.backArrow.style.color = "blue";
    this.backArrow.addEventListener("click", () => this.backHandler());

    this.testButton = document.createElement("button");
    this.testButton.textContent = "Test";
    this.testButton.style.backgroundColor = "#3ee74c";
    this.testButton.style.color = "white";
    this.testButton.style.border = "none";
    this.testButton.style.padding = "10px 20px";
    this.testButton.style.cursor = "pointer";
    this.testButton.addEventListener("click", () => this.testHandler());

    this.toast = document.createElement("div");
    this.toast.id = "toast";
    this.toast.classList.add("toast");

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-between";
    buttonContainer.style.width = "100%";
    buttonContainer.appendChild(this.backArrow);
    buttonContainer.appendChild(this.testButton);

    this.modalContent.appendChild(this.closeModal);
    this.modalContent.appendChild(this.modalImage);
    this.modalContent.appendChild(this.modalText);
    this.modalContent.appendChild(buttonContainer);
    this.modal.appendChild(this.modalContent);
    this.modal.appendChild(this.toast);

    document.body.appendChild(this.modal);

    this.closeModal.addEventListener("click", () => this.closeModalHandler());
    window.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModalHandler();
      }
    });
  }

  openModal(pokemon) {
    this.currentPokemon = pokemon;
    this.header.textContent = `Voulez-vous attraper le ${pokemon.name} `;
    this.modalText.textContent = `Nom: ${pokemon.name}\nTypes: ${pokemon.types}`;
    this.modalImage.src = pokemon.image;
    this.modal.style.display = "flex";
  }

  closeModalHandler() {
    this.modal.style.display = "none";
  }

  backHandler() {
    this.closeModalHandler();
  }
  testHandler() {
    console.log("Test button clicked");

    if (this.currentPokemon) {
      Store.savePokemon(this.currentPokemon);
      this.showToast("Pokémon attrapé avec succès !", "success");
    } else {
      this.showToast("Aucun Pokémon attrapé.", "error");
    }
  }

  showToast(message, type = "success") {
    this.toast.textContent = message;

    if (type === "success") {
      this.toast.style.backgroundColor = "#3ee74c";
    } else if (type === "error") {
      this.toast.style.backgroundColor = "#f06b6b";
    }

    this.toast.classList.add("show");
    setTimeout(() => {
      this.toast.classList.remove("show");
    }, 3000);
  }
}
