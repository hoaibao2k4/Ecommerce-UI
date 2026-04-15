import CustomButton from "@/components/ui/button";
import { Link, useLocation } from "react-router";
import { menuItems } from "./AdminSidebar";

export default function AdminHeader({
  onToggleSidebar,
}: Readonly<{ onToggleSidebar: () => void }>) {
  const location = useLocation();

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 md:px-8 shadow-sm shrink-0">
      <div className="flex items-center gap-4">
        <CustomButton
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
          aria-label="Toggle Navigation"
          variant="secondary"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </CustomButton>
        <h2 className="text-lg font-bold text-slate-800 truncate">
          {menuItems.find((m) =>
            m.path === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(m.path),
          )?.name || "Dashboard"}
        </h2>
      </div>
      <div className="flex items-center gap-6">
        {/* Switch Button */}
        <Link to="/">
          <CustomButton
            variant="secondary"
            size="sm"
            className="hidden md:block transition-colors"
          >
            View Client UI
          </CustomButton>
        </Link>
        <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-primary flex items-center justify-center text-sm font-bold text-slate-600">
            AD
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-slate-800">Admin User</p>
            <p className="text-xs text-slate-500">admin@ecommerce.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
