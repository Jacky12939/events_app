import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthScreen } from "./features/Authentification/presentation/components/AuthScreen";
import { ProtectedRoute } from "./shared/guards/ProtectedRoute";
import { UnauthorizedPage } from "./shared/components/UnauthorizedPage";

import { AdminFeatureContainer } from "./features/admin/presentation/AdminFeatureContainer";
import { OrganizerFeatureContainer } from "./features/organizer/presentation/OrganizerFeatureContainer";
import { ParticipantDashboard } from "./features/participant/presentation/components/ParticipantDashboard";
import LandingPage from "./features/Landing/presentation/LandingPage";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthScreen initialView="login" />} />
        <Route path="/register" element={<AuthScreen initialView="register" />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminFeatureContainer /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminFeatureContainer /></ProtectedRoute>} />
        <Route path="/admin/view/:id" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminFeatureContainer /></ProtectedRoute>} />

        {/* ✅ Routes Organisateur unifiées avec :view dynamique */}
        <Route path="/organizer" element={<Navigate to="/organizer/dashboard" replace />} />
        <Route path="/organizer/:view" element={<ProtectedRoute allowedRoles={["ORGANIZER"]}><OrganizerFeatureContainer /></ProtectedRoute>} />
        <Route path="/organizer/:view/:id" element={<ProtectedRoute allowedRoles={["ORGANIZER"]}><OrganizerFeatureContainer /></ProtectedRoute>} />

        <Route path="/events" element={<ProtectedRoute allowedRoles={["PARTICIPANT"]}><ParticipantDashboard /></ProtectedRoute>} />
        <Route path="/participant/events" element={<Navigate to="/events" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;