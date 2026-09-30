import {
  CalendarDays,
  Edit3,
  LoaderCircle,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  deleteEvent,
  getAdminEvents,
} from "../../api/adminEventApi";

import "../../styles/admin/admin-events.css";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminEvents();

      const data =
        response?.data ||
        response?.content ||
        response ||
        [];

      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Unable to load events."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return events;
    }

    return events.filter((event) => {
      return (
        event.name?.toLowerCase().includes(query) ||
        event.subcategory
          ?.toLowerCase()
          .includes(query) ||
        event.category?.toLowerCase().includes(query)
      );
    });
  }, [events, search]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteEvent(id);

      setEvents((current) =>
        current.filter((event) => event.id !== id)
      );
    } catch (error) {
      window.alert(
        error?.response?.data?.message ||
          "Unable to delete event."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="admin-events-page">
      <section className="admin-events-header">
        <div>
          <span className="admin-section-label">
            EVENT CONTROL
          </span>

          <h2>Events</h2>

          <p>
            Manage every event published for
            COLORIDO 2K26.
          </p>
        </div>

        <Link
          to="/admin/events/new"
          className="admin-gradient-button"
        >
          <Plus size={18} />
          Create Event
        </Link>
      </section>

      <section className="admin-events-toolbar">
        <div className="admin-events-search">
          <Search size={18} />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search events..."
          />
        </div>

        <div className="admin-events-total">
          <CalendarDays size={16} />
          {filteredEvents.length} Events
        </div>
      </section>

      {loading && (
        <div className="admin-events-state">
          <LoaderCircle
            size={30}
            className="admin-loader"
          />
          <p>Loading events...</p>
        </div>
      )}

      {!loading && error && (
        <div className="admin-events-state">
          <p>{error}</p>

          <button
            type="button"
            className="admin-secondary-button"
            onClick={loadEvents}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        filteredEvents.length === 0 && (
          <div className="admin-events-state">
            <CalendarDays size={32} />

            <h3>No events found</h3>

            <p>
              No events match your current search.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        filteredEvents.length > 0 && (
          <section className="admin-events-card">
            <div className="admin-events-table-scroll">
              <table className="admin-events-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Category</th>
                    <th>Gender</th>
                    <th>Date</th>
                    <th>Capacity</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {filteredEvents.map((event) => (
                    <tr key={event.id}>
                      <td>
                        <div className="admin-event-info">
                          <div className="admin-event-thumb">
                            <img
                              src={
                                event.imageUrl ||
                                "/events/default.webp"
                              }
                              alt={event.name}
                            />
                          </div>

                          <div>
                            <strong>
                              {event.name}
                            </strong>

                            <span>
                              {event.subcategory ||
                                event.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="admin-soft-pill">
                          {event.category}
                        </span>
                      </td>

                      <td>
                        <span className="admin-neutral-pill">
                          {event.gender || "OPEN"}
                        </span>
                      </td>

                      <td>
                        <div className="admin-table-meta">
                          <CalendarDays size={14} />
                          {event.eventDate || "TBA"}
                        </div>
                      </td>

                      <td>
                        <div className="admin-table-meta">
                          <Users size={14} />
                          {event.maxParticipants || 0}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`admin-event-status ${
                            event.status
                              ?.toLowerCase()
                              .replaceAll("_", "-") || ""
                          }`}
                        >
                          {event.status || "UNKNOWN"}
                        </span>
                      </td>

                      <td>
                        <div className="admin-event-actions">
                          <Link
                            to={`/admin/events/${event.id}/edit`}
                            className="admin-action-button"
                            aria-label={`Edit ${event.name}`}
                          >
                            <Edit3 size={16} />
                          </Link>

                          <button
                            type="button"
                            className="admin-action-button admin-delete-button"
                            onClick={() =>
                              handleDelete(event.id)
                            }
                            disabled={
                              deletingId === event.id
                            }
                            aria-label={`Delete ${event.name}`}
                          >
                            {deletingId === event.id ? (
                              <LoaderCircle
                                size={16}
                                className="admin-loader"
                              />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
    </div>
  );
}

export default AdminEvents;