# Contribution Report – Logic & Rules

**Student:** Kavya  
**Project:** NWKRTC BusTrack  
**Assigned area:** Logic & Rule

## Responsibilities
- Implement and maintain the bus-search and route-matching logic.
- Apply the FROM and TO stop order when finding suitable buses.
- Calculate approximate arrival time (ETA).
- Support live bus tracking and location freshness checks.
- Explain the rules and limitations used by the logic.

## Work included in this contribution
- `src/data/busData.js` – sample bus and stop data, route search, time formatting and place coordinates.
- `src/data/trackingHelpers.js` – distance and approximate ETA helper functions.
- `src/pages/SearchBuses.jsx` – connects passenger search inputs with the route-search logic.
- `src/pages/LiveTracking.jsx` – displays live tracking information and checks whether a location update is recent.
- `src/components/SearchForm.jsx` – FROM/TO selection form.
- `src/components/LiveMap.jsx` – map display for bus location and destination.

## Responsibility during the project
I am responsible for the logic that helps passengers find buses and understand estimated journey information.

## Note
The route data supplied in the project is sample/demo data. ETA uses straight-line distance and is approximate; it is not a guaranteed arrival time or road-route calculation.
