# NWKRTC Logic & Rule — Kavya

**Contributor:** Kavya  
**Area:** Logic & Rule  
**Project:** NWKRTC BusTrack

## Contribution files
- `src/data/busData.js` — sample bus/stop data, route locations, route search function, time formatting, place coordinates and selectable tracking bus numbers.
- `src/data/trackingHelpers.js` — straight-line GPS distance and approximate ETA calculation.
- `src/pages/SearchBuses.jsx` — connects the passenger search form to the route-search function and handles missing/equal locations and empty results.
- `src/pages/LiveTracking.jsx` — subscribes to live bus records, filters the selected bus by a two-minute freshness window and displays ETA information.
- `src/components/SearchForm.jsx` — FROM/TO selection and search callback.
- `src/components/LiveMap.jsx` — renders the bus-to-destination map and fits the map bounds.

## Implemented behaviour visible in this source
1. A bus matches a search when both selected places occur in its stop list and the FROM stop appears before the TO stop.
2. Search results are sorted by earliest departure.
3. The ETA helper calculates straight-line distance and divides by reported speed; speeds below 5 km/h use a 20 km/h fallback.
4. The passenger live page treats a location as current when its `updatedAt` timestamp is less than two minutes old.
5. The live page reads the `live` Realtime Database path and refreshes the displayed age/ETA every three seconds.

## Important limitations
- `busData.js` explicitly labels the timetable and route data as sample data, not real NWKRTC schedule data.
- ETA is approximate and uses straight-line distance, not road-network distance.
- The two-minute freshness check is implemented in the passenger page; this package does not contain a separate stale-GPS rule module.
- The source includes a map component based on React Leaflet and OpenStreetMap tiles.

## Integration note
These are selected files from the main React/Vite app, not a standalone application. Keep the original `src/` paths when integrating. `LiveTracking.jsx` imports Firebase `db`; the app also needs the Firebase setup file and installed dependencies from the main project.

## Suggested GitHub commit
`Add bus search, route matching and live ETA logic`

## Validation status
No automated unit-test suite was present in the supplied project ZIP, and no test execution is claimed in this package.
