import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventList from "./pages/EventList";
import EventDetail from "./pages/EventDetail";
<<<<<<< HEAD
=======
import OrganizerDashboard from "./pages/OrganizerDashboard";
>>>>>>> origin/feature/frontend-events-reine

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail />} />
<<<<<<< HEAD
=======
        <Route path="/dashboard" element={<OrganizerDashboard />} />
>>>>>>> origin/feature/frontend-events-reine
      </Routes>
      ;
    </BrowserRouter>
  );
}

export default App;
