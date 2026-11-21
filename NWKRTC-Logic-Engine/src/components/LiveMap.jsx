import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

// Emoji markers, so no image files are needed
export const busIcon = L.divIcon({ className: "emoji-marker", html: "🚌", iconSize: [36, 36] });
export const destIcon = L.divIcon({ className: "emoji-marker", html: "🏁", iconSize: [36, 36] });

// Zooms the map to show both the bus and the destination
function FitBounds({ bus }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(
      [
        [bus.lat, bus.lng],
        [bus.destination.lat, bus.destination.lng],
      ],
      { padding: [50, 50], maxZoom: 16 }
    );
  }, [bus.number, bus.destination.lat, bus.destination.lng]);
  return null;
}

function LiveMap({ bus }) {
  const busPos = [bus.lat, bus.lng];
  const destPos = [bus.destination.lat, bus.destination.lng];

  return (
    <MapContainer center={busPos} zoom={14} className="live-map">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={[busPos, destPos]} pathOptions={{ color: "#167d70", dashArray: "8 8" }} />
      <Marker position={destPos} icon={destIcon} />
      <Marker position={busPos} icon={busIcon} />
      <FitBounds bus={bus} />
    </MapContainer>
  );
}

export default LiveMap;
