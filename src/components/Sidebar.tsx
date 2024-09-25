import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  MapPin,
  Users,
  CreditCard,
  HelpCircle,
  Recycle,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, text: "Dashboard", path: "/" },
    { icon: Calendar, text: "Schedule collection", path: "/schedule" },
    { icon: MapPin, text: "Garbage Tracker", path: "/tracker" },
    { icon: Users, text: "Authority", path: "/authority" },
    { icon: CreditCard, text: "Payment", path: "/payment" },
    { icon: HelpCircle, text: "Help", path: "/help" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        className="md:hidden fixed top-24 left-4 z-20 p-2 bg-yellow-500 rounded-full"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <XIcon className="w-6 h-6  text-white" />
        ) : (
          <MenuIcon className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-white w-64 min-h-screen flex flex-col fixed top-0 left-0 bottom-0 z-10 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
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
              // onClick={toggleSidebar}
              onClick={handleMenuItemClick}
            >
              <item.icon className="w-5 h-5 mr-2" />
              <span>{item.text}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className=" inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
