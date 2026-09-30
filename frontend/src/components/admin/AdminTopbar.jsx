import {
  Bell,
  Menu,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminTopbar({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <button
          type="button"
          className="admin-menu-button"
          onClick={onMenuClick}
          aria-label="Open admin navigation"
        >
          <Menu size={21} />
        </button>

        <div className="admin-topbar-heading">
          <span>
            <Sparkles size={14} />
            COLORIDO 2K26
          </span>

          <h1>
          Administration
          </h1>
        </div>
      </div>

      <div className="admin-topbar-right">
        

        <div className="admin-topbar-profile">


          <div className="admin-topbar-profile-info">
            <strong>
              {user?.fullName ||
                "COLORIDO Administrator "}
            </strong>

            
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminTopbar;