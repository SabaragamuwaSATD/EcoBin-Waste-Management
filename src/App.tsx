import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ScheduleCollection from "./pages/ScheduleCollection";
import GarbageTracker from "./pages/GarbageTracker";
import Authority from "./pages/Authority";
import Payment from "./pages/Payment";
import Help from "./pages/Help";
import ViewCollection from "./pages/viewCollections";
import Navbar from "./components/navBar";
import SignupPage from "./pages/SingUp";
import LoginPage from "./pages/SignIn";
import SendRequest from "./pages/sendRequest";

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col h-screen bg-gray-100">
    <Navbar />
    <div className="flex flex-1 pt-16">
      <Sidebar />
      <div className=" flex-1 overflow-x-hidden overflow-y-auto h-full  pt-4 ml-0 mt-10 md:mt-0 md:ml-64">
        {children}
      </div>
    </div>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/signup" || location.pathname === "/login";

  return isAuthRoute ? (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  ) : (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schedule" element={<ScheduleCollection />} />
        <Route path="/tracker" element={<GarbageTracker />} />
        <Route path="/authority" element={<Authority />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/help" element={<Help />} />
        <Route path="/viewCollections" element={<ViewCollection />} />
        <Route path="/request" element={<SendRequest />} />
      </Routes>
    </AppLayout>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
