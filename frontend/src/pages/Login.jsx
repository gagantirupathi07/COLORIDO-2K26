import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from =
    location.state?.from?.pathname || "/";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await login(
        form.email.trim(),
        form.password
      );

      if (response?.role === "ADMIN") {
        navigate("/admin", {
          replace: true,
        });
        return;
      }

      navigate(from, {
        replace: true,
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Invalid email or password.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar />

      <main className="auth-main">
        <div className="auth-decoration auth-decoration-one" />
        <div className="auth-decoration auth-decoration-two" />

        <section className="auth-card">
          <div className="auth-card-header">
            <div className="auth-icon">
              <Sparkles size={24} />
            </div>

            <span className="auth-eyebrow">
              COLORIDO 2K26
            </span>

            <h1>Welcome Back</h1>

            <p>
              Sign in to continue your COLORIDO 2K26
              journey.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="auth-field">
              <label htmlFor="email">
                Email Address
              </label>

              <div className="auth-input-wrapper">
                <Mail size={19} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="password">
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>

              <div className="auth-input-wrapper">
                <LockKeyhole size={19} />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (value) => !value
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Login"}

              {!loading && (
                <ArrowRight size={19} />
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>NEW TO COLORIDO?</span>
          </div>

          <Link
            to="/signup"
            className="auth-secondary-button"
          >
            Create Account
          </Link>

          <p className="auth-footer-text">
            By continuing, you agree to participate in
            COLORIDO 2K26 under the event guidelines.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Login;