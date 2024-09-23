import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  MapPin,
  Users,
  CreditCard,
  HelpCircle,
  Recycle,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, text: "Dashboard", path: "/" },
    { icon: Calendar, text: "Schedule collection", path: "/schedule" },
    { icon: MapPin, text: "Garbage Tracker", path: "/tracker" },
    { icon: Users, text: "Authority", path: "/authority" },
    { icon: CreditCard, text: "Payment", path: "/payment" },
    { icon: HelpCircle, text: "Help", path: "/help" },
  ];

  return (
    <div className="bg-white w-64 min-h-screen flex flex-col -mt-16 fixed top-16 left-0 bottom-0 z-10">
      <div className="p-4 flex items-center ml-14 mb-8 mt-10">
        <Recycle className="text-yellow-500 w-8 h-8 mr-2" />
        <span className="text-xl font-bold text-yellow-500">EcoBin</span>
      </div>
      <nav className="flex-1 ml-5">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-yellow-500 ${
              location.pathname === item.path ? "bg-yellow-200" : ""
            }`}
          >
            <item.icon className="w-5 h-5 mr-2" />
            <span>{item.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
