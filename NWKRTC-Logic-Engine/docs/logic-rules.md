# Search and Live Tracking Logic

## Route matching
For each sample bus, the search function:
- Builds the ordered list of stop names.
- Finds the index of the requested FROM and TO locations.
- Accepts the bus only when both indexes exist and `fromIndex < toIndex`.
- Calculates departure and arrival minutes from the bus start time plus each stop's offset.
- Adds the configured sample delay to the estimated arrival.
- Returns only the stops between FROM and TO, inclusive.
- Sorts matches by departure time, earliest first.

## ETA
`distanceKm(a, b)` uses the Haversine formula with Earth radius 6,371 km to estimate straight-line distance between two latitude/longitude points.

`getEta(bus)`:
- Calculates distance from current bus position to the destination.
- Uses reported speed when it is at least 5 km/h; otherwise it assumes 20 km/h.
- Calculates minutes as rounded `(distance / speed) * 60`.
- Marks the bus arrived when distance is under 0.05 km.

## Live location freshness
The passenger live page considers a selected bus active if:
`now - bus.updatedAt < 120000`

That is a two-minute threshold. If the bus is not selected or its latest location is older than this threshold, the page shows an empty/not-running state.

## Data quality caveats
Coordinates, route stop lists, bus numbers and scheduled times in `busData.js` are sample/demo data. ETA is not a guaranteed arrival time and does not account for traffic, road routing, or GPS accuracy.
