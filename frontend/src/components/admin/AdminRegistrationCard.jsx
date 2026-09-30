import {
  CalendarDays,
  ChevronRight,
  Mail,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminStatusBadge from "./AdminStatusBadge";
import "../../styles/admin/admin-registration-card.css";

function AdminRegistrationCard({
  registration
}) {
  const participantName =
    registration.participantName ||
    "Unknown Participant";

  const eventName =
    registration.eventName ||
    "Unknown Event";

  const email =
    registration.participantEmail ||
    "No email";

  const participantCount =
    registration.participantCount ||
    1;

  const registrationCode =
    registration.registrationCode ||
    "N/A";

  const eventDate =
    registration.eventDate
      ? new Date(
          `${registration.eventDate}T00:00:00`
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric"
          }
        )
      : "Date not available";

  return (
    <article className="admin-registration-card">
      <div className="admin-registration-card-accent" />

      <div className="admin-registration-card-avatar">
        {participantName
          .charAt(0)
          .toUpperCase()}
      </div>

      <div className="admin-registration-card-content">
        <div className="admin-registration-card-top">
          <div className="admin-registration-card-heading">
            <span className="admin-registration-code">
              {registrationCode}
            </span>

            <h3>
              {participantName}
            </h3>

            <div className="admin-registration-email">
              <Mail size={14} />
              <span>
                {email}
              </span>
            </div>
          </div>

          <AdminStatusBadge
            status={
              registration.status ||
              "REGISTERED"
            }
          />
        </div>

        <div className="admin-registration-event">
          <div>
            <span>
              EVENT
            </span>

            <strong>
              {eventName}
            </strong>
          </div>

          {registration.eventCategory && (
            <div>
              <span>
                CATEGORY
              </span>

              <strong>
                {
                  registration.eventCategory
                }
              </strong>
            </div>
          )}

          {registration.teamName && (
            <div>
              <span>
                TEAM
              </span>

              <strong>
                {registration.teamName}
              </strong>
            </div>
          )}
        </div>

        <div className="admin-registration-meta">
          <span>
            <Users size={15} />
            {participantCount}{" "}
            {participantCount === 1
              ? "Participant"
              : "Participants"}
          </span>

          <span>
            <CalendarDays size={15} />
            {eventDate}
          </span>
        </div>

        <div className="admin-registration-card-actions">
          <Link
            to={`/admin/registrations/${registration.id}`}
            className="admin-registration-view"
          >
            View Registration
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default AdminRegistrationCard;