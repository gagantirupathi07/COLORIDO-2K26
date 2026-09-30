import {
  ArrowLeft,
  LoaderCircle,
  Save,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  createEvent,
  getAdminEvent,
  updateEvent,
} from "../../api/adminEventApi";

import "../../styles/admin/admin-event-form.css";

const initialForm = {
  name: "",
  slug: "",
  category: "CULTURAL",
  subcategory: "",
  gender: "OPEN",
  description: "",
  rules: "",
  eligibility: "",
  teamSize: 1,
  registrationFee: 0,
  venue: "",
  eventDate: "",
  eventStartTime: "",
  registrationDeadline: "",
  duration: "",
  imageUrl: "",
  status: "OPEN_FOR_REGISTRATION",
  featured: false,
  maxParticipants: 100,
};

function AdminEventForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const editing = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!editing) {
      return;
    }

    const loadEvent = async () => {
      try {
        setLoading(true);

        const event = await getAdminEvent(id);

        setForm({
          name: event?.name || "",
          slug: event?.slug || "",
          category: event?.category || "CULTURAL",
          subcategory: event?.subcategory || "",
          gender: event?.gender || "OPEN",
          description: event?.description || "",
          rules: event?.rules || "",
          eligibility: event?.eligibility || "",
          teamSize: event?.teamSize || 1,
          registrationFee: event?.registrationFee || 0,
          venue: event?.venue || "",
          eventDate: event?.eventDate || "",
          eventStartTime: event?.eventStartTime || "",
          registrationDeadline:
            event?.registrationDeadline || "",
          duration: event?.duration || "",
          imageUrl: event?.imageUrl || "",
          status:
            event?.status || "OPEN_FOR_REGISTRATION",
          featured: Boolean(event?.featured),
          maxParticipants:
            event?.maxParticipants || 100,
        });
      } catch (error) {
        setError(
          error?.response?.data?.message ||
            "Unable to load event."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id, editing]);

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      teamSize: Number(form.teamSize),
      registrationFee: Number(form.registrationFee),
      maxParticipants: Number(form.maxParticipants),
      featured: Boolean(form.featured),
    };

    try {
      if (editing) {
        await updateEvent(id, payload);

        setSuccess(
          "Event updated successfully."
        );
      } else {
        await createEvent(payload);

        setSuccess(
          "Event created successfully."
        );

        setForm(initialForm);
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Unable to save event."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-form-loading">
        <LoaderCircle
          size={30}
          className="admin-loader"
        />
        <p>Loading event...</p>
      </div>
    );
  }

  return (
    <div className="admin-event-form-page">
      <section className="admin-form-page-header">
        <Link
          to="/admin/events"
          className="admin-back-link"
        >
          <ArrowLeft size={17} />
          Back to Events
        </Link>

        <span className="admin-section-label">
          EVENT CONTROL
        </span>

        <h2>
          {editing ? "Update Event" : "Create Event"}
        </h2>

        <p>
          {editing
            ? "Update the details of this COLORIDO 2K26 event."
            : "Create a new cultural or sports event for COLORIDO 2K26."}
        </p>
      </section>

      <form
        className="admin-event-form"
        onSubmit={handleSubmit}
      >
        <section className="admin-form-card">
          <div className="admin-form-title">
            <span>01</span>

            <div>
              <h3>Basic Information</h3>
              <p>
                General information about the event.
              </p>
            </div>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-field full">
              <label htmlFor="name">
                Event Name
              </label>

              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter event name"
                required
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="slug">Slug</label>

              <input
                id="slug"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="event-slug"
                required
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="subcategory">
                Subcategory
              </label>

              <input
                id="subcategory"
                name="subcategory"
                value={form.subcategory}
                onChange={handleChange}
                placeholder="Event subcategory"
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="CULTURAL">
                  Cultural
                </option>
                <option value="SPORTS">
                  Sports
                </option>
              </select>
            </div>

            <div className="admin-form-field">
              <label htmlFor="gender">
                Gender
              </label>

              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="OPEN">Open</option>
                <option value="BOYS">Boys</option>
                <option value="GIRLS">Girls</option>
              </select>
            </div>

            <div className="admin-form-field full">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the event"
                required
              />
            </div>
          </div>
        </section>

        <section className="admin-form-card">
          <div className="admin-form-title">
            <span>02</span>

            <div>
              <h3>Rules & Eligibility</h3>
              <p>
                Define participation requirements.
              </p>
            </div>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-field full">
              <label htmlFor="rules">Rules</label>

              <textarea
                id="rules"
                name="rules"
                value={form.rules}
                onChange={handleChange}
                rows="7"
                placeholder="Enter event rules"
                required
              />
            </div>

            <div className="admin-form-field full">
              <label htmlFor="eligibility">
                Eligibility
              </label>

              <textarea
                id="eligibility"
                name="eligibility"
                value={form.eligibility}
                onChange={handleChange}
                rows="5"
                placeholder="Enter eligibility criteria"
                required
              />
            </div>
          </div>
        </section>

        <section className="admin-form-card">
          <div className="admin-form-title">
            <span>03</span>

            <div>
              <h3>Schedule & Venue</h3>
              <p>
                Configure the event date and location.
              </p>
            </div>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label htmlFor="eventDate">
                Event Date
              </label>

              <input
                id="eventDate"
                name="eventDate"
                type="date"
                value={form.eventDate}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="eventStartTime">
                Start Time
              </label>

              <input
                id="eventStartTime"
                name="eventStartTime"
                type="time"
                value={form.eventStartTime}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="registrationDeadline">
                Registration Deadline
              </label>

              <input
                id="registrationDeadline"
                name="registrationDeadline"
                type="date"
                value={form.registrationDeadline}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="duration">
                Duration
              </label>

              <input
                id="duration"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="2 Hours"
              />
            </div>

            <div className="admin-form-field full">
              <label htmlFor="venue">Venue</label>

              <input
                id="venue"
                name="venue"
                value={form.venue}
                onChange={handleChange}
                placeholder="Enter venue"
                required
              />
            </div>
          </div>
        </section>

        <section className="admin-form-card">
          <div className="admin-form-title">
            <span>04</span>

            <div>
              <h3>Registration Settings</h3>
              <p>
                Configure participant limits and fee.
              </p>
            </div>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label htmlFor="teamSize">
                Team Size
              </label>

              <input
                id="teamSize"
                name="teamSize"
                type="number"
                min="1"
                value={form.teamSize}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="maxParticipants">
                Maximum Participants
              </label>

              <input
                id="maxParticipants"
                name="maxParticipants"
                type="number"
                min="1"
                value={form.maxParticipants}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="registrationFee">
                Registration Fee
              </label>

              <input
                id="registrationFee"
                name="registrationFee"
                type="number"
                min="0"
                step="0.01"
                value={form.registrationFee}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="status">Status</label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="OPEN_FOR_REGISTRATION">
                  Open for Registration
                </option>
                <option value="UPCOMING">
                  Upcoming
                </option>
                <option value="CLOSED">
                  Closed
                </option>
                <option value="COMPLETED">
                  Completed
                </option>
                <option value="CANCELLED">
                  Cancelled
                </option>
              </select>
            </div>

            <div className="admin-form-field full">
              <label htmlFor="imageUrl">
                Image URL
              </label>

              <input
                id="imageUrl"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="/events/basketball.webp"
              />
            </div>

            <label className="admin-featured-field">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />

              <span>
                Feature this event on the COLORIDO
                website
              </span>
            </label>
          </div>
        </section>

        {error && (
          <div className="admin-form-message admin-form-error">
            {error}
          </div>
        )}

        {success && (
          <div className="admin-form-message admin-form-success">
            {success}
          </div>
        )}

        <div className="admin-form-actions">
          <Link
            to="/admin/events"
            className="admin-secondary-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="admin-gradient-button"
            disabled={saving}
          >
            {saving ? (
              <>
                <LoaderCircle
                  size={18}
                  className="admin-loader"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                {editing
                  ? "Update Event"
                  : "Create Event"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminEventForm;