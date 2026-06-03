import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatsCard from "../components/Event/Dashboard/StatsCard";
import { DashboardRepository } from "../infrastructure/repositories/DashboardRepository";
import type { DashboardStats, OrganizerEvent } from "../domain/Dashboard";
import "./OrganizerDashboard.css";

/* ── helpers ── */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const STATUS_CFG = {
  PUBLISHED: { label: "Publié", color: "#00e5a0", bg: "rgba(0,229,160,0.1)" },
  DRAFT: { label: "Brouillon", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  CANCELLED: { label: "Annulé", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

/* ── mini bar chart ── */
function MiniBarChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const last7 = data.slice(-14);
  return (
    <div className="mini-chart">
      {last7.map((d, i) => (
        <div key={i} className="mini-bar-wrap" title={`${d.date} : ${d.count}`}>
          <div
            className="mini-bar"
            style={{ height: `${Math.max((d.count / max) * 100, 4)}%` }}
          />
        </div>
      ))}
    </div>
  );
}

/* ── main ── */
export default function OrganizerDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [events, setEvents] = useState<OrganizerEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "all" | "PUBLISHED" | "DRAFT" | "CANCELLED"
  >("all");

  useEffect(() => {
    Promise.all([
      DashboardRepository.getStats("me"),
      DashboardRepository.getMyEvents("me"),
    ])
      .then(([s, e]) => {
        setStats(s);
        setEvents(e);
      })
      .catch(() => setError("Impossible de charger le dashboard."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet événement ?")) return;
    setDeletingId(id);
    try {
      await DashboardRepository.deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch {
      alert("Erreur lors de la suppression.");
    } finally {
      setDeletingId(null);
    }
  };

  const handlePublish = async (id: string, current: string) => {
    const next = current === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      await DashboardRepository.updateEventStatus(id, next);
      setEvents((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, status: next as OrganizerEvent["status"] } : e,
        ),
      );
    } catch {
      alert("Erreur lors de la mise à jour.");
    }
  };

  const filtered =
    activeTab === "all" ? events : events.filter((e) => e.status === activeTab);

  if (loading)
    return (
      <div className="db-loading">
        <div className="db-spinner" />
        <span>Chargement du dashboard…</span>
      </div>
    );

  if (error)
    return (
      <div className="db-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    );

  return (
    <div className="db-root">
      <div className="db-bg" />

      {/* Header */}
      <header className="db-header">
        <div className="db-header-left">
          <p className="db-eyebrow">Tableau de bord</p>
          <h1 className="db-title">Mes événements</h1>
        </div>
        <Link to="/events/new" className="db-create-btn">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nouvel événement
        </Link>
      </header>

      <div className="db-content">
        {/* Stats row */}
        {stats && (
          <div className="db-stats-grid">
            <StatsCard
              index={0}
              label="Événements créés"
              value={stats.totalEvents}
              sub="total"
              accent="#7c6fff"
              icon={
                <svg
                  width="20"
                  height="20"
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
              }
            />
            <StatsCard
              index={1}
              label="Inscriptions totales"
              value={stats.totalRegistrations}
              sub="tous événements"
              accent="#00e5a0"
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              }
            />
            <StatsCard
              index={2}
              label="Taux de remplissage"
              value={`${Math.round(stats.averageFillRate ?? 0)}%`}
              sub="moyenne"
              accent="#f59e0b"
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              }
            />
            <StatsCard
              index={3}
              label="Événements publiés"
              value={events.filter((e) => e.status === "PUBLISHED").length}
              sub={`sur ${events.length} au total`}
              accent="#06b6d4"
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              }
            />
          </div>
        )}

        {/* Chart + top events */}
        {stats && (
          <div className="db-charts-row">
            {/* Daily chart */}
            <div className="db-chart-card">
              <div className="db-card-header">
                <h2 className="db-card-title">Inscriptions par jour</h2>
                <span className="db-card-sub">14 derniers jours</span>
              </div>
              {stats.dailyRegistrations?.length > 0 ? (
                <MiniBarChart data={stats.dailyRegistrations} />
              ) : (
                <div className="db-chart-empty">Pas encore de données</div>
              )}
            </div>

            {/* Top events */}
            <div className="db-chart-card">
              <div className="db-card-header">
                <h2 className="db-card-title">Top événements</h2>
                <span className="db-card-sub">par remplissage</span>
              </div>
              <div className="db-top-list">
                {stats.topEvents?.length > 0 ? (
                  stats.topEvents.map((ev, i) => (
                    <div key={ev.id} className="db-top-item">
                      <span className="db-top-rank">#{i + 1}</span>
                      <div className="db-top-info">
                        <span className="db-top-name">{ev.title}</span>
                        <div className="db-top-bar-track">
                          <div
                            className="db-top-bar-fill"
                            style={{
                              width: `${ev.fillRate}%`,
                              background:
                                ev.fillRate >= 90
                                  ? "#ef4444"
                                  : ev.fillRate >= 60
                                    ? "#f59e0b"
                                    : "#00e5a0",
                            }}
                          />
                        </div>
                      </div>
                      <span className="db-top-pct">
                        {Math.round(ev.fillRate)}%
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="db-chart-empty">Aucune donnée</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Events table */}
        <div className="db-table-card">
          <div className="db-card-header">
            <h2 className="db-card-title">Tous mes événements</h2>
            {/* Tabs */}
            <div className="db-tabs">
              {(["all", "PUBLISHED", "DRAFT", "CANCELLED"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    className={`db-tab ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "all" ? "Tous" : STATUS_CFG[tab].label}
                    <span className="db-tab-count">
                      {tab === "all"
                        ? events.length
                        : events.filter((e) => e.status === tab).length}
                    </span>
                  </button>
                ),
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="db-table-empty">
              <span>🗓</span>
              <p>Aucun événement dans cette catégorie.</p>
              <Link to="/events/new" className="db-create-btn-sm">
                Créer un événement
              </Link>
            </div>
          ) : (
            <div className="db-table-wrap">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Événement</th>
                    <th>Date</th>
                    <th>Lieu</th>
                    <th>Inscriptions</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((ev, i) => {
                    const filled = ev._count?.registrations ?? 0;
                    const pct =
                      ev.capacity > 0
                        ? Math.round((filled / ev.capacity) * 100)
                        : 0;
                    const st = STATUS_CFG[ev.status];
                    return (
                      <tr key={ev.id} style={{ animationDelay: `${i * 50}ms` }}>
                        <td>
                          <Link
                            to={`/events/${ev.id}`}
                            className="db-event-link"
                          >
                            {ev.title}
                          </Link>
                        </td>
                        <td className="db-td-muted">
                          {formatDate(ev.startDate)}
                        </td>
                        <td className="db-td-muted">{ev.location}</td>
                        <td>
                          <div className="db-fill-cell">
                            <span className="db-fill-label">
                              {filled}/{ev.capacity}
                            </span>
                            <div className="db-fill-track">
                              <div
                                className="db-fill-bar"
                                style={{
                                  width: `${pct}%`,
                                  background:
                                    pct >= 90
                                      ? "#ef4444"
                                      : pct >= 60
                                        ? "#f59e0b"
                                        : "#00e5a0",
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className="db-status-badge"
                            style={{
                              color: st.color,
                              background: st.bg,
                              border: `1px solid ${st.color}33`,
                            }}
                          >
                            {st.label}
                          </span>
                        </td>
                        <td>
                          <div className="db-actions">
                            {/* Publish / Unpublish */}
                            <button
                              className="db-action-btn publish"
                              onClick={() => handlePublish(ev.id, ev.status)}
                              title={
                                ev.status === "PUBLISHED"
                                  ? "Dépublier"
                                  : "Publier"
                              }
                            >
                              {ev.status === "PUBLISHED" ? (
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                                  <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                              ) : (
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                              )}
                            </button>
                            {/* Edit */}
                            <Link
                              to={`/events/${ev.id}/edit`}
                              className="db-action-btn edit"
                              title="Modifier"
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </Link>
                            {/* Delete */}
                            <button
                              className="db-action-btn delete"
                              onClick={() => handleDelete(ev.id)}
                              disabled={deletingId === ev.id}
                              title="Supprimer"
                            >
                              {deletingId === ev.id ? (
                                <div className="db-mini-spinner" />
                              ) : (
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                  <path d="M10 11v6M14 11v6" />
                                  <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
