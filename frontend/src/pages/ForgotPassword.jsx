import {
  ArrowRight,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { sendForgotPasswordOtp } from "../api/authApi";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import "../styles/auth.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await sendForgotPasswordOtp({
        email: email.trim(),
      });

      navigate("/reset-password", {
        state: {
          email: email.trim(),
        },
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to send password reset OTP.";

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
              ACCOUNT RECOVERY
            </span>

            <h1>Forgot Password?</h1>

            <p>
              Enter your registered email address and
              we&apos;ll send you a verification code.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="auth-field">
              <label htmlFor="forgot-email">
                Email Address
              </label>

              <div className="auth-input-wrapper">
                <Mail size={19} />

                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email"
                  required
                />
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
                ? "Sending OTP..."
                : "Send Reset OTP"}

              {!loading && (
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

export default ForgotPassword;