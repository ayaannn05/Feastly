import scooter from "../assets/scooter.png";
import home from "../assets/home.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";

const deliveryBoyIcon = new L.Icon({
  iconUrl: scooter,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const customerIcon = new L.Icon({
  iconUrl: home,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function DeliveryBoyTracking({ data }) {
  const deliverBoyLat = data?.deliveryBoyLocation.lat;
  const deliverBoyLon = data?.deliveryBoyLocation.lon;
  const customerLat = data?.customerLocation.lat;
  const customerLon = data?.customerLocation.lon;

  const path = [
    [deliverBoyLat, deliverBoyLon],
    [customerLat, customerLon],
  ];

  const center = [deliverBoyLat, deliverBoyLon];

  return (
    <div className="w-full mt-3 rounded-xl overflow-hidden shadow-md">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[deliverBoyLat, deliverBoyLon]}
          icon={deliveryBoyIcon}
        >
          <Popup>Delivery Boy</Popup>
        </Marker>

        <Marker position={[customerLat, customerLon]} icon={customerIcon}>
          <Popup>Customer Location</Popup>
        </Marker>

        <Polyline positions={path} color="blue" />
      </MapContainer>
    </div>
  );
}

export default DeliveryBoyTracking;
