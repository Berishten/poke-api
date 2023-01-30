export default class Map {
  mapMarkers = [];
  constructor() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYmVyaXNodGVuIiwiYSI6ImNrbzlqNzUyODAzbDIzNG83aHJyZzF5aWQifQ.uDa2TMtXhIayPnfY5_8u-g";
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/berishten/ckwofjrlh0g9t15o95287iogr",
      center: [-77.5, 40],
      zoom: 16
    });
    
    this.geoFindMe();
    // Initialize events
    // createMarkerEvent()
  }

  createMarkerEvent() {
    this.map.on("click", (e) => {
      const POINT = [e.lngLat.lat, e.lngLat.lng];
      this.addMarker(POINT);
    });
  }

  addMarker(location) {
    let marker = new mapboxgl.Marker();
    marker.setLngLat(location);
    marker.addTo(this.map);

    this.mapMarkers.push(marker);
  }

  geoFindMe() {
    let success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      this.map.jumpTo({
        center: [longitude, latitude],
      });
    };

    function error() {
      console.log("Ocurrio un error");
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }
}
