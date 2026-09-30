import {
  CalendarDays,
  LoaderCircle,
  Search,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import EventCard from "../components/events/EventCard";
import { getEvents } from "../api/eventApi";

import coloridoImage from "../assets/colorido-hero.jpg";

import "../styles/events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [gender, setGender] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError("");

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
            "Unable to load events from the server."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        !search ||
        event.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        event.subcategory
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "ALL" ||
        event.category === category;

      const matchesGender =
        gender === "ALL" ||
        event.gender === gender;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesGender
      );
    });
  }, [events, search, category, gender]);

  return (
    <div className="events-page">
      <Navbar />

      <main>
        <section className="events-hero">
          <div className="events-hero-content">
            <div className="events-label">
              <Sparkles size={16} />
              COLORIDO 2K26
            </div>

            <h1>
              Explore
              <span>Events</span>
            </h1>

            <p>
              Discover every event currently published by
              the COLORIDO 2K26 administration.
            </p>
          </div>

          <div className="events-hero-image">
            <div className="events-hero-image-frame">
              <img
                src={coloridoImage}
                alt="COLORIDO 2K26 events"
              />
            </div>
          </div>
        </section>

        <section className="events-section">
          <div className="events-section-heading">
            <span>EVENT DIRECTORY</span>

            <h2>Find Your Event</h2>

            <p>
              Events shown here are loaded directly from the
              COLORIDO server.
            </p>
          </div>

          <div className="events-toolbar">
            <div className="events-search">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <div className="events-filter">
              <button
                type="button"
                className={
                  category === "ALL"
                    ? "active"
                    : ""
                }
                onClick={() => setCategory("ALL")}
              >
                All
              </button>

              <button
                type="button"
                className={
                  category === "CULTURAL"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCategory("CULTURAL")
                }
              >
                <Sparkles size={16} />
                Cultural
              </button>

              <button
                type="button"
                className={
                  category === "SPORTS"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCategory("SPORTS")
                }
              >
                <Trophy size={16} />
                Sports
              </button>
            </div>

            <div className="events-filter">
              <button
                type="button"
                className={
                  gender === "ALL"
                    ? "active"
                    : ""
                }
                onClick={() => setGender("ALL")}
              >
                All
              </button>

              <button
                type="button"
                className={
                  gender === "BOYS"
                    ? "active"
                    : ""
                }
                onClick={() => setGender("BOYS")}
              >
                Boys
              </button>

              <button
                type="button"
                className={
                  gender === "GIRLS"
                    ? "active"
                    : ""
                }
                onClick={() => setGender("GIRLS")}
              >
                Girls
              </button>
            </div>
          </div>

          {loading && (
            <div className="events-state">
              <LoaderCircle
                size={30}
                className="events-loader"
              />
              <p>Loading events...</p>
            </div>
          )}

          {!loading && error && (
            <div className="events-state events-error">
              <p>{error}</p>
            </div>
          )}

          {!loading &&
            !error &&
            filteredEvents.length === 0 && (
              <div className="events-state">
                <CalendarDays size={32} />
                <h3>No events found</h3>
                <p>
                  No published events match your
                  current filters.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            filteredEvents.length > 0 && (
              <div className="events-grid">
                {filteredEvents.map((event) => (
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

export default Events;