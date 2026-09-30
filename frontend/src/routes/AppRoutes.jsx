import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Events from "../pages/Events";
import Contact from "../pages/Contact";
import EventDetails from "../pages/EventDetails";
import Register from "../pages/Register";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import VerifyOtp from "../pages/VerifyOtp";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import RegistrationHistory from "../pages/RegistrationHistory";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";

import AdminProtectedRoute from "../components/admin/AdminProtectedRoute";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminEvents from "../pages/admin/AdminEvents";
import AdminEventForm from "../pages/admin/AdminEventForm";
import AdminRegistrations from "../pages/admin/AdminRegistrations";
import AdminRegistrationDetails from "../pages/admin/AdminRegistrationDetails";
import AdminContacts from "../pages/admin/AdminContacts";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route
          path="/events/:id"
          element={<EventDetails />}
        />

        <Route
          path="/my-registrations"
          element={<RegistrationHistory />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate to="/" replace />
          }
        />
      </Route>

      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route
          index
          element={<AdminDashboard />}
        />

        <Route
          path="events"
          element={<AdminEvents />}
        />

        <Route
          path="events/new"
          element={<AdminEventForm />}
        />

        <Route
          path="events/:id/edit"
          element={<AdminEventForm />}
        />

        <Route
          path="registrations"
          element={<AdminRegistrations />}
        />

        <Route
          path="registrations/:id"
          element={
            <AdminRegistrationDetails />
          }
        />

        <Route
          path="contacts"
          element={<AdminContacts />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;