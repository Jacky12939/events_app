import { Link } from "react-router-dom";
import type { Event } from "../../domain/entities/Events";

interface Props {
  event: Event;
  index?: number;
}

const STATUS_CONFIG = {
  PUBLISHED: { label: "Ouvert", color: "#00e5a0", bg: "rgba(0,229,160,0.1)" },
  DRAFT: { label: "Brouillon", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  CANCELLED: { label: "Annulé", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function EventCard({ event, index = 0 }: Props) {
  const status = STATUS_CONFIG[event.status];
  const filled = event._count?.registrations ?? 0;
  const pct =
    event.capacity > 0 ? Math.min((filled / event.capacity) * 100, 100) : 0;
  const isFull = filled >= event.capacity;

  return (
    <Link
      to={`/events/${event.id}`}
      style={{ animationDelay: `${index * 80}ms` }}
      className="event-card"
    >
      {/* Image / placeholder */}
      <div className="card-image">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.title} />
        ) : (
          <div className="card-image-placeholder">
            <span>{event.title.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <div
          className="card-status-badge"
          style={{
            color: status.color,
            background: status.bg,
            border: `1px solid ${status.color}33`,
          }}
        >
          {status.label}
        </div>
      </div>

      {/* Content */}
      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>

        <div className="card-meta">
          <span className="meta-item">
            <svg
              width="13"
              height="13"
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
            {formatDate(event.startDate)}
          </span>
          <span className="meta-item">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {event.location}
          </span>
        </div>

        {event.description && <p className="card-desc">{event.description}</p>}

        {/* Capacity bar */}
        <div className="capacity-section">
          <div className="capacity-header">
            <span>
              {filled} / {event.capacity} places
            </span>
            {isFull && <span className="full-tag">Complet</span>}
          </div>
          <div className="capacity-track">
            <div
              className="capacity-fill"
              style={{
                width: `${pct}%`,
                background:
                  pct >= 90 ? "#ef4444" : pct >= 60 ? "#f59e0b" : "#00e5a0",
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
