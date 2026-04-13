import CustomButton from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router";

export default function Header() {
  const { isAuthenticated, isAdmin, handleLogout, isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "Cart", path: "/cart" },
    { title: "About", path: "/about" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors"
            >
              Ecommerce
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 hover:text-primary transition-colors font-medium"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  {isAdmin ? (
                    <Link
                      to="/admin"
                      className="text-sm px-3 py-1.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors font-semibold"
                    >
                      Admin UI
                    </Link>
                  ) : (
                    <Link
                      to="/orders"
                      className="text-gray-600 hover:text-primary transition-colors font-medium text-sm"
                    >
                      My Orders
                    </Link>
                  )}
                  <CustomButton
                    onClick={handleLogout}
                    disabled={isLoading}
                    variant="primary"
                    size="sm"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm"
                  >
                    Log out
                  </CustomButton>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-primary transition-colors font-medium text-sm"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all"
              >
                {link.title}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-100 sm:hidden">
              {isAuthenticated ? (
                <div className="space-y-1 mt-2">
                  <Link
                    to={isAdmin ? "/admin" : "/orders"}
                    className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {isAdmin ? "Admin Dashboard" : "My Orders"}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-hover shadow-sm"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
