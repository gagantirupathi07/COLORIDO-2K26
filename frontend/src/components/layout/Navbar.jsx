import {
  LogIn,
  LogOut,
  Menu,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "../../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { isAuthenticated, logout } = useAuth();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className="site-navbar">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenu}
        >
          <div className="navbar-college-logo">
            <img
              src="/src/assets/rvrjc-logo.png"
              alt="R.V.R. & J.C. College of Engineering"
            />
          </div>

          <div className="navbar-brand-content">
            <div className="navbar-event-name">
              <span>COLORIDO</span>
              <strong>2K26</strong>
            </div>

            <p>
              R.V.R. & J.C. College of Engineering
            </p>
          </div>
        </Link>

        <nav className="navbar-links">
          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/events">Events</Link>

          {isAuthenticated && (
            <Link to="/my-registrations">
              My Registrations
            </Link>
          )}

          <Link to="/contact">Contact</Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="navbar-login"
              >
                <LogIn size={16} />
                Login
              </Link>

              <Link
                to="/signup"
                className="navbar-register"
              >
                <UserPlus size={16} />
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="navbar-register"
              >
                Register
              </Link>

              <button
                type="button"
                className="navbar-logout"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </nav>

        <button
          type="button"
          className="navbar-menu-button"
          onClick={() =>
            setMenuOpen((value) => !value)
          }
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-menu">
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/about" onClick={closeMenu}>
            About
          </Link>

          <Link to="/events" onClick={closeMenu}>
            Events
          </Link>

          {isAuthenticated && (
            <Link
              to="/my-registrations"
              onClick={closeMenu}
            >
              My Registrations
            </Link>
          )}

          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="mobile-register"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="mobile-register"
                onClick={closeMenu}
              >
                Register
              </Link>

              <button
                type="button"
                className="mobile-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;