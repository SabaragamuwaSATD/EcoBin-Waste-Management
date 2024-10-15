import { Bell, Mail, Search, DollarSign, LogOut } from "lucide-react";
import { Input } from "./input";
import { Avatar, AvatarImage } from "./avatar";
import avatar from "../assest/images/avatar2.jpg";
import { UserContext } from "../context/userProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const userContext = useContext(UserContext);
  const user = userContext ? userContext.user : null;
  const navigate = useNavigate();

  const handleLogout = () => {
    userContext?.logout();
    navigate("/login");
  };
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm ml-64 fixed top-0 left-0 right-0 z-10">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">
          Hi, {user ? `${user.firstName} ${user.lastName}` : "Guest"}
        </h1>
        <p className="-ml-11 text-sm text-gray-500">Dashboard</p>
      </div>
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <DollarSign className="text-gray-600" size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Mail className="text-gray-600" size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="text-gray-600" size={20} />
        </button>
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt="User Avatar" />
            {/* <AvatarFallback>CA</AvatarFallback> */}
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-medium">{user ? user.email : "Guest"}</p>
            <p className="text-xs text-gray-500">
              {user ? user.role : "Guest"}
            </p>
          </div>
        </div>
        {user && (
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut className="text-gray-600" size={20} />
          </button>
        )}
      </div>
    </nav>
  );
}
