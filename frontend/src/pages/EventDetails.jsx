import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  IndianRupee,
  Timer,
  CheckCircle2,
} from "lucide-react";
import { getEventById } from "../api/eventApi";
import "../styles/event-pages.css";

function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getEventById(id);
        const eventData = data?.data || data;

        setEvent(eventData);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load event details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const formatDate = (date) => {
    if (!date) {
      return "To be announced";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  const formatTime = (time) => {
    if (!time) {
      return "To be announced";
    }

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatFee = (fee) => {
    if (fee === null || fee === undefined) {
      return "To be announced";
    }

    const numericFee = Number(fee);

    if (numericFee === 0) {
      return "Free";
    }

    return `₹${numericFee.toLocaleString("en-IN")}`;
  };

  const getGenderLabel = () => {
    if (!event?.gender || event.gender === "OPEN") {
      return "";
    }

    if (event.gender === "MALE") {
      return "Boys";
    }

    if (event.gender === "FEMALE") {
      return "Girls";
    }

    return event.gender;
  };

  const handleRegister = () => {
    navigate(`/register?eventId=${event.id}`);
  };

  if (loading) {
    return (
      <main className="event-details-page">
        <div className="event-details-shell">
          <div className="event-details-loading">
            <div className="event-loading-spinner"></div>
            <p>Loading event details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="event-details-page">
        <div className="event-details-shell">
          <div className="event-details-error">
            <h1>Event Not Found</h1>

            <p>
              {error ||
                "The requested event could not be found."}
            </p>

            <Link
              to="/events"
              className="event-back-button"
            >
              <ArrowLeft size={18} />
              Back to Events
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="event-details-page">
      <section className="event-details-hero">
        <div className="event-details-shell">

          <div className="event-navigation">
            <Link
              to="/events"
              className="event-back-link"
            >
              <ArrowLeft size={18} />
              <span>Back to Events</span>
            </Link>
          </div>

          {event.imageUrl && (
            <div className="event-details-image">
              <img
                src={event.imageUrl}
                alt={event.name}
              />
            </div>
          )}

          <div className="event-hero-content">

            <div className="event-category-row">
              <span className="event-category-badge">
                {event.category === "SPORTS"
                  ? "SPORTS"
                  : "CULTURAL"}
              </span>

              {event.subcategory && (
                <>
                  <span className="event-category-divider">
                    /
                  </span>

                  <span className="event-subcategory">
                    {event.subcategory}
                  </span>
                </>
              )}

              {getGenderLabel() && (
                <>
                  <span className="event-category-divider">
                    /
                  </span>

                  <span className="event-gender">
                    {getGenderLabel()}
                  </span>
                </>
              )}
            </div>

            <h1>{event.name}</h1>

            <p className="event-hero-description">
              {event.description ||
                "Event details will be announced by the organizers."}
            </p>

            <button
              type="button"
              className="event-register-button"
              onClick={handleRegister}
            >
              Register for this Event
            </button>
          </div>
        </div>
      </section>

      <section className="event-details-content">
        <div className="event-details-shell">

          <div className="event-info-grid">

            <div className="event-info-card">
              <div className="event-info-icon">
                <CalendarDays size={22} />
              </div>

              <div>
                <span>Date</span>

                <strong>
                  {formatDate(event.eventDate)}
                </strong>
              </div>
            </div>

            <div className="event-info-card">
              <div className="event-info-icon">
                <Clock3 size={22} />
              </div>

              <div>
                <span>Time</span>

                <strong>
                  {formatTime(event.eventStartTime)}
                </strong>
              </div>
            </div>

            <div className="event-info-card">
              <div className="event-info-icon">
                <MapPin size={22} />
              </div>

              <div>
                <span>Venue</span>

                <strong>
                  {event.venue ||
                    "To be announced"}
                </strong>
              </div>
            </div>

            <div className="event-info-card">
              <div className="event-info-icon">
                <Users size={22} />
              </div>

              <div>
                <span>Team Size</span>

                <strong>
                  {event.teamSize || "Individual"}
                </strong>
              </div>
            </div>

          </div>

          <div className="event-main-grid">

            <div className="event-main-column">

              <section className="event-detail-card">
                <div className="event-section-heading">

                  <span className="event-section-number">
                    01
                  </span>

                  <div>
                    <span>ABOUT THE EVENT</span>

                    <h2>
                      Event Details
                    </h2>
                  </div>

                </div>

                <p>
                  {event.description ||
                    "Event details will be announced by the organizers."}
                </p>
              </section>

              <section className="event-detail-card">
                <div className="event-section-heading">

                  <span className="event-section-number">
                    02
                  </span>

                  <div>
                    <span>RULES</span>

                    <h2>
                      Rules & Regulations
                    </h2>
                  </div>

                </div>

                <div className="event-detail-text">

                  {event.rules ? (
                    event.rules
                      .split("\n")
                      .filter(
                        (rule) => rule.trim()
                      )
                      .map((rule, index) => (
                        <div
                          className="event-rule-item"
                          key={index}
                        >
                          <CheckCircle2
                            size={18}
                          />

                          <p>
                            {rule}
                          </p>
                        </div>
                      ))
                  ) : (
                    <p>
                      Rules will be announced soon.
                    </p>
                  )}

                </div>
              </section>

              <section className="event-detail-card">
                <div className="event-section-heading">

                  <span className="event-section-number">
                    03
                  </span>

                  <div>
                    <span>ELIGIBILITY</span>

                    <h2>
                      Who Can Participate?
                    </h2>
                  </div>

                </div>

                <p>
                  {event.eligibility ||
                    "Eligibility details will be announced soon."}
                </p>
              </section>

            </div>

            <aside className="event-sidebar">

              <div className="event-registration-card">

                <span className="event-sidebar-label">
                  REGISTRATION
                </span>

                <h3>
                  Secure your spot
                </h3>

                <div className="event-registration-fee">

                  <IndianRupee size={22} />

                  <strong>
                    {formatFee(
                      event.registrationFee
                    )}
                  </strong>

                </div>

                <div className="event-sidebar-detail">

                  <CalendarDays size={18} />

                  <div>
                    <span>
                      Registration Deadline
                    </span>

                    <strong>
                      {formatDate(
                        event.registrationDeadline
                      )}
                    </strong>
                  </div>

                </div>

                <div className="event-sidebar-detail">

                  <Timer size={18} />

                  <div>
                    <span>
                      Duration
                    </span>

                    <strong>
                      {event.duration ||
                        "To be announced"}
                    </strong>
                  </div>

                </div>

                <button
                  type="button"
                  className="event-sidebar-register"
                  onClick={handleRegister}
                >
                  Register Now
                </button>

              </div>

            </aside>

          </div>
        </div>
      </section>
    </main>
  );
}

export default EventDetailsPage;