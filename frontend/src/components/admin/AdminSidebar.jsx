import { NavLink, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Mail,
  Users,
  X
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import coloridoImage from "../../assets/colorido-hero.jpg";

function AdminSidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {open && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`admin-sidebar ${
          open ? "admin-sidebar-open" : ""
        }`}
      >
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-brand-mark">
            <img
              src={coloridoImage}
              alt="COLORIDO"
            />
          </div>

          <div className="admin-sidebar-brand-text">
            <strong>COLORIDO 2K26</strong>
            <span>ADMIN PANEL</span>
          </div>

          <button
            type="button"
            className="admin-sidebar-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <div className="admin-sidebar-label">
          MANAGEMENT
        </div>

        <nav className="admin-sidebar-nav">
          <NavLink
            to="/admin"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `admin-sidebar-link ${
                isActive
                  ? "admin-sidebar-link-active"
                  : ""
              }`
            }
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/events"
            onClick={onClose}
            className={({ isActive }) =>
              `admin-sidebar-link ${
                isActive
                  ? "admin-sidebar-link-active"
                  : ""
              }`
            }
          >
            <CalendarDays size={18} />
            <span>Events</span>
          </NavLink>

          <NavLink
            to="/admin/registrations"
            onClick={onClose}
            className={({ isActive }) =>
              `admin-sidebar-link ${
                isActive
                  ? "admin-sidebar-link-active"
                  : ""
              }`
            }
          >
            <Users size={18} />
            <span>Registrations</span>
          </NavLink>

          <NavLink
            to="/admin/contacts"
            onClick={onClose}
            className={({ isActive }) =>
              `admin-sidebar-link ${
                isActive
                  ? "admin-sidebar-link-active"
                  : ""
              }`
            }
          >
            <Mail size={18} />
            <span>Contact Messages</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <NavLink
            to="/"
            className="admin-website-link"
            onClick={onClose}
          >
            <ExternalLink size={16} />
            <span>View Website</span>
          </NavLink>

          <div className="admin-sidebar-profile">
            <div className="admin-profile-avatar">
              {user?.fullName
                ?.charAt(0)
                ?.toUpperCase() || "A"}
            </div>

            <div className="admin-profile-details">
              <strong>
                {user?.fullName ||
                  "COLORIDO Administrator"}
              </strong>

              <span>Administrator</span>
            </div>

            <button
              type="button"
              className="admin-logout-button"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;