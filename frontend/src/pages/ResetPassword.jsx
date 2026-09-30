import {
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { resetPassword } from "../api/authApi";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import "../styles/auth.css";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
    newPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        name === "otp"
          ? value.replace(/\D/g, "").slice(0, 6)
          : value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await resetPassword({
        email: form.email.trim(),
        otp: form.otp,
        newPassword: form.newPassword,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1500);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to reset your password.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar />

      <main className="auth-main">
        <section className="auth-card">
          <div className="auth-card-header">
            <div className="auth-icon">
              <ShieldCheck size={24} />
            </div>

            <span className="auth-eyebrow">
              RESET PASSWORD
            </span>

            <h1>Create New Password</h1>

            <p>
              Enter the OTP sent to your email and
              choose a new password.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="auth-field">
              <label htmlFor="reset-email">
                Email Address
              </label>

              <input
                id="reset-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="reset-otp">
                Verification Code
              </label>

              <input
                id="reset-otp"
                name="otp"
                type="text"
                inputMode="numeric"
                maxLength="6"
                value={form.otp}
                onChange={handleChange}
                placeholder="Enter 6-digit OTP"
                className="otp-input"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="newPassword">
                New Password
              </label>

              <div className="auth-input-wrapper">
                <LockKeyhole size={19} />

                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  minLength="6"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            {success && (
              <div className="auth-success">
                Password reset successfully. Redirecting
                to login...
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading || success}
            >
              {loading
                ? "Resetting..."
                : "Reset Password"}

              {!loading && !success && (
                <ArrowRight size={19} />
              )}
            </button>
          </form>

          <div className="auth-existing-user">
            Remember your password?
            <Link to="/login">Back to Login</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ResetPassword;