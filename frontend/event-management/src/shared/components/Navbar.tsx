import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

type Role = "ADMIN" | "ORGANIZER" | "PARTICIPANT";

interface NavUser {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

interface NavLink {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const IconEvents = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>);
const IconDashboard = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>);
const IconTicket = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 010 6v2a2 2 0 002 2h16a2 2 0 002-2v-2a3 3 0 010-6V7a2 2 0 00-2-2H4a2 2 0 00-2 2v2z" /></svg>);
const IconPlus = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>);
const IconUsers = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>);
const IconProfile = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>);
const IconLogout = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>);
const IconMenu = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>);
const IconClose = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>);

// ✅ BUG 1 CORRIGÉ : Routes alignées avec App.tsx
const LINKS: Record<Role, NavLink[]> = {
  PARTICIPANT: [
    { path: "/events", label: "Événements", icon: <IconEvents /> },
    { path: "/my-tickets", label: "Mes billets", icon: <IconTicket /> },
    { path: "/profile", label: "Profil", icon: <IconProfile /> },
  ],
  ORGANIZER: [
    { path: "/organizer/dashboard", label: "Dashboard", icon: <IconDashboard /> },
    { path: "/organizer/dashboard", label: "Mes événements", icon: <IconEvents /> },
    { path: "/organizer/create", label: "Créer événement", icon: <IconPlus /> },
  ],
  ADMIN: [
    { path: "/admin/users", label: "Utilisateurs", icon: <IconUsers /> },
    { path: "/events", label: "Tous les events", icon: <IconEvents /> },
    { path: "/admin/dashboard", label: "Dashboard", icon: <IconDashboard /> },
  ],
};

// ✅ BUG 3 CORRIGÉ : Lien profil par rôle
const PROFILE_LINK: Record<Role, string> = {
  ORGANIZER: "/organizer/profile",
  ADMIN: "/admin/profile",
  PARTICIPANT: "/profile",
};

const ROLE_BADGE: Record<Role, { label: string; color: string }> = {
  PARTICIPANT: { label: "Participant", color: "#00e5a0" },
  ORGANIZER: { label: "Organisateur", color: "#7c6fff" },
  ADMIN: { label: "Admin", color: "#f59e0b" },
};

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const rawUser = localStorage.getItem("user");
  const user: NavUser | null = rawUser ? JSON.parse(rawUser) : null;
  const role: Role = user?.role ?? "PARTICIPANT";
  const links = LINKS[role];
  const badge = ROLE_BADGE[role];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => {
    // ✅ BUG 2 CORRIGÉ : bonne clé "access_token"
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ✅ BUG 4 CORRIGÉ : fallback firstName/lastName
  const displayName = user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  const initials = displayName ? displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "?";

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <div className="nav-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="nav-logo-text">EventHub</span>
          </Link>

          <div className="nav-links">
            {links.map((link) => (
              <Link key={link.path + link.label} to={link.path} className={`nav-link ${location.pathname === link.path ? "active" : ""}`}>
                {link.icon}<span>{link.label}</span>
                {location.pathname === link.path && <div className="nav-link-dot" />}
              </Link>
            ))}
          </div>

          <div className="nav-right">
            {user ? (
              <div className="nav-user" ref={dropRef}>
                <button className="nav-avatar" onClick={() => setDropOpen(!dropOpen)}>
                  <div className="avatar-circle" style={{ borderColor: badge.color }}>{initials}</div>
                  <div className="nav-user-info">
                    <span className="nav-user-name">{displayName}</span>
                    <span className="nav-user-role" style={{ color: badge.color }}>{badge.label}</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: dropOpen ? "rotate(180deg)" : "none", transition: "0.2s" }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {dropOpen && (
                  <div className="nav-dropdown">
                    <div className="dropdown-header">
                      <div className="dropdown-avatar" style={{ borderColor: badge.color }}>{initials}</div>
                      <div>
                        <p className="dropdown-name">{displayName}</p>
                        <p className="dropdown-email">{user.email}</p>
                        <span className="dropdown-badge" style={{ color: badge.color, background: `${badge.color}15` }}>{badge.label}</span>
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                    {/* ✅ BUG 3 CORRIGÉ */}
                    <Link to={PROFILE_LINK[role]} className="dropdown-item" onClick={() => setDropOpen(false)}>
                      <IconProfile /> Mon profil
                    </Link>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item logout" onClick={handleLogout}><IconLogout /> Se déconnecter</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="nav-auth">
                <Link to="/login" className="nav-btn-ghost">Connexion</Link>
                <Link to="/register" className="nav-btn-solid">S'inscrire</Link>
              </div>
            )}
            <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>

        <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
          {links.map((link) => (
            <Link key={link.path + link.label} to={link.path} className={`nav-mobile-link ${location.pathname === link.path ? "active" : ""}`}>
              {link.icon}<span>{link.label}</span>
            </Link>
          ))}
          <div className="nav-mobile-divider" />
          {user ? (
            <button className="nav-mobile-link logout" onClick={handleLogout}><IconLogout /><span>Se déconnecter</span></button>
          ) : (
            <>
              <Link to="/login" className="nav-mobile-link"><IconProfile /><span>Connexion</span></Link>
              <Link to="/register" className="nav-mobile-link"><IconPlus /><span>S'inscrire</span></Link>
            </>
          )}
        </div>
      </nav>
      <div className="nav-spacer" />
    </>
  );
}