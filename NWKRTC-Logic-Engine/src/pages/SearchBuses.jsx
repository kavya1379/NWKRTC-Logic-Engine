import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import SearchForm from "../components/SearchForm.jsx";
import BusCard from "../components/BusCard.jsx";
import { searchBuses } from "../data/busData.js";

function SearchBuses() {
  const [searchParams] = useSearchParams();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [results, setResults] = useState(null); // null = no search yet
  const [message, setMessage] = useState("");

  // Checks the places and finds the buses
  function runSearch(fromPlace, toPlace) {
    if (!fromPlace || !toPlace) {
      setResults(null);
      setMessage("Please select both FROM and TO.");
      return;
    }
    if (fromPlace === toPlace) {
      setResults(null);
      setMessage("FROM and TO cannot be the same place.");
      return;
    }
    setMessage("");
    setResults(searchBuses(fromPlace, toPlace));
  }

  // If the page was opened from Home or Routes (…?from=Hubballi&to=Dharwad),
  // fill the dropdowns and search straight away.
  useEffect(() => {
    const urlFrom = searchParams.get("from");
    const urlTo = searchParams.get("to");
    if (urlFrom && urlTo) {
      setFrom(urlFrom);
      setTo(urlTo);
      runSearch(urlFrom, urlTo);
    }
  }, [searchParams]);

  return (
    <section className="section">
      <div className="container">
        <h1 className="page-title">Search Buses</h1>
        <p className="page-subtitle">Choose where you are and where you want to go.</p>

        <div className="card">
          <SearchForm
            from={from}
            to={to}
            setFrom={setFrom}
            setTo={setTo}
            onSearch={() => runSearch(from, to)}
          />
        </div>

        {message && <p className="notice">{message}</p>}

        {results && results.length > 0 && (
          <div className="results">
            <h2 className="section-title">
              {results.length} {results.length === 1 ? "bus" : "buses"} from {from} to {to}
            </h2>
            {results.map((bus) => (
              <BusCard key={bus.id} bus={bus} />
            ))}
            <p className="small-note">Sample timings for project demonstration only.</p>
          </div>
        )}

        {results && results.length === 0 && (
          <div className="empty">
            <SearchX size={40} />
            <h2>No buses found</h2>
            <p>
              No sample bus goes from {from} to {to}. Try another FROM or TO place.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchBuses;
