import { Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import EventCard from "../components/events/EventCard";
import { getEvents } from "../api/eventApi";

import "../styles/event-pages.css";

function Sports() {
  const [events, setEvents] = useState([]);
  const [gender, setGender] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);

        const response = await getEvents();

        const data =
          response?.data ||
          response?.content ||
          response ||
          [];

        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load sports events."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const sportsEvents = useMemo(() => {
    return events.filter((event) => {
      if (event.category !== "SPORTS") {
        return false;
      }

      if (gender === "ALL") {
        return true;
      }

      return event.gender === gender;
    });
  }, [events, gender]);

  return (
    <div className="event-page">
      <Navbar />

      <main>
        <section className="event-page-hero sports-hero">
          <div>
            <span className="event-page-label">
              <Trophy size={16} />
              SPORTS EVENTS
            </span>

            <h1>
              Compete.
              <span>Challenge. Win.</span>
            </h1>

            <p>
              Explore sports events currently published
              for COLORIDO 2K26.
            </p>
          </div>
        </section>

        <section className="event-page-content">
          <div className="sports-gender-filter">
            <button
              type="button"
              className={
                gender === "ALL" ? "active" : ""
              }
              onClick={() => setGender("ALL")}
            >
              All Sports
            </button>

            <button
              type="button"
              className={
                gender === "BOYS" ? "active" : ""
              }
              onClick={() => setGender("BOYS")}
            >
              Boys
            </button>

            <button
              type="button"
              className={
                gender === "GIRLS" ? "active" : ""
              }
              onClick={() => setGender("GIRLS")}
            >
              Girls
            </button>

            <button
              type="button"
              className={
                gender === "OPEN" ? "active" : ""
              }
              onClick={() => setGender("OPEN")}
            >
              Open
            </button>
          </div>

          {loading && (
            <div className="event-page-state">
              Loading sports events...
            </div>
          )}

          {!loading && error && (
            <div className="event-page-state error">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            sportsEvents.length === 0 && (
              <div className="event-page-state">
                No sports events have been published yet.
              </div>
            )}

          {!loading &&
            !error &&
            sportsEvents.length > 0 && (
              <div className="event-page-grid">
                {sportsEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                  />
                ))}
              </div>
            )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Sports;