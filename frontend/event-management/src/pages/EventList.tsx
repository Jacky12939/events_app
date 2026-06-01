import { useState, useEffect, useCallback } from "react";
import EventCard from "../components/Event/EventCard";
import { EventRepository } from "../infrastructure/repositories/EventRepository";
import type { Event, EventFilters } from "../domain/entities/Events";
import "./EventList.css";

const LOCATIONS = ["Yaoundé", "Douala", "Bafoussam", "Garoua", "Bamenda"];

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<EventFilters>({});
  const [search, setSearch] = useState("");
  const [activeLocation, setActiveLocation] = useState("");
  const [dateFrom, setDateFrom] = useState("");

  const fetchEvents = useCallback(async (f: EventFilters) => {
    setLoading(true);
    setError("");
    try {
      const data = await EventRepository.findAll(f);
      setEvents(data);
    } catch {
      setError("Impossible de charger les événements.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const f: EventFilters = {};
      if (search) f.title = search;
      if (activeLocation) f.location = activeLocation;
      if (dateFrom) f.dateFrom = dateFrom;
      setFilters(f);
      fetchEvents(f);
    }, 350);
    return () => clearTimeout(t);
  }, [search, activeLocation, dateFrom, fetchEvents]);

  useEffect(() => {
    const t = setTimeout(
      () => {
        const f: EventFilters = {};
        if (search) f.title = search;
        if (activeLocation) f.location = activeLocation;
        if (dateFrom) f.dateFrom = dateFrom;
        fetchEvents(f);
      },
      search || activeLocation || dateFrom ? 350 : 0,
    ); //Oms au montage initial
    return () => clearTimeout(t);
  }, [search, activeLocation, dateFrom, fetchEvents]);

  const clearFilters = () => {
    setSearch("");
    setActiveLocation("");
    setDateFrom("");
  };

  const hasFilters = search || activeLocation || dateFrom;

  return (
    <div className="el-root">
      {/* Hero */}
      <header className="el-hero">
        <div className="el-hero-bg" />
        <div className="el-hero-content">
          <p className="el-hero-eyebrow">Découvrez · Participez · Vivez</p>
          <h1 className="el-hero-title">
            Tous les
            <br />
            <em>événements</em>
          </h1>
          <p className="el-hero-sub">
            Conférences, ateliers, concerts et meet-ups près de chez vous.
          </p>

          {/* Search bar */}
          <div className="el-search-wrap">
            <svg
              className="el-search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="el-search"
              placeholder="Rechercher un événement..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="el-main">
        {/* Filters row */}
        <div className="el-filters">
          <div className="el-filter-group">
            <span className="el-filter-label">Lieu</span>
            <div className="el-chips">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  className={`el-chip ${activeLocation === loc ? "active" : ""}`}
                  onClick={() =>
                    setActiveLocation(activeLocation === loc ? "" : loc)
                  }
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          <div className="el-filter-group">
            <span className="el-filter-label">À partir du</span>
            <input
              type="date"
              className="el-date-input"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>

          {hasFilters && (
            <button className="el-clear" onClick={clearFilters}>
              ✕ Effacer les filtres
            </button>
          )}
        </div>

        {/* Results count */}
        {!loading && !error && (
          <p className="el-count">
            {events.length} événement{events.length !== 1 ? "s" : ""} trouvé
            {events.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* States */}
        {loading && (
          <div className="el-state">
            <div className="el-spinner" />
            <span>Chargement des événements…</span>
          </div>
        )}

        {error && !loading && (
          <div className="el-state el-error">
            <span>{error}</span>
            <button className="el-retry" onClick={() => fetchEvents(filters)}>
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="el-state el-empty">
            <div className="el-empty-icon">🗓</div>
            <p>Aucun événement ne correspond à vos critères.</p>
            {hasFilters && (
              <button className="el-retry" onClick={clearFilters}>
                Effacer les filtres
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && events.length > 0 && (
          <div className="el-grid">
            {events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
