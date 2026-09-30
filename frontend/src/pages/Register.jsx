import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getEvents, getEventById } from "../api/eventApi";
import { registerForEvent } from "../api/registrationApi";

import "../styles/register.css";

function Register() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialEventId = searchParams.get("eventId") || "";

  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState(initialEventId);
  const [event, setEvent] = useState(null);

  const [form, setForm] = useState({
    participantName: "",
    participantEmail: "",
    participantPhone: "",
    college: "",
    teamName: "",
    memberNames: [],
  });

  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoadingEvents(true);
        setError("");

        const response = await getEvents();

        const data =
          response?.data?.data ||
          response?.data ||
          response;

        const eventList = Array.isArray(data)
          ? data
          : [];

        setEvents(eventList);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load events."
        );
      } finally {
        setLoadingEvents(false);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    const loadEvent = async () => {
      if (!eventId) {
        setEvent(null);

        setForm((current) => ({
          ...current,
          memberNames: [],
        }));

        return;
      }

      try {
        setLoadingEvent(true);
        setError("");
        setMessage("");

        const response = await getEventById(eventId);

        const data =
          response?.data?.data ||
          response?.data ||
          response;

        setEvent(data);

        const teamSize = Math.max(
          1,
          Number(data?.teamSize) || 1
        );

        const additionalMembers = Array.from(
          { length: Math.max(0, teamSize - 1) },
          (_, index) => ""
        );

        setForm((current) => ({
          ...current,
          memberNames: additionalMembers,
        }));
      } catch (err) {
        setEvent(null);

        setError(
          err?.response?.data?.message ||
            "Unable to load selected event."
        );
      } finally {
        setLoadingEvent(false);
      }
    };

    loadEvent();
  }, [eventId]);

  const handleEventChange = (event) => {
    const selectedId = event.target.value;

    setEventId(selectedId);
    setMessage("");
    setError("");

    if (selectedId) {
      setSearchParams({
        eventId: selectedId,
      });
    } else {
      setSearchParams({});
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleMemberChange = (index, value) => {
    setForm((current) => {
      const members = [...current.memberNames];

      members[index] = value;

      return {
        ...current,
        memberNames: members,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");
      setError("");

      if (!eventId) {
        throw new Error(
          "Please select an event before registering."
        );
      }

      if (!event) {
        throw new Error(
          "Please wait for the event details to load."
        );
      }

      const requiredPlayers = Math.max(
        1,
        Number(event.teamSize) || 1
      );

      if (!form.participantName.trim()) {
        throw new Error(
          "Please enter the participant or team leader name."
        );
      }

      if (!form.participantEmail.trim()) {
        throw new Error(
          "Please enter your email address."
        );
      }

      if (!form.participantPhone.trim()) {
        throw new Error(
          "Please enter your phone number."
        );
      }

      if (!form.college.trim()) {
        throw new Error(
          "Please enter your college or institution."
        );
      }

      if (
        requiredPlayers > 1 &&
        !form.teamName.trim()
      ) {
        throw new Error(
          "Please enter a team name."
        );
      }

      const additionalMembers = form.memberNames
        .slice(0, Math.max(0, requiredPlayers - 1))
        .map((member) => member.trim());

      if (
        additionalMembers.some(
          (member) => !member
        )
      ) {
        throw new Error(
          `Please enter all ${requiredPlayers} participant names.`
        );
      }

      const allMembers = [
        form.participantName.trim(),
        ...additionalMembers,
      ];

      const response = await registerForEvent({
        eventId: Number(eventId),
        participantName:
          form.participantName.trim(),
        participantEmail:
          form.participantEmail.trim(),
        participantPhone:
          form.participantPhone.trim(),
        college: form.college.trim(),
        teamName: form.teamName.trim(),
        participantCount: requiredPlayers,
        memberNames: allMembers,
      });

      setMessage(
        response?.data?.message ||
          response?.message ||
          "Registration completed successfully."
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Registration failed."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const requiredPlayers = Math.max(
    1,
    Number(event?.teamSize) || 1
  );

  const isTeamEvent = requiredPlayers > 1;

  const additionalMemberCount = Math.max(
    0,
    requiredPlayers - 1
  );

  return (
    <div className="register-page">
      <Navbar />

      <main>
        <section className="register-hero">
          <div className="register-hero-content">
            <span className="register-label">
              COLORIDO 2K26
            </span>

            <h1>Event Registration</h1>

            <p>
              Choose an event and register for
              COLORIDO 2K26.
            </p>
          </div>
        </section>

        <section className="register-content">
          <div className="register-container">
            <form
              className="registration-form"
              onSubmit={handleSubmit}
            >
              <div className="form-section">
                <div className="form-section-heading">
                  <span>01</span>

                  <div>
                    <small>EVENT</small>
                    <h2>Select Your Event</h2>
                  </div>
                </div>

                <div className="event-selector">
                  <label htmlFor="eventId">
                    Event
                  </label>

                  {loadingEvents ? (
                    <div className="register-loading-box">
                      Loading available events...
                    </div>
                  ) : (
                    <select
                      id="eventId"
                      value={eventId}
                      onChange={handleEventChange}
                      required
                    >
                      <option value="">
                        Select an event
                      </option>

                      {events.map((item) => (
                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                          {item.subcategory
                            ? ` — ${item.subcategory}`
                            : ""}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {loadingEvent && (
                  <div className="register-loading-box">
                    Loading event details...
                  </div>
                )}

                {event && !loadingEvent && (
                  <div className="selected-event">
                    <div className="selected-event-main">
                      <span>
                        {event.category}
                      </span>

                      <h3>{event.name}</h3>

                      {event.subcategory && (
                        <p>
                          {event.subcategory}
                        </p>
                      )}
                    </div>

                    <div className="selected-event-meta">
                      <div>
                        <CalendarDays size={18} />
                        <span>
                          {event.eventDate ||
                            "Date TBA"}
                        </span>
                      </div>

                      <div>
                        <Clock3 size={18} />
                        <span>
                          {event.eventStartTime ||
                            "Time TBA"}
                        </span>
                      </div>

                      <div>
                        <MapPin size={18} />
                        <span>
                          {event.venue ||
                            "Venue TBA"}
                        </span>
                      </div>

                      <div>
                        <Users size={18} />
                        <span>
                          {requiredPlayers}{" "}
                          {requiredPlayers === 1
                            ? "Participant"
                            : "Participants"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-section">
                <div className="form-section-heading">
                  <span>02</span>

                  <div>
                    <small>
                      {isTeamEvent
                        ? "TEAM LEADER"
                        : "PARTICIPANT"}
                    </small>

                    <h2>
                      {isTeamEvent
                        ? "Team Leader Details"
                        : "Participant Details"}
                    </h2>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="participantName">
                      {isTeamEvent
                        ? "Team Leader Name"
                        : "Participant Name"}
                    </label>

                    <input
                      id="participantName"
                      name="participantName"
                      value={
                        form.participantName
                      }
                      onChange={handleChange}
                      placeholder={
                        isTeamEvent
                          ? "Enter team leader name"
                          : "Enter participant name"
                      }
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="participantEmail">
                      Email Address
                    </label>

                    <input
                      id="participantEmail"
                      name="participantEmail"
                      type="email"
                      value={
                        form.participantEmail
                      }
                      onChange={handleChange}
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="participantPhone">
                      Phone Number
                    </label>

                    <input
                      id="participantPhone"
                      name="participantPhone"
                      value={
                        form.participantPhone
                      }
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="college">
                      College / Institution
                    </label>

                    <input
                      id="college"
                      name="college"
                      value={form.college}
                      onChange={handleChange}
                      placeholder="Enter college name"
                      required
                    />
                  </div>

                  {isTeamEvent && (
                    <div className="form-field form-field-full">
                      <label htmlFor="teamName">
                        Team Name
                      </label>

                      <input
                        id="teamName"
                        name="teamName"
                        value={form.teamName}
                        onChange={handleChange}
                        placeholder="Enter team name"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>

              {isTeamEvent && (
                <div className="form-section">
                  <div className="form-section-heading">
                    <span>03</span>

                    <div>
                      <small>TEAM</small>

                      <h2>
                        Additional Team Members
                      </h2>
                    </div>
                  </div>

                  <div className="team-size-banner">
                    <div>
                      <Users size={24} />

                      <div>
                        <strong>
                          {requiredPlayers}{" "}
                          participants required
                        </strong>

                        <span>
                          The team leader is already
                          included. Enter the remaining{" "}
                          {additionalMemberCount}{" "}
                          participant names below.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="member-list">
                    {form.memberNames
                      .slice(
                        0,
                        additionalMemberCount
                      )
                      .map((member, index) => (
                        <div
                          className="member-field"
                          key={index}
                        >
                          <div className="member-number">
                            {index + 2}
                          </div>

                          <div>
                            <label
                              htmlFor={`member-${
                                index + 1
                              }`}
                            >
                              Member {index + 2}
                            </label>

                            <input
                              id={`member-${
                                index + 1
                              }`}
                              value={member}
                              onChange={(event) =>
                                handleMemberChange(
                                  index,
                                  event.target.value
                                )
                              }
                              placeholder={`Enter member ${
                                index + 2
                              } name`}
                              required
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {message && (
                <div className="form-message success">
                  <CheckCircle2 size={21} />
                  <span>{message}</span>
                </div>
              )}

              {error && (
                <div className="form-message error">
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="registration-submit"
                disabled={
                  submitting ||
                  loadingEvents ||
                  loadingEvent ||
                  !event
                }
              >
                {submitting
                  ? "Submitting Registration..."
                  : "Complete Registration"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Register;