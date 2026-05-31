import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./features/Authentification/presentation/components/LandingPage";
import LoginPage from "./features/Authentification/presentation/components/LoginPage";
import RegisterPage from "./features/Authentification/presentation/components/RegisterPage";
import EventsPage from "./features/Authentification/presentation/components/EventsPage";

import AdminDashboard from "./features/admin/presentation/components/AdminDashboard";

import OrganizerDashboard from "./features/organizer/presentation/components/OrganizerDashboard";
import EventFormPage from "./features/organizer/presentation/components/EventFormPage";

import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<EventsPage />} />

          {/* Organisateur */}
          <Route
            path="/organizer/dashboard"
            element={<OrganizerDashboard />}
          />

          <Route
            path="/organizer/events/create"
            element={<EventFormPage />}
          />

          Admin
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;