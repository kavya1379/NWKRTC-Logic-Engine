// ------------------------------------------------------------
// SAMPLE DATA ONLY.
// This is NOT real NWKRTC data and there is NO live GPS tracking.
// You can edit the buses below to add or change routes and times.
// ------------------------------------------------------------

// Locations shown in the FROM and TO dropdowns
export const locations = ["Hubballi", "Dharwad", "Unkal", "Navanagar", "Sattur"];

// Each bus has:
//  number       - bus number
//  startTime    - time it leaves its first stop (24-hour format)
//  delayMinutes - sample delay used for "Estimated arrival"
//  stops        - list of stops in order, with minutes after startTime
export const buses = [
  {
    id: 1,
    number: "HD-101",
    startTime: "06:30",
    delayMinutes: 0,
    stops: [
      { name: "Hubballi", min: 0 },
      { name: "Navanagar", min: 15 },
      { name: "Unkal", min: 25 },
      { name: "Dharwad", min: 45 },
    ],
  },
  {
    id: 2,
    number: "HD-102",
    startTime: "07:15",
    delayMinutes: 5,
    stops: [
      { name: "Hubballi", min: 0 },
      { name: "Unkal", min: 20 },
      { name: "Sattur", min: 35 },
      { name: "Dharwad", min: 45 },
    ],
  },
  {
    id: 3,
    number: "HD-103",
    startTime: "08:00",
    delayMinutes: 0,
    stops: [
      { name: "Hubballi", min: 0 },
      { name: "Navanagar", min: 15 },
      { name: "Unkal", min: 25 },
      { name: "Sattur", min: 40 },
      { name: "Dharwad", min: 50 },
    ],
  },
  {
    id: 4,
    number: "HD-104",
    startTime: "09:30",
    delayMinutes: 10,
    stops: [
      { name: "Hubballi", min: 0 },
      { name: "Navanagar", min: 15 },
      { name: "Unkal", min: 25 },
      { name: "Dharwad", min: 45 },
    ],
  },
  {
    id: 5,
    number: "DH-201",
    startTime: "06:45",
    delayMinutes: 0,
    stops: [
      { name: "Dharwad", min: 0 },
      { name: "Sattur", min: 10 },
      { name: "Unkal", min: 25 },
      { name: "Navanagar", min: 35 },
      { name: "Hubballi", min: 50 },
    ],
  },
  {
    id: 6,
    number: "DH-202",
    startTime: "08:20",
    delayMinutes: 5,
    stops: [
      { name: "Dharwad", min: 0 },
      { name: "Unkal", min: 20 },
      { name: "Navanagar", min: 30 },
      { name: "Hubballi", min: 45 },
    ],
  },
  {
    id: 7,
    number: "DH-203",
    startTime: "10:10",
    delayMinutes: 0,
    stops: [
      { name: "Dharwad", min: 0 },
      { name: "Sattur", min: 10 },
      { name: "Unkal", min: 25 },
      { name: "Hubballi", min: 45 },
    ],
  },
  {
    id: 8,
    number: "DH-204",
    startTime: "17:30",
    delayMinutes: 10,
    stops: [
      { name: "Dharwad", min: 0 },
      { name: "Sattur", min: 10 },
      { name: "Unkal", min: 25 },
      { name: "Navanagar", min: 35 },
      { name: "Hubballi", min: 50 },
    ],
  },
];

// Popular routes shown on the Home page and the Routes page
export const popularRoutes = [
  { id: 1, from: "Hubballi", to: "Dharwad", stops: ["Navanagar", "Unkal"] },
  { id: 2, from: "Dharwad", to: "Hubballi", stops: ["Sattur", "Unkal", "Navanagar"] },
  { id: 3, from: "Hubballi", to: "Unkal", stops: ["Navanagar"] },
  { id: 4, from: "Unkal", to: "Dharwad", stops: ["Sattur"] },
];

// ---------- Helper functions ----------

// Changes a time like "06:30" into total minutes of the day (390)
function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// Turns total minutes (e.g. 405) into "6:45 AM"
function formatTime(totalMinutes) {
  const minutesInDay = totalMinutes % (24 * 60);
  const h24 = Math.floor(minutesInDay / 60);
  const m = minutesInDay % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

// Main search function.
// A bus is a match when BOTH places are on its route
// and FROM comes before TO (the bus travels in that direction).
export function searchBuses(from, to) {
  const results = [];

  buses.forEach((bus) => {
    const names = bus.stops.map((stop) => stop.name);
    const fromIndex = names.indexOf(from);
    const toIndex = names.indexOf(to);

    if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
      const start = toMinutes(bus.startTime);
      const departure = start + bus.stops[fromIndex].min;
      const arrival = start + bus.stops[toIndex].min;

      results.push({
        id: bus.id,
        number: bus.number,
        from,
        to,
        departureValue: departure,
        departure: formatTime(departure),
        arrival: formatTime(arrival),
        estimatedArrival: formatTime(arrival + bus.delayMinutes),
        delayMinutes: bus.delayMinutes,
        // Only the stops between FROM and TO (including both)
        stops: names.slice(fromIndex, toIndex + 1),
      });
    }
  });

  // Earliest bus first
  return results.sort((a, b) => a.departureValue - b.departureValue);
}

// Approximate map positions of each place (used as destinations for live tracking)
export const placeCoords = {
  Hubballi: { lat: 15.3647, lng: 75.124 },
  Dharwad: { lat: 15.4589, lng: 75.0078 },
  Unkal: { lat: 15.3811, lng: 75.0997 },
  Navanagar: { lat: 15.3925, lng: 75.1052 },
  Sattur: { lat: 15.4496, lng: 75.0262 },
};

// Bus numbers a passenger can choose on the Live Map page
// (DEMO buses are for your college presentation with phones)
export const trackableBuses = [...buses.map((b) => b.number), "DEMO-1", "DEMO-2"];
