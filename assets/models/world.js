import { createFooter } from "../js/footer.js";

export default class World {
  constructor(worlds) {
    this.worlds = worlds;
    this.container = document.getElementById("world-container");
    this.renderWorlds();
    this.renderFooter();
  }

  renderWorlds() {
    this.worlds.forEach((world) => {
      const card = document.createElement("div");
      card.classList.add("world-card");

      const number = document.createElement("div");
      number.classList.add("number");
      number.textContent = world.number;

      const title = document.createElement("h3");
      title.textContent = world.name;

      const img = document.createElement("img");
      img.src = world.image;
      img.alt = `Image de ${world.name}`;

      const actions = document.createElement("div");
      actions.classList.add("actions");

      const starButton = document.createElement("button");
      starButton.textContent = "☆"; // Initialement l'étoile est vide
      starButton.style.fontSize = "24px"; // Taille de l'étoile
      starButton.style.color = "gray"; // Couleur par défaut (gris)

      const trashButton = document.createElement("button");
      trashButton.textContent = "🗑️";

      // Ajouter l'événement pour l'étoile
      starButton.addEventListener("click", () => {
        // Si l'étoile est vide, la rendre pleine et jaune foncé, sinon la vider
        if (starButton.textContent === "☆") {
          starButton.textContent = "★"; // Mettre une étoile pleine
          starButton.style.color = "#ffcc00"; // Mettre l'étoile en jaune foncé
        } else {
          starButton.textContent = "☆"; // Vider l'étoile
          starButton.style.color = "gray"; // Revenir à la couleur grise
        }
      });

      // Ajouter l'événement pour la corbeille
      trashButton.addEventListener("click", () => {
        // Supprimer le monde (la carte) de l'affichage
        card.remove();
      });

      actions.appendChild(starButton);
      actions.appendChild(trashButton);

      const commentSection = document.createElement("div");
      commentSection.classList.add("comment-section");

      const commentTextarea = document.createElement("textarea");
      commentTextarea.placeholder = "Ajouter un commentaire...";

      const commentButton = document.createElement("button");
      commentButton.textContent = "Poster";

      const comments = document.createElement("div");
      comments.classList.add("comments");

      commentButton.addEventListener("click", () => {
        const comment = document.createElement("div");
        comment.classList.add("comment");
        comment.textContent = commentTextarea.value;
        comments.appendChild(comment);
        commentTextarea.value = "";
      });

      commentSection.appendChild(commentTextarea);
      commentSection.appendChild(commentButton);
      commentSection.appendChild(comments);

      card.appendChild(number);
      card.appendChild(title);
      card.appendChild(img);
      card.appendChild(actions);
      card.appendChild(commentSection);

      this.container.appendChild(card);
    });
  }

  renderFooter() {
    const footer = createFooter();
    document.body.appendChild(footer);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/worlds.json")
    .then((response) => response.json())
    .then((data) => {
      new World(data);
    })
    .catch((error) =>
      console.error("Erreur de chargement des mondes :", error)
    );
});
