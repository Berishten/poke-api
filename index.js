import Map from "./js/MapBoxModule.js";

(async () => {
  const map = new Map();
  renderMarkers();

  function renderMarkers() {
    let success = async (position) => {
      let latLng = [position.coords.longitude, position.coords.latitude];
      const pokemons = await getPokemons()
      createPokeMarkers(pokemons).forEach((element, i) => {
        map.createMarker(randomCoordinates(0.005, latLng), element, pokemons[i]);
      });
    };
    navigator.geolocation.getCurrentPosition(success, (e) => {
      console.error(e);
    });
  }

  async function getPokemons() {
    const URL = "https://pokeapi.co/api/v2/pokemon/";
    const pokeCount = 1247
    let limit = 25
    const division = parseInt(pokeCount / limit)
    let offset = parseInt(Math.random() * division) * limit
    if (offset == (division*limit)) limit = 9
    const pokemonSetURL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;


    if ('caches' in window) {
      return caches.match(pokemonSetURL).then(async function(response) {
        // Devuelve la respuesta del cache si existe
        if (response) {
          return response.json();
        }
        // Hace la petición si no está en el cache
        try {
          const response = await axios.get(pokemonSetURL);
          const pokemonNames = response.data.results;
          const pokemonsRequests = pokemonNames.map((pokemon) => {
            return axios.get(URL + pokemon.name);
          });
          const pokemonsFromAPI = await Promise.all(pokemonsRequests);
          return pokemonsFromAPI.map((pokemon) => {
              return {
                name: pokemon.data.name,
                sprite: pokemon.data.sprites.front_default,
              };
          });
        } catch (error) {
          console.error(error);
          return null;
        }
      });
    }
    // Si no existe el cache, hace la petición directamente
    return fetch(url).then(function(response) {
      return response.json();
    });


    // try {
    //   const response = await axios.get(pokemonSetURL);
    //   const pokemonNames = response.data.results;
    //   const pokemonsRequests = pokemonNames.map((pokemon) => {
    //     return axios.get(URL + pokemon.name);
    //   });
    //   const pokemonsFromAPI = await Promise.all(pokemonsRequests);
    //   return pokemonsFromAPI.map((pokemon) => {
    //       return {
    //         name: pokemon.data.name,
    //         sprite: pokemon.data.sprites.front_default,
    //       };
    //   });
    // } catch (error) {
    //   console.error(error);
    //   return null;
    // }
  }

  function createPokeMarkers(pokemons) {
    let elementCards = [];

    for (var i = 0; i < pokemons.length; i++) {
      let imageElement = document.createElement("img");
      imageElement.src = pokemons[i].sprite;
      elementCards.push(imageElement);
    }

    return elementCards;
  }

  function randomCoordinates(radius, origin) {
    var x = origin[0] + (Math.random() * 2 - 1) * radius;
    var y = origin[1] + (Math.random() * 2 - 1) * radius;
    return [x, y];
  }

  function createElementCards(pokemons) {
    let elementCards = [];
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

      elementCards.push(card);
    }

    return elementCards;
  }
})();
