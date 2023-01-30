import Map from "./js/MapBoxModule.js"

(() => {
  const map = new Map()
  map.add()

  async function getPokemons() {
    const URL = "https://pokeapi.co/api/v2/pokemon/";
    try {
      const response = await axios.get(URL);
      const pokemonNames = response.data.results;
      const pokemonsRequests = pokemonNames.map((pokemon) => {
        return axios.get(URL + pokemon.name);
      });
      const pokemonsFromAPI = await Promise.all(pokemonsRequests)
      return pokemonsFromAPI.map((pokemon) => {
        return {
          name: pokemon.data.name,
          sprite: pokemon.data.sprites?.front_default,
        };
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  function renderPokemons(pokemons) {
    const cards = pokemons.map((pokemon) => {
      return {
        name: pokemon.name,
        headerImage: pokemon.sprite,
        description: "",
      };
    });

    for (var i = 0; i < cards.length; i++) {
      var card = document.createElement("div");
      card.setAttribute("class", "card");

      var header = document.createElement("img");
      header.src = cards[i].headerImage;
      header.setAttribute("class", "header");
      card.appendChild(header);

      var name = document.createElement("div");
      name.innerHTML = cards[i].name;
      name.setAttribute("class", "name");
      card.appendChild(name);

      var footer = document.createElement("div");
      footer.innerHTML = cards[i].description;
      footer.setAttribute("class", "footer");
      card.appendChild(footer);

      document.body.appendChild(card);
    }
  }
})();
