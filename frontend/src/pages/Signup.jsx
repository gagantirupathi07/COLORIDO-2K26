import {
  ArrowRight,
  LockKeyhole,
  Mail,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { sendRegistrationOtp } from "../api/authApi";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import "../styles/auth.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    college: "",
    year: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      await sendRegistrationOtp({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.trim(),
        college: form.college.trim(),
        year: form.year.trim(),
      });

      sessionStorage.setItem(
        "colorido_signup",
        JSON.stringify(form)
      );

      navigate("/verify-otp", {
        state: {
          email: form.email.trim(),
          purpose: "REGISTRATION",
        },
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to send OTP. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar />

      <main className="auth-main auth-main-large">
        <div className="auth-decoration auth-decoration-one" />
        <div className="auth-decoration auth-decoration-two" />

        <section className="auth-card auth-card-large">
          <div className="auth-card-header">
            <div className="auth-icon">
              <Sparkles size={24} />
            </div>

            <span className="auth-eyebrow">
              COLORIDO 2K26
            </span>

            <h1>Create Account</h1>

            <p>
              Join COLORIDO 2K26 and register for
              exciting cultural and sports events.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="auth-field">
              <label htmlFor="fullName">
                Full Name
              </label>

              <div className="auth-input-wrapper">
                <User size={19} />

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

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

            <div className="auth-form-grid">
              <div className="auth-field">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <div className="auth-input-wrapper">
                  <Phone size={19} />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="year">
                  Year
                </label>

                <input
                  id="year"
                  name="year"
                  type="text"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="e.g. 2nd Year"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="college">
                College / Institution
              </label>

              <input
                id="college"
                name="college"
                type="text"
                value={form.college}
                onChange={handleChange}
                placeholder="Enter your college"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">
                Password
              </label>

              <div className="auth-input-wrapper">
                <LockKeyhole size={19} />

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
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

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Sending OTP..."
                : "Continue to Verification"}

              {!loading && (
                <ArrowRight size={19} />
              )}
            </button>
          </form>

          <div className="auth-existing-user">
            Already have an account?
            <Link to="/login">Login</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Signup;