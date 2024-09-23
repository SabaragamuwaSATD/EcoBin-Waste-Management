import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ScheduleCollection from "./pages/ScheduleCollection";
import GarbageTracker from "./pages/GarbageTracker";
import Authority from "./pages/Authority";
import Payment from "./pages/Payment";
import Help from "./pages/Help";
import ViewCollection from "./pages/viewCollections";
import Navbar from "./components/navBar";

function App() {
  return (
    <Router>
      <div className=" flex flex-col h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <div className="flex-1 overflow-x-hidden overflow-y-auto h-full ml-64 pt-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/schedule" element={<ScheduleCollection />} />
              <Route path="/tracker" element={<GarbageTracker />} />
              <Route path="/authority" element={<Authority />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/help" element={<Help />} />
              <Route path="/viewCollections" element={<ViewCollection />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
