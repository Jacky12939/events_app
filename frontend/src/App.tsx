import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyTicket from "./pages/MyTicket";
import ParticipantEvents from "./pages/ParticipantEvents";
import OrganizerPage from "./pages/OrganizerPage";
import CheckerPage from "./pages/CheckerPage";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/checker" element={
          <PrivateRoute><CheckerPage /></PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/checker" element={
          <PrivateRoute><CheckerPage /></PrivateRoute>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/checker" element={
          <PrivateRoute><CheckerPage /></PrivateRoute>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/checker" element={
          <PrivateRoute><CheckerPage /></PrivateRoute>
        } />
        <Route path="/events" element={
          <PrivateRoute><ParticipantEvents /></PrivateRoute>
        } />
        <Route path="/checker" element={
          <PrivateRoute><CheckerPage /></PrivateRoute>
        } />
        <Route path="/my-tickets" element={
          <PrivateRoute><MyTicket /></PrivateRoute>
        } />
        <Route path="/checker" element={
          <PrivateRoute><CheckerPage /></PrivateRoute>
        } />
        <Route path="/organizer" element={
          <PrivateRoute><OrganizerPage /></PrivateRoute>
        } />
        <Route path="/checker" element={
          <PrivateRoute><CheckerPage /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
