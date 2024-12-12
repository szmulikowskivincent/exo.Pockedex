export const createFooter = () => {
  const footer = document.createElement("footer");
  footer.className = "footer";

  const logoContainer = document.createElement("div");
  logoContainer.className = "footer-logo-container";

  const logo = document.createElement("img");
  logo.src = "https://pngimg.com/uploads/pokeball/pokeball_PNG10.png";
  logo.alt = "Logo";
  logo.className = "footer-logo";

  logoContainer.appendChild(logo);
  footer.appendChild(logoContainer);

  const users = [
    { name: "John Doe", score: 85, date: "2024-12-11" },
    { name: "Jane Smith", score: 92, date: "2024-12-10" },
    { name: "Alex Johnson", score: 78, date: "2024-12-09" },
  ];

  users.sort((a, b) => b.score - a.score);

  users.forEach((user, index) => {
    const userSection = document.createElement("div");
    userSection.className = "footer-user";

    const userImageContainer = document.createElement("div");
    userImageContainer.className = "footer-avatar-container";
    const userImage = document.createElement("img");
    userImage.src =
      "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg";
    userImage.alt = `${user.name}'s avatar`;
    userImage.className = "footer-img";

    userImageContainer.addEventListener("click", () => {
      alert(`Avatar de ${user.name} cliqué !`);
    });

    userImageContainer.appendChild(userImage);

    const textDiv = document.createElement("div");
    textDiv.className = "footer-text";

    const rank = document.createElement("div");
    rank.className = "footer-user-rank";
    rank.textContent = `Rank: ${index + 1}`;

    const userName = document.createElement("div");
    userName.className = "footer-user-name";
    userName.textContent = `${user.name}`;

    const userScore = document.createElement("div");
    userScore.className = "footer-user-score";
    userScore.textContent = `Score: ${user.score}`;

    const userDate = document.createElement("div");
    userDate.className = "footer-user-date";
    userDate.textContent = `Date: ${user.date}`;

    textDiv.appendChild(rank);
    textDiv.appendChild(userName);
    textDiv.appendChild(userScore);
    textDiv.appendChild(userDate);

    userSection.appendChild(userImageContainer);
    userSection.appendChild(textDiv);

    footer.appendChild(userSection);
  });

  document.body.appendChild(footer);
};
