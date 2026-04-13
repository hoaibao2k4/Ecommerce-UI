import CustomButton from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  FaBox,
  FaChartBar,
  FaShoppingCart,
  FaSignOutAlt,
  FaUserFriends,
} from "react-icons/fa";
import { Link, useLocation } from "react-router";

export const menuItems = [
  { name: "Dashboard", path: "/admin", icon: <FaChartBar /> },
  { name: "Products", path: "/admin/products", icon: <FaBox /> },
  { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
  { name: "Users", path: "/admin/users", icon: <FaUserFriends /> },
];

export default function AdminSidebar({
  isOpen,
  setIsOpen,
}: Readonly<{ isOpen: boolean; setIsOpen: (val: boolean) => void }>) {
  const location = useLocation();
  const { handleLogout, isLoading } = useAuth();

  return (
    <aside
      className={`fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transition-all duration-300 transform shrink-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 shadow-none"
      }`}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
        <span className="text-2xl font-black tracking-widest text-primary italic">
          ADMIN
        </span>
        <button
          className="lg:hidden text-slate-400 hover:text-white"
          onClick={() => setIsOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-700">
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/admin" && location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div
                className={`text-xl transition-transform group-hover:scale-110 ${
                  isActive ? "text-white" : "text-primary/70"
                }`}
              >
                {item.icon}
              </div>
              <span className="whitespace-nowrap">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 shrink-0">
        <CustomButton
          onClick={handleLogout}
          disabled={isLoading}
          className="flex items-center gap-4 px-4 py-3 w-full rounded-xl font-medium text-slate-400 hover:bg-red-500 hover:text-white transition-all duration-300 group"
        >
          <FaSignOutAlt className="text-xl group-hover:-translate-x-1 transition-transform" />
          <span className="whitespace-nowrap">Sign Out</span>
        </CustomButton>
      </div>
    </aside>
  );
}
