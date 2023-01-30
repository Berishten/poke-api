export default class Map {
  mapMarkers = [];
  constructor() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYmVyaXNodGVuIiwiYSI6ImNrbzlqNzUyODAzbDIzNG83aHJyZzF5aWQifQ.uDa2TMtXhIayPnfY5_8u-g";
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/berishten/ckwofjrlh0g9t15o95287iogr",
      center: [-77.5, 40],
      zoom: 16,
    });

    // Create events
    this.map.on("load", () => {
      let mapp = this.map;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          mapp.setCenter([position.coords.latitude, position.coords.longitude]);
        });
      }
    });

    this.map.on("click", "poi-label", (e) => {
      console.log(e.lngLat);
    });
  }

  addMarker() {
    let marker = new Marker({
      element:
        "<img src='https://www.pngkey.com/png/full/891-8917119_ditto-transparent-png-ditto-pokemon-png.png'>",
    })
      .setLngLat([30.5, 50.5])
      .addTo(this.map);

    this.map.mapMarkers.push(marker);
  }
}
