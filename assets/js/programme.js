import { createNavbar } from "../js/nav.js";
import { createFooter } from "../js/footer.js";
import HomePageListe from "../js/homePage-list.js";

export default class Programme {
  constructor() {
    this.homePageListe = new HomePageListe();
  }

  initialize() {
    const statsElement = createNavbar();

    this.homePageListe.initialize();

    createFooter();

    this.setupVersionSwitching();
  }

  setupVersionSwitching() {
    const body = document.body;
    const button = document.getElementById("toggleMode");
    const status = document.getElementById("status");

    const updateStatus = () => {
      if (body.classList.contains("desktop")) {
        status.textContent = "Version: Desktop";
      } else if (body.classList.contains("mobile")) {
        status.textContent = "Version: Mobile";
      }
    };

    button.addEventListener("click", () => {
      if (body.classList.contains("desktop")) {
        body.classList.remove("desktop");
        body.classList.add("mobile");
        button.textContent = "Switch to Desktop";
      } else if (body.classList.contains("mobile")) {
        body.classList.remove("mobile");
        body.classList.add("desktop");
        button.textContent = "Switch to Mobile";
      }
      updateStatus();
    });

    updateStatus();
  }
}
