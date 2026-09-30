import {
  CalendarDays,
  ClipboardList,
  Mail,
  RefreshCw,
  Users
} from "lucide-react";
import {
  useEffect,
  useState
} from "react";
import {
  getAdminDashboardStats
} from "../../api/adminDashboardApi";
import "../../styles/admin/admin-dashboard.css";

function AdminDashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getAdminDashboardStats();

      setDashboard(data);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to load dashboard statistics."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const statistics = [
    {
      label: "Total Events",
      value: dashboard?.totalEvents ?? 0,
      icon: CalendarDays,
      className: ""
    },
    {
      label: "Registrations",
      value: dashboard?.totalRegistrations ?? 0,
      icon: ClipboardList,
      className: "pink"
    },
    {
      label: "Participants",
      value: dashboard?.totalParticipants ?? 0,
      icon: Users,
      className: "cyan"
    },
    {
      label: "Registered Users",
      value: dashboard?.registeredUsers ?? 0,
      icon: Users,
      className: "green"
    }
  ];

  return (
    <section className="admin-dashboard-page">
      <div className="admin-dashboard-glow admin-dashboard-glow-one" />
      <div className="admin-dashboard-glow admin-dashboard-glow-two" />
      <div className="admin-dashboard-glow admin-dashboard-glow-three" />

      <div className="admin-dashboard-heading">
        <div>
          <span className="admin-dashboard-label">
            COLORIDO 2K26
          </span>

          <h1>
            Dashboard
          </h1>

          <p>
            Monitor events, registrations,
            participants and communication
            activity from one place.
          </p>
        </div>

        <button
          type="button"
          className="admin-dashboard-refresh"
          onClick={loadDashboard}
          disabled={loading}
        >
          <RefreshCw
            size={17}
            className={
              loading
                ? "admin-dashboard-spin"
                : ""
            }
          />

          Refresh
        </button>
      </div>

      {error && (
        <div className="admin-dashboard-error">
          {error}
        </div>
      )}

      <div className="admin-dashboard-stat-grid">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              className="admin-dashboard-stat-card"
              key={stat.label}
            >
              <div
                className={`admin-dashboard-stat-icon ${stat.className}`}
              >
                <Icon size={22} />
              </div>

              <div>
                <span>
                  {stat.label}
                </span>

                <strong>
                  {loading
                    ? "—"
                    : stat.value}
                </strong>
              </div>
            </article>
          );
        })}
      </div>

      <div className="admin-dashboard-content-grid">
        <section className="admin-dashboard-recent-card">
          <div className="admin-dashboard-card-heading">
            <div>
              <span>
                ACTIVITY
              </span>

              <h2>
                Recent Registrations
              </h2>
            </div>

            <ClipboardList
              size={21}
            />
          </div>

          {loading ? (
            <div className="admin-dashboard-state">
              <RefreshCw
                size={24}
                className="admin-dashboard-spin"
              />

              <span>
                Loading registrations...
              </span>
            </div>
          ) : dashboard?.recentRegistrations
              ?.length > 0 ? (
            <div className="admin-dashboard-registration-list">
              {dashboard.recentRegistrations.map(
                (registration) => (
                  <article
                    className="admin-dashboard-registration"
                    key={registration.id}
                  >
                    <div className="admin-dashboard-registration-avatar">
                      {registration.participantName
                        ?.charAt(0)
                        ?.toUpperCase() ||
                        "U"}
                    </div>

                    <div className="admin-dashboard-registration-info">
                      <strong>
                        {registration.participantName ||
                          "Unknown Participant"}
                      </strong>

                      <span>
                        {registration.eventName ||
                          "Event not available"}
                      </span>

                      <small>
                        {registration.registrationCode ||
                          "No registration code"}
                      </small>
                    </div>

                    <div className="admin-dashboard-registration-meta">
                      <span>
                        {registration.participantCount ||
                          1}{" "}
                        participant
                        {(registration.participantCount ||
                          1) !== 1
                          ? "s"
                          : ""}
                      </span>

                      <small>
                        {registration.registeredAt ||
                          "Recently"}
                      </small>
                    </div>
                  </article>
                )
              )}
            </div>
          ) : (
            <div className="admin-dashboard-state">
              <ClipboardList
                size={25}
              />

              <span>
                No registrations yet.
              </span>
            </div>
          )}
        </section>

        <section className="admin-dashboard-message-card">
          <div className="admin-dashboard-card-heading">
            <div>
              <span>
                COMMUNICATION
              </span>

              <h2>
                Contact Messages
              </h2>
            </div>

            <Mail size={21} />
          </div>

          <div className="admin-dashboard-message-count">
            <strong>
              {loading
                ? "—"
                : dashboard?.newMessages ?? 0}
            </strong>

            <span>
              New messages
            </span>
          </div>

          <div className="admin-dashboard-message-description">
            Messages submitted through the
            COLORIDO website are tracked here.
          </div>
        </section>
      </div>
    </section>
  );
}

export default AdminDashboard;