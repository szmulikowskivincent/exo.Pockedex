const Store = {
  savePokemons: (pokemons) => {
    localStorage.setItem("capturedPokemons", JSON.stringify(pokemons));
  },

  getPokemons: () => {
    return JSON.parse(localStorage.getItem("capturedPokemons")) || [];
  },
};

export default Store;
