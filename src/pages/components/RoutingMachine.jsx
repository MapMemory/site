import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map, lineColor, startPoint, endPoint } = this.props;
    this.control = L.Routing.control({
      waypoints: [
        L.latLng(startPoint.lat, startPoint.long),
        L.latLng(endPoint.lat, endPoint.long)
      ],
      router: new L.Routing.osrmv1({
        language: 'ru',
        profile: 'car'
      }),
      lineOptions: {
        styles: [
          {
            color: lineColor,
            opacity: 1,
            weight: 5
          }
        ]
      },
      createMarker: function () { return null; },
      addWaypoints: true,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false
    }).addTo(map.leafletElement);

    return this.control.getPlan();
  }

  componentWillUnmount() {
    console.log("'unmount' ", 'unmount');
    this.destroyRouting();
  }

  destroyRouting() {
    const { map } = this.props.leaflet;
    if (map) {
      map.removeControl(this.control);
    }
  }
}
export default withLeaflet(Routing);
