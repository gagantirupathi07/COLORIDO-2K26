import { useState } from "react";
import {
  Outlet,
  useLocation
} from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import "../../styles/admin/admin-layout.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const location = useLocation();

  const getPageTitle = () => {
    if (
      location.pathname.startsWith(
        "/admin/registrations/"
      )
    ) {
      return "Registration Details";
    }

    if (
      location.pathname ===
      "/admin/registrations"
    ) {
      return "Registrations";
    }

    if (
      location.pathname ===
      "/admin/contacts"
    ) {
      return "Contact Messages";
    }

    if (
      location.pathname.startsWith(
        "/admin/events/"
      )
    ) {
      return "Event Management";
    }

    if (
      location.pathname ===
      "/admin/events"
    ) {
      return "Events";
    }

    return "Dashboard";
  };

  return (
    <div className="admin-shell">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="admin-main">
        <AdminTopbar
          title={getPageTitle()}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;