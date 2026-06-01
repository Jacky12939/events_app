import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyTicket from "./pages/MyTicket";
import ParticipantEvents from "./pages/ParticipantEvents";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={
          <PrivateRoute><ParticipantEvents /></PrivateRoute>
        } />
        <Route path="/my-tickets" element={
          <PrivateRoute><MyTicket /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
