import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { Bus, Clock, Gauge, Route, SearchX } from "lucide-react";
import { db } from "../firebase.js";
import LiveMap from "../components/LiveMap.jsx";
import { getEta } from "../data/trackingHelpers.js";
import { trackableBuses } from "../data/busData.js";

function LiveTracking() {
  const [searchParams] = useSearchParams();
  const [allBuses, setAllBuses] = useState([]);
  // The passenger chooses the bus. It can also come from the Search page (?bus=HD-101)
  const [selected, setSelected] = useState(searchParams.get("bus") || "");
  const [now, setNow] = useState(Date.now());

  // Listen to Firebase: runs again every time a driver's location changes
  useEffect(() => {
    if (!db) return;
    const stop = onValue(ref(db, "live"), (snapshot) => {
      const data = snapshot.val() || {};
      setAllBuses(Object.entries(data).map(([number, v]) => ({ number, ...v })));
    });
    return () => stop();
  }, []);

  // Clock that ticks every 3 seconds (updates ETA and "last updated")
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 3000);
    return () => clearInterval(timer);
  }, []);

  if (!db) {
    return (
      <section className="section">
        <div className="container">
          <h1 className="page-title">Live Map</h1>
          <p className="notice">Firebase is not set up yet. Follow the steps in README.md to add your .env file.</p>
        </div>
      </section>
    );
  }

  // Only the bus chosen by the passenger is shown.
  // A bus counts as running if it sent a location in the last 2 minutes.
  const bus = allBuses.find((b) => b.number === selected && now - b.updatedAt < 120000);
  const eta = bus ? getEta(bus) : null;

  return (
    <section className="section">
      <div className="container">
        <h1 className="page-title">Live Map</h1>
        <p className="page-subtitle">Choose your bus to see where it is and when it will arrive.</p>

        <div className="card">
          <div className="field">
            <label htmlFor="liveBus">SELECT YOUR BUS</label>
            <select id="liveBus" value={selected} onChange={(e) => setSelected(e.target.value)}>
              <option value="">Choose a bus number</option>
              {trackableBuses.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!selected && (
          <div className="empty">
            <Bus size={40} />
            <h2>No bus selected</h2>
            <p>Select a bus above to see its live location.</p>
          </div>
        )}

        {selected && !bus && (
          <div className="empty">
            <SearchX size={40} />
            <h2>{selected} is not running right now</h2>
            <p>The live location will appear here when this bus starts its trip.</p>
          </div>
        )}

        {bus && (
          <div className="live-layout">
            <LiveMap bus={bus} />

            <div className="card live-info">
              <h2 className="section-title">
                {bus.number} to {bus.destination.name}
              </h2>

              <div className="time-box time-box-orange">
                <span className="time-label">
                  <Clock size={15} /> Will reach at
                </span>
                <span className="time-value">{eta.arrived ? "Arrived" : eta.arrivalTime}</span>
              </div>

              <ul className="live-list">
                <li>
                  <Clock size={18} /> Estimated time: <strong>{eta.arrived ? "0" : eta.minutes} min</strong>
                </li>
                <li>
                  <Route size={18} /> Distance left: <strong>{eta.km.toFixed(1)} km</strong>
                </li>
                <li>
                  <Gauge size={18} /> Speed: <strong>{bus.speedKmh} km/h</strong>
                </li>
              </ul>
              <p className="small-note">
                Updated {Math.max(0, Math.round((now - bus.updatedAt) / 1000))} seconds ago. ETA is approximate.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default LiveTracking;
