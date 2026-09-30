import { CalendarDays, MapPin, Users } from "lucide-react";
import RegistrationStatus from "./RegistrationStatus";
import "../../styles/registration-history.css";

function formatDate(value) {
  if (!value) {
    return "Date not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function RegistrationCard({
  registration,
  onCancel,
  cancelling,
}) {
  const status = String(
    registration.status || ""
  ).toUpperCase();

  const canCancel =
    status === "REGISTERED" ||
    status === "CONFIRMED";

  return (
    <article className="registration-card">
      <div className="registration-card-top">
        <div>
          <span className="registration-category">
            {registration.eventCategory || "Event"}
          </span>

          <h2>{registration.eventName}</h2>

          {registration.eventGender && (
            <p className="registration-gender">
              {registration.eventGender}
            </p>
          )}
        </div>

        <RegistrationStatus
          status={registration.status}
        />
      </div>

      <div className="registration-code">
        Registration ID:{" "}
        <strong>
          {registration.registrationCode || "N/A"}
        </strong>
      </div>

      <div className="registration-info-grid">
        <div className="registration-info-item">
          <CalendarDays size={18} />
          <div>
            <span>Event Date</span>
            <strong>
              {formatDate(registration.eventDate)}
            </strong>
          </div>
        </div>

        <div className="registration-info-item">
          <MapPin size={18} />
          <div>
            <span>Venue</span>
            <strong>
              {registration.venue || "Venue not available"}
            </strong>
          </div>
        </div>

        <div className="registration-info-item">
          <Users size={18} />
          <div>
            <span>Participants</span>
            <strong>
              {registration.participantCount || 1}
            </strong>
          </div>
        </div>
      </div>

      <div className="registration-details">
        <div>
          <span>Team</span>
          <strong>
            {registration.teamName || "Individual"}
          </strong>
        </div>

        <div>
          <span>Registered On</span>
          <strong>
            {formatDate(registration.registeredAt)}
          </strong>
        </div>
      </div>

      {registration.memberNames?.length > 0 && (
        <div className="registration-members">
          <span>Members</span>

          <div className="registration-member-list">
            {registration.memberNames.map(
              (member, index) => (
                <span key={`${member}-${index}`}>
                  {member}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {canCancel && (
        <div className="registration-card-actions">
          <button
            type="button"
            className="registration-cancel-button"
            onClick={() => onCancel(registration)}
            disabled={cancelling}
          >
            {cancelling
              ? "Cancelling..."
              : "Cancel Registration"}
          </button>
        </div>
      )}
    </article>
  );
}

export default RegistrationCard;