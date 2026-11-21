// Straight-line distance between two GPS points, in kilometres
export function distanceKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// ETA = distance left / speed. If the bus is almost standing still,
// we assume 20 km/h so the time does not become huge.
export function getEta(bus) {
  const km = distanceKm(bus, bus.destination);
  const speed = bus.speedKmh >= 5 ? bus.speedKmh : 20;
  const minutes = Math.round((km / speed) * 60);
  const arrival = new Date(Date.now() + minutes * 60000);
  return {
    km,
    minutes,
    arrived: km < 0.05,
    arrivalTime: arrival.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };
}
