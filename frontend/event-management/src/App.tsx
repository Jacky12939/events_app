import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthScreen } from './features/Authentification/presentation/components/AuthScreen';
import { ProtectedRoute } from './shared/guards/ProtectedRoute';
import { UnauthorizedPage } from './shared/components/UnauthorizedPage';

// Importe tes composants dashboard selon leur emplacement réel
import { AdminFeatureContainer } from './features/admin/presentation/AdminFeatureContainer';
import { OrganizerFeatureContainer } from './features/organizer/presentation/OrganizerFeatureContainer';
import { ParticipantDashboard } from './features/participant/presentation/components/ParticipantDashboard';
import LandingPage from './features/Landing/presentation/LandingPage';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<AuthScreen initialView="login" />} />
        <Route path="/register" element={<AuthScreen initialView="register" />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Routes protégées Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminFeatureContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminFeatureContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/view/:id"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminFeatureContainer />
            </ProtectedRoute>
          }
        />

        {/* Routes protégées Organisateur */}
        <Route
          path="/organizer/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ORGANIZER']}>
              <OrganizerFeatureContainer />
            </ProtectedRoute>
          }
        />

        {/* Routes protégées Participant */}
        <Route
          path="/events"
          element={
            <ProtectedRoute allowedRoles={['PARTICIPANT']}>
              <ParticipantDashboard />
            </ProtectedRoute>
          }
        />

        {/* Ancienne route participant conservée pour compatibilité */}
        <Route
          path="/participant/events"
          element={<Navigate to="/events" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;