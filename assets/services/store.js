export default class Store {
  static getPokemons() {
    return JSON.parse(localStorage.getItem("pokemons")) || [];
  }

  static savePokemon(pokemon) {
    const savedPokemons = Store.getPokemons();
    savedPokemons.push(pokemon);
    localStorage.setItem("pokemons", JSON.stringify(savedPokemons));
  }
}
