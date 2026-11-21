import { Search } from "lucide-react";
import { locations } from "../data/busData.js";

// Reusable FROM / TO form. The parent page keeps the values (state)
// and decides what happens when the button is clicked.
function SearchForm({ from, to, setFrom, setTo, onSearch }) {
  return (
    <div className="search-form">
      <div className="field">
        <label htmlFor="from">FROM</label>
        <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
          <option value="">Select starting place</option>
          {locations.map((place) => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="to">TO</label>
        <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="">Select destination</option>
          {locations.map((place) => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-orange btn-large" onClick={onSearch}>
        <Search size={22} /> Search Buses
      </button>
    </div>
  );
}

export default SearchForm;
