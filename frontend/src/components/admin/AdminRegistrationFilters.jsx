import {
  Search,
  X
} from "lucide-react";
import "../../styles/admin/admin-registration-filters.css";

function AdminRegistrationFilters({
  search,
  onSearchChange,
  event,
  onEventChange,
  events
}) {
  const hasFilters =
    Boolean(search.trim()) ||
    event !== "ALL";

  const clearFilters = () => {
    onSearchChange("");
    onEventChange("ALL");
  };

  return (
    <div className="admin-registration-filters">
      <div className="admin-registration-search">
        <Search size={18} />

        <input
          type="text"
          value={search}
          onChange={(eventObject) =>
            onSearchChange(
              eventObject.target.value
            )
          }
          placeholder="Search participant, registration code, college..."
        />
      </div>

      <div className="admin-registration-filter-actions">
        <select
          value={event}
          onChange={(eventObject) =>
            onEventChange(
              eventObject.target.value
            )
          }
          className="admin-registration-event-select"
        >
          <option value="ALL">
            All Events
          </option>

          {events.map((item) => (
            <option
              key={
                item.id ||
                item.eventId
              }
              value={String(
                item.id ||
                  item.eventId
              )}
            >
              {item.name ||
                item.eventName}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button
            type="button"
            className="admin-registration-clear"
            onClick={clearFilters}
          >
            <X size={15} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminRegistrationFilters;