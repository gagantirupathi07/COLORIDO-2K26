import { Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import EventCard from "../components/events/EventCard";
import { getEvents } from "../api/eventApi";

import "../styles/event-pages.css";

function Cultural() {
  const [events, setEvents] = useState([]);
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
            "Unable to load cultural events."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const culturalEvents = useMemo(
    () =>
      events.filter(
        (event) => event.category === "CULTURAL"
      ),
    [events]
  );

  return (
    <div className="event-page">
      <Navbar />

      <main>
        <section className="event-page-hero cultural-hero">
          <div>
            <span className="event-page-label">
              <Sparkles size={16} />
              CULTURAL EVENTS
            </span>

            <h1>
              Express.
              <span>Perform. Create.</span>
            </h1>

            <p>
              Explore cultural events currently published
              for COLORIDO 2K26.
            </p>
          </div>
        </section>

        <section className="event-page-content">
          {loading && (
            <div className="event-page-state">
              Loading cultural events...
            </div>
          )}

          {!loading && error && (
            <div className="event-page-state error">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            culturalEvents.length === 0 && (
              <div className="event-page-state">
                No cultural events have been published yet.
              </div>
            )}

          {!loading &&
            !error &&
            culturalEvents.length > 0 && (
              <div className="event-page-grid">
                {culturalEvents.map((event) => (
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

export default Cultural;