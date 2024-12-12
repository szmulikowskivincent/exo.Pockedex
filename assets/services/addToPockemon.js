export async function addToPockemon(pokemon) {
  try {
    const response = await fetch("http://localhost:3001/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Pokémon ajouté avec succès", data);
    } else {
      console.error("Erreur lors de l'ajout du Pokémon");
    }
  } catch (error) {
    console.error("Erreur de connexion au serveur", error);
  }
}
