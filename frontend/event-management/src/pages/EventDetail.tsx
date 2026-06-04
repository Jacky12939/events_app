import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { EventRepository } from "../infrastructure/repositories/EventRepository";
import type { Event } from "../domain/entities/Events";
import "./EventDetail.css";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_CONFIG = {
  PUBLISHED: {
    label: "Ouvert aux inscriptions",
    color: "#00e5a0",
    dot: "#00e5a0",
  },
  DRAFT: { label: "Brouillon", color: "#f59e0b", dot: "#f59e0b" },
  CANCELLED: { label: "Annulé", color: "#ef4444", dot: "#ef4444" },
};

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    EventRepository.findById(id)
      .then(setEvent)
      .catch(() => setError("Événement introuvable."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="ed-loading">
        <div className="ed-spinner" />
      </div>
    );

  if (error || !event)
    return (
      <div className="ed-error-page">
        <p>{error || "Événement introuvable."}</p>
        <button onClick={() => navigate("/events")}>
          ← Retour aux événements
        </button>
      </div>
    );

  const status = STATUS_CONFIG[event.status];
  const filled = event._count?.registrations ?? 0;
  const pct =
    event.capacity > 0 ? Math.min((filled / event.capacity) * 100, 100) : 0;
  const isFull = filled >= event.capacity;
  const canRegister = event.status === "PUBLISHED" && !isFull;

  return (
    <div className="ed-root">
      {/* Back */}
      <div className="ed-topbar">
        <Link to="/events" className="ed-back">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Tous les événements
        </Link>
      </div>

      {/* Hero image */}
      <div className="ed-hero">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.title} className="ed-hero-img" />
        ) : (
          <div className="ed-hero-placeholder">
            <span>{event.title.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <div className="ed-hero-overlay" />
      </div>

      {/* Content */}
      <div className="ed-content">
        {/* Left — main info */}
        <div className="ed-main">
          {/* Status */}
          <div className="ed-status" style={{ color: status.color }}>
            <span
              className="ed-status-dot"
              style={{ background: status.dot }}
            />
            {status.label}
          </div>

          <h1 className="ed-title">{event.title}</h1>

          {event.description && (
            <div className="ed-section">
              <h2 className="ed-section-title">À propos</h2>
              <p className="ed-desc">{event.description}</p>
            </div>
          )}

          {/* Capacity */}
          <div className="ed-section">
            <h2 className="ed-section-title">Places disponibles</h2>
            <div className="ed-capacity-info">
              <span className="ed-capacity-numbers">
                <strong>{filled}</strong> inscrit{filled !== 1 ? "s" : ""} sur{" "}
                <strong>{event.capacity}</strong>
              </span>
              {isFull && <span className="ed-full-badge">Complet</span>}
            </div>
            <div className="ed-capacity-track">
              <div
                className="ed-capacity-fill"
                style={{
                  width: `${pct}%`,
                  background:
                    pct >= 90 ? "#ef4444" : pct >= 60 ? "#f59e0b" : "#00e5a0",
                }}
              />
            </div>
            <p className="ed-capacity-sub">
              {Math.round(100 - pct)}% des places encore disponibles
            </p>
          </div>
        </div>

        {/* Right — sidebar */}
        <aside className="ed-sidebar">
          <div className="ed-card">
            {/* Date */}
            <div className="ed-info-row">
              <div className="ed-info-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <span className="ed-info-label">Date de début</span>
                <span className="ed-info-value">
                  {formatDate(event.startDate)}
                </span>
                <span className="ed-info-sub">
                  {formatTime(event.startDate)}
                </span>
              </div>
            </div>

            <div className="ed-info-row">
              <div className="ed-info-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <span className="ed-info-label">Date de fin</span>
                <span className="ed-info-value">
                  {formatDate(event.endDate)}
                </span>
                <span className="ed-info-sub">{formatTime(event.endDate)}</span>
              </div>
            </div>

            {/* Location */}
            <div className="ed-info-row">
              <div className="ed-info-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <span className="ed-info-label">Lieu</span>
                <span className="ed-info-value">{event.location}</span>
              </div>
            </div>

            <div className="ed-divider" />

            {/* CTA */}
            {canRegister ? (
              <Link to={`/events/${event.id}/register`} className="ed-cta">
                S'inscrire à cet événement
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div
                className={`ed-cta-disabled ${event.status === "CANCELLED" ? "cancelled" : ""}`}
              >
                {event.status === "CANCELLED"
                  ? "Événement annulé"
                  : "Complet — aucune place disponible"}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
