function EventFilters({
  category,
  gender,
  onCategoryChange,
  onGenderChange,
}) {
  return (
    <div className="event-filters">
      <div className="event-filter-group">
        <button
          type="button"
          className={
            category === "ALL" ? "active" : ""
          }
          onClick={() =>
            onCategoryChange("ALL")
          }
        >
          All
        </button>

        <button
          type="button"
          className={
            category === "CULTURAL"
              ? "active"
              : ""
          }
          onClick={() =>
            onCategoryChange("CULTURAL")
          }
        >
          Cultural
        </button>

        <button
          type="button"
          className={
            category === "SPORTS"
              ? "active"
              : ""
          }
          onClick={() =>
            onCategoryChange("SPORTS")
          }
        >
          Sports
        </button>
      </div>

      <div className="event-filter-group">
        <button
          type="button"
          className={
            gender === "ALL" ? "active" : ""
          }
          onClick={() =>
            onGenderChange("ALL")
          }
        >
          All
        </button>

        <button
          type="button"
          className={
            gender === "BOYS" ? "active" : ""
          }
          onClick={() =>
            onGenderChange("BOYS")
          }
        >
          Boys
        </button>

        <button
          type="button"
          className={
            gender === "GIRLS" ? "active" : ""
          }
          onClick={() =>
            onGenderChange("GIRLS")
          }
        >
          Girls
        </button>
      </div>
    </div>
  );
}

export default EventFilters;