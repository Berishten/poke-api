(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      mapboxgl.accessToken =
        "pk.eyJ1IjoiYmVyaXNodGVuIiwiYSI6ImNrbzlqNzUyODAzbDIzNG83aHJyZzF5aWQifQ.uDa2TMtXhIayPnfY5_8u-g";

      let map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/berishten/ckwofjrlh0g9t15o95287iogr",
        center: [longitude, latitude],
        zoom: 13,
      });
    }); 
  }

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
