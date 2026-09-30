import "../../styles/registration-history.css";

function RegistrationFilters({
  activeFilter,
  onFilterChange,
}) {
  const filters = [
    {
      value: "ALL",
      label: "All",
    },
    {
      value: "REGISTERED",
      label: "Registered",
    },
    {
      value: "CANCELLED",
      label: "Cancelled",
    },
  ];

  return (
    <div className="registration-filters">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={`registration-filter ${
            activeFilter === filter.value
              ? "registration-filter-active"
              : ""
          }`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default RegistrationFilters;