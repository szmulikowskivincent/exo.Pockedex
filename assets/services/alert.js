export const createPokemonAlert = () => {
  const alert = document.createElement("div");
  alert.className = "pokemon-alert";
  alert.style.backgroundColor = "red";
  alert.style.color = "white";
  alert.style.padding = "5px 10px";
  alert.style.borderRadius = "5px";
  alert.style.fontSize = "14px";
  alert.style.fontWeight = "bold";
  alert.style.marginLeft = "20px";
  alert.style.marginTop = "10px";

  const catchScore = parseInt(localStorage.getItem("catchScore")) || 0;

  alert.textContent = `Pokémons attrapés : ${catchScore}`;

  document.body.appendChild(alert);

  return alert;
};
