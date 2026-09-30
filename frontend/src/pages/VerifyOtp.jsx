import {
  ArrowRight,
  MailCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { verifyRegistrationOtp } from "../api/authApi";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import "../styles/auth.css";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const signupData = JSON.parse(
    sessionStorage.getItem("colorido_signup") ||
      "null"
  );

  const email =
    location.state?.email ||
    signupData?.email ||
    "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const response =
        await verifyRegistrationOtp({
          email,
          otp,
        });

      localStorage.setItem(
        "colorido_token",
        response.token
      );

      const userData = {
        userId: response.userId,
        fullName: response.fullName,
        email: response.email,
        role: response.role,
      };

      localStorage.setItem(
        "colorido_user",
        JSON.stringify(userData)
      );

      sessionStorage.removeItem(
        "colorido_signup"
      );

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Invalid or expired OTP.";

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
              <MailCheck size={24} />
            </div>

            <span className="auth-eyebrow">
              VERIFY YOUR EMAIL
            </span>

            <h1>Enter OTP</h1>

            <p>
              We sent a 6-digit verification code to
              <strong> {email}</strong>.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="auth-field">
              <label htmlFor="otp">
                Verification Code
              </label>

              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                maxLength="6"
                value={otp}
                onChange={(event) =>
                  setOtp(
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                  )
                }
                placeholder="Enter 6-digit OTP"
                className="otp-input"
                required
              />
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
                ? "Verifying..."
                : "Verify & Create Account"}

              {!loading && (
                <ArrowRight size={19} />
              )}
            </button>
          </form>

          <div className="auth-existing-user">
            Wrong email?
            <Link to="/signup">
              Go back to signup
            </Link>
          </div>

          <div className="auth-security-note">
            <Sparkles size={15} />
            Your verification code is valid for a
            limited time.
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default VerifyOtp;