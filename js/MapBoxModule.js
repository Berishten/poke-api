export default class Map {
  constructor() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYmVyaXNodGVuIiwiYSI6ImNrbzlqNzUyODAzbDIzNG83aHJyZzF5aWQifQ.uDa2TMtXhIayPnfY5_8u-g";
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/berishten/ckwofjrlh0g9t15o95287iogr",
      center: [-77.5, 40],
      zoom: 16,
    });

    this.map.on("load", () => {
      let mapp = this.map;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
        //   latitude = position.coords.latitude;
        //   longitude = position.coords.longitude;
        //   mapp.jumpTo({ center: [latitude, longitude] });
          mapp.setCenter([position.coords.latitude, position.coords.longitude]);
        //   mapp.setCenter([-74.5, 40]);
        });
      }
    });
  }

  add(params) {
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );
  }
}
