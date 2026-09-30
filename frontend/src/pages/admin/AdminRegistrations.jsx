import {
  RefreshCw,
  Users
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState
} from "react";
import {
  getAdminRegistrations
} from "../../api/adminRegistrationApi";
import {
  getAdminEvents
} from "../../api/adminEventApi";
import AdminEmptyState from "../../components/admin/AdminEmptyState";
import AdminRegistrationCard from "../../components/admin/AdminRegistrationCard";
import AdminRegistrationFilters from "../../components/admin/AdminRegistrationFilters";
import "../../styles/admin/admin-registrations.css";

function AdminRegistrations() {
  const [registrations, setRegistrations] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [event, setEvent] =
    useState("ALL");

  const [error, setError] =
    useState("");

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getAdminRegistrations();

      setRegistrations(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to load registrations."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadEvents = async () => {
    try {
      const data =
        await getAdminEvents();

      setEvents(
        Array.isArray(data)
          ? data
          : []
      );
    } catch {
      setEvents([]);
    }
  };

  useEffect(() => {
    loadRegistrations();
    loadEvents();
  }, []);

  const filteredRegistrations =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return registrations.filter(
        (registration) => {
          const registrationEventId =
            registration.eventId ||
            registration.event?.id;

          const matchesEvent =
            event === "ALL" ||
            String(
              registrationEventId
            ) === String(event);

          if (!matchesEvent) {
            return false;
          }

          if (!query) {
            return true;
          }

          return [
            registration.registrationCode,
            registration.participantName,
            registration.participantEmail,
            registration.participantPhone,
            registration.college,
            registration.teamName,
            registration.eventName,
            registration.eventCategory
          ]
            .filter(Boolean)
            .some((value) =>
              String(value)
                .toLowerCase()
                .includes(query)
            );
        }
      );
    }, [
      registrations,
      search,
      event
    ]);

  const statistics =
    useMemo(() => {
      return {
        total: registrations.length,

        participants:
          registrations.reduce(
            (total, registration) =>
              total +
              Number(
                registration.participantCount ||
                  1
              ),
            0
          ),

        events:
          new Set(
            registrations
              .map(
                (registration) =>
                  registration.eventId ||
                  registration.event?.id
              )
              .filter(Boolean)
          ).size
      };
    }, [registrations]);

  return (
    <section className="admin-registrations-page">
      <div className="admin-registration-glow admin-registration-glow-one" />
      <div className="admin-registration-glow admin-registration-glow-two" />
      <div className="admin-registration-glow admin-registration-glow-three" />

      <div className="admin-page-heading">
        <div>
          <span className="admin-page-eyebrow">
            REGISTRATION CONTROL
          </span>

          <h1>
            Registrations
          </h1>

          <p>
            View participant registrations,
            teams and event participation
            details.
          </p>
        </div>

        <button
          type="button"
          className="admin-refresh-button"
          onClick={loadRegistrations}
          disabled={loading}
        >
          <RefreshCw
            size={17}
            className={
              loading
                ? "admin-spin"
                : ""
            }
          />

          Refresh
        </button>
      </div>

      <div className="admin-registration-summary">
        <div className="admin-registration-summary-card">
          <div className="admin-registration-summary-icon">
            <Users size={21} />
          </div>

          <div>
            <span>
              Total Registrations
            </span>

            <strong>
              {statistics.total}
            </strong>
          </div>
        </div>

        <div className="admin-registration-summary-card">
          <div className="admin-registration-summary-icon pink">
            <Users size={21} />
          </div>

          <div>
            <span>
              Total Participants
            </span>

            <strong>
              {statistics.participants}
            </strong>
          </div>
        </div>

        <div className="admin-registration-summary-card">
          <div className="admin-registration-summary-icon cyan">
            <Users size={21} />
          </div>

          <div>
            <span>
              Events Registered
            </span>

            <strong>
              {statistics.events}
            </strong>
          </div>
        </div>
      </div>

      <AdminRegistrationFilters
        search={search}
        onSearchChange={setSearch}
        event={event}
        onEventChange={setEvent}
        events={events}
      />

      {error && (
        <div className="admin-page-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="admin-registrations-loading">
          <div className="admin-loading-icon">
            <RefreshCw
              size={24}
              className="admin-spin"
            />
          </div>

          <strong>
            Loading registrations
          </strong>

          <span>
            Please wait while COLORIDO
            registrations are loaded.
          </span>
        </div>
      ) : filteredRegistrations.length ===
        0 ? (
        <AdminEmptyState
          title="No registrations found"
          description={
            search ||
            event !== "ALL"
              ? "Try changing your search or event filter."
              : "Participant registrations will appear here."
          }
        />
      ) : (
        <div className="admin-registration-list">
          {filteredRegistrations.map(
            (registration) => (
              <AdminRegistrationCard
                key={registration.id}
                registration={
                  registration
                }
              />
            )
          )}
        </div>
      )}
    </section>
  );
}

export default AdminRegistrations;