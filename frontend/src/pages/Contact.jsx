import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useState } from "react";

import { sendContactMessage } from "../api/contactApi";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import "../styles/contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitted(false);
    setError("");
    setLoading(true);

    try {
      await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

      setSubmitted(true);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <Navbar />

      <main>
        <section className="contact-hero">
          <div className="contact-hero-orb contact-hero-orb-one" />
          <div className="contact-hero-orb contact-hero-orb-two" />
          <div className="contact-hero-orb contact-hero-orb-three" />

          <div className="contact-hero-content">
            <span className="contact-eyebrow">
              <MessageCircle size={16} />
              GET IN TOUCH
            </span>

            <h1>
              Let&apos;s talk about
              <span>COLORIDO 2K26</span>
            </h1>

            <p>
              Have a question about registration, events, schedules,
              venues or anything related to COLORIDO 2K26? Reach out
              to the event team.
            </p>
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-container">
            <div className="contact-section-heading">
              <span>CONTACT INFORMATION</span>

              <h2>We&apos;re here to help.</h2>

              <p>
                Get in touch with the COLORIDO 2K26 organizing team
                for event-related information and assistance.
              </p>
            </div>

            <div className="contact-layout">
              <div className="contact-info">
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <MapPin size={22} />
                  </div>

                  <div className="contact-info-content">
                    <span>Venue & Host Institution</span>

                    <h3>
                      R.V.R. & J.C. College of Engineering
                    </h3>

                    <p>
                      Chandramoulipuram, Chowdavaram,
                      Guntur-522019, Andhra Pradesh
                    </p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <Mail size={22} />
                  </div>

                  <div className="contact-info-content">
                    <span>Email Support</span>

                    <h3>COLORIDO 2K26 Event Office</h3>

                    <p>
                      colorido2k26@gmail.com
                    </p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <Phone size={22} />
                  </div>

                  <div className="contact-info-content">
                    <span>Phone Support</span>

                    <h3>
                      Event Help Desk Number: 7032499169
                    </h3>

                    <p>
                      Available for event-related assistance
                      and registration queries.
                    </p>
                  </div>
                </div>

                <div className="contact-highlight">
                  <MessageCircle size={22} />

                  <div>
                    <strong>Need quick assistance?</strong>

                    <p>
                      Contact the COLORIDO 2K26 event team for
                      registration, event and schedule-related
                      questions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-form-card">
                <div className="contact-form-heading">
                  <span>MESSAGE US</span>

                  <h2>Have a question?</h2>

                  <p>
                    Send us your message and the COLORIDO team
                    can get back to you.
                  </p>
                </div>

                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                >
                  <div className="contact-form-grid">
                    <div className="contact-field">
                      <label htmlFor="name">
                        Full Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="email">
                        Email Address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="subject">
                      Subject
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What is your question about?"
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="message">
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      rows="6"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="contact-submit"
                    disabled={loading}
                  >
                    {loading
                      ? "Sending..."
                      : "Send Message"}

                    {!loading && (
                      <ArrowRight size={19} />
                    )}
                  </button>

                  {submitted && (
                    <div className="contact-success">
                      Your message has been sent successfully.
                      The COLORIDO team will get back to you.
                    </div>
                  )}

                  {error && (
                    <div className="contact-error">
                      {error}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-bottom">
          <div className="contact-bottom-content">
            <span>COLORIDO 2K26</span>

            <h2>CREATE. COMPETE. CELEBRATE.</h2>

            <p>
              A national-level celebration of culture, creativity
              and sporting spirit.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;