import {
  ArrowLeft,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  UserRound,
  Users
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";
import {
  useEffect,
  useState
} from "react";
import {
  getAdminRegistration
} from "../../api/adminRegistrationApi";
import AdminEmptyState from "../../components/admin/AdminEmptyState";
import AdminStatusBadge from "../../components/admin/AdminStatusBadge";
import "../../styles/admin/admin-registration-details.css";

function AdminRegistrationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [registration, setRegistration] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadRegistration =
      async () => {
        try {
          setLoading(true);
          setError("");

          const data =
            await getAdminRegistration(id);

          setRegistration(data);
        } catch (requestError) {
          setError(
            requestError?.response?.data
              ?.message ||
              "Unable to load registration."
          );
        } finally {
          setLoading(false);
        }
      };

    loadRegistration();
  }, [id]);

  if (loading) {
    return (
      <section className="admin-registration-details-page">
        <div className="admin-details-loading">
          <div className="admin-details-loading-icon">
            <CalendarDays
              size={24}
            />
          </div>

          <strong>
            Loading registration
          </strong>

          <span>
            Preparing participant details...
          </span>
        </div>
      </section>
    );
  }

  if (error || !registration) {
    return (
      <section className="admin-registration-details-page">
        <AdminEmptyState
          title="Registration not found"
          description={
            error ||
            "The requested registration could not be found."
          }
        />

        <button
          type="button"
          className="admin-registration-details-back-button"
          onClick={() =>
            navigate(
              "/admin/registrations"
            )
          }
        >
          <ArrowLeft size={16} />
          Back to Registrations
        </button>
      </section>
    );
  }

  const memberNames =
    Array.isArray(
      registration.memberNames
    )
      ? registration.memberNames
      : [];

  const eventDate =
    registration.eventDate
      ? new Date(
          `${registration.eventDate}T00:00:00`
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "long",
            year: "numeric"
          }
        )
      : "Not specified";

  return (
    <section className="admin-registration-details-page">
      <div className="admin-details-glow admin-details-glow-one" />
      <div className="admin-details-glow admin-details-glow-two" />

      <Link
        to="/admin/registrations"
        className="admin-registration-details-back"
      >
        <ArrowLeft size={17} />
        Back to Registrations
      </Link>

      <div className="admin-registration-details-heading">
        <div>
          <span className="admin-page-eyebrow">
            COLORIDO 2K26
          </span>

          <h1>
            Registration Details
          </h1>

          <p>
            Complete participant, team and
            event information.
          </p>
        </div>

        <AdminStatusBadge
          status={
            registration.status ||
            "REGISTERED"
          }
        />
      </div>

      <div className="admin-registration-details-code">
        <span>
          REGISTRATION CODE
        </span>

        <strong>
          {registration.registrationCode ||
            "N/A"}
        </strong>
      </div>

      <div className="admin-registration-details-grid">
        <div className="admin-registration-detail-card">
          <div className="admin-registration-detail-card-header">
            <div className="admin-registration-detail-icon">
              <UserRound size={20} />
            </div>

            <div>
              <span>
                PARTICIPANT
              </span>

              <h2>
                Participant Information
              </h2>
            </div>
          </div>

          <div className="admin-registration-detail-fields">
            <div>
              <span>Name</span>

              <strong>
                {registration.participantName ||
                  "Not provided"}
              </strong>
            </div>

            <div>
              <span>Email</span>

              <strong>
                {registration.participantEmail ||
                  "Not provided"}
              </strong>
            </div>

            <div>
              <span>Phone</span>

              <strong>
                {registration.participantPhone ||
                  "Not provided"}
              </strong>
            </div>

            <div>
              <span>College</span>

              <strong>
                {registration.college ||
                  "Not provided"}
              </strong>
            </div>

            <div>
              <span>Team Name</span>

              <strong>
                {registration.teamName ||
                  "Individual"}
              </strong>
            </div>

            <div>
              <span>Participant Count</span>

              <strong>
                {registration.participantCount ||
                  1}
              </strong>
            </div>
          </div>
        </div>

        <div className="admin-registration-detail-card">
          <div className="admin-registration-detail-card-header">
            <div className="admin-registration-detail-icon purple">
              <CalendarDays size={20} />
            </div>

            <div>
              <span>
                EVENT
              </span>

              <h2>
                Event Information
              </h2>
            </div>
          </div>

          <div className="admin-registration-detail-fields">
            <div>
              <span>Event</span>

              <strong>
                {registration.eventName ||
                  "Not provided"}
              </strong>
            </div>

            <div>
              <span>Category</span>

              <strong>
                {registration.eventCategory ||
                  "Not provided"}
              </strong>
            </div>

            <div>
              <span>Gender</span>

              <strong>
                {registration.eventGender ||
                  "Open"}
              </strong>
            </div>

            <div>
              <span>Venue</span>

              <strong>
                {registration.venue ||
                  "Not provided"}
              </strong>
            </div>

            <div>
              <span>Event Date</span>

              <strong>
                {eventDate}
              </strong>
            </div>

            <div>
              <span>Registration Fee</span>

              <strong>
                {registration.registrationFee !==
                undefined
                  ? `₹${registration.registrationFee}`
                  : "Not specified"}
              </strong>
            </div>
          </div>
        </div>

        <div className="admin-registration-detail-card">
          <div className="admin-registration-detail-card-header">
            <div className="admin-registration-detail-icon cyan">
              <Users size={20} />
            </div>

            <div>
              <span>
                TEAM
              </span>

              <h2>
                Team Members
              </h2>
            </div>
          </div>

          {memberNames.length > 0 ? (
            <div className="admin-registration-members">
              {memberNames.map(
                (memberName, index) => (
                  <div
                    key={`${memberName}-${index}`}
                    className="admin-registration-member"
                  >
                    <span>
                      {index + 1}
                    </span>

                    <strong>
                      {memberName}
                    </strong>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="admin-registration-no-members">
              <Users size={20} />

              <span>
                No additional team
                members.
              </span>
            </div>
          )}
        </div>

        <div className="admin-registration-detail-card">
          <div className="admin-registration-detail-card-header">
            <div className="admin-registration-detail-icon pink">
              <GraduationCap size={20} />
            </div>

            <div>
              <span>
                REGISTRATION
              </span>

              <h2>
                Registration Information
              </h2>
            </div>
          </div>

          <div className="admin-registration-detail-fields">
            <div>
              <span>
                Registration Code
              </span>

              <strong>
                {registration.registrationCode ||
                  "N/A"}
              </strong>
            </div>

            <div>
              <span>
                Registered At
              </span>

              <strong>
                {registration.registeredAt
                  ? new Date(
                      registration.registeredAt
                    ).toLocaleString(
                      "en-IN"
                    )
                  : "Not available"}
              </strong>
            </div>

            <div>
              <span>
                Updated At
              </span>

              <strong>
                {registration.updatedAt
                  ? new Date(
                      registration.updatedAt
                    ).toLocaleString(
                      "en-IN"
                    )
                  : "Not available"}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-registration-contact-strip">
        <div>
          <Mail size={17} />

          <span>
            {registration.participantEmail ||
              "No email"}
          </span>
        </div>

        <div>
          <Phone size={17} />

          <span>
            {registration.participantPhone ||
              "No phone"}
          </span>
        </div>

        <div>
          <MapPin size={17} />

          <span>
            {registration.venue ||
              "Venue not specified"}
          </span>
        </div>
      </div>
    </section>
  );
}

export default AdminRegistrationDetails;