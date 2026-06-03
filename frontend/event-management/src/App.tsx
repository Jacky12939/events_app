import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventList from "./pages/EventList";
import EventDetail from "./pages/EventDetail";
import OrganizerDashboard from "./pages/OrganizerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/dashboard" element={<OrganizerDashboard />} />
      </Routes>
      ;
    </BrowserRouter>
  );
}

export default App;
