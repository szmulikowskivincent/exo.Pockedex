export const createNavbar = () => {
  const navbar = document.createElement("nav");
  navbar.className = "navbar";

  const leftSection = document.createElement("div");
  leftSection.className = "navbar-left";

  const logo = document.createElement("img");
  logo.src = "https://pngimg.com/uploads/pokeball/pokeball_PNG10.png";
  logo.alt = "Logo";
  logo.style.width = "100px";
  logo.style.height = "90px";
  logo.style.marginRight = "20px";

  const menu = document.createElement("ul");
  menu.className = "navbar-menu";
  menu.style.display = "flex";
  menu.style.listStyleType = "none";
  menu.style.padding = "0";
  menu.style.margin = "0";

  const menuItems = [
    { text: "Home", link: "home" },
    { text: "Monde", link: "world" },
    { text: "Pockedex", link: "pockemon" },
    { text: "Historique", link: "historique" },
  ];

  menuItems.forEach((item) => {
    const menuItem = document.createElement("li");
    menuItem.textContent = item.text;
    menuItem.style.marginRight = "20px";
    menuItem.style.cursor = "pointer";
    menuItem.style.fontWeight = "bold";

    menuItem.addEventListener("click", () => {
      if (item.link === "home") {
        window.location.href = "http://127.0.0.1:5501/index.html";
      } else if (item.link === "historique") {
        window.location.href = "http://127.0.0.1:5501/historique.html";
      } else if (item.link === "world") {
        window.location.href = "http://127.0.0.1:5501/world.html";
      } else if (item.link === "pockemon") {
        window.location.href = "http://127.0.0.1:5501/pockemon.html";
      }
    });

    menu.appendChild(menuItem);
  });

  leftSection.appendChild(logo);
  leftSection.appendChild(menu);

  const rightSection = document.createElement("div");
  rightSection.className = "navbar-right";

  const statsElement = document.createElement("div");
  statsElement.className = "navbar-stats";
  statsElement.style.fontWeight = "bold";
  statsElement.style.fontSize = "14px";

  rightSection.appendChild(statsElement);

  navbar.appendChild(leftSection);
  navbar.appendChild(rightSection);

  document.body.prepend(navbar);

  window.addEventListener("hashchange", () => loadPageContent());
  loadPageContent();

  return statsElement;
};

const loadPageContent = () => {
  const mainContent = document.querySelector("main");
  if (!mainContent) return;

  const hash = window.location.hash.substring(1);
  switch (hash) {
    case "historique":
      mainContent.innerHTML = "<h2>Historique des Pokémon...</h2>";
      break;
    case "pockemon":
      mainContent.innerHTML =
        "<h2>Page Pokedex en cours de développement...</h2>";
      break;
    case "world":
      mainContent.innerHTML = "<h2>Bienvenue dans le Monde Pokémon !</h2>";
      break;
    default:
      mainContent.innerHTML = "<h2>Bienvenue sur l'application Pokémon !</h2>";
  }
};
