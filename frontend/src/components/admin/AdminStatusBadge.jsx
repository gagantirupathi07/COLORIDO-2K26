function AdminStatusBadge({ status }) {
  const normalizedStatus = String(
    status || "UNKNOWN"
  ).toUpperCase();

  const label = normalizedStatus
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

  return (
    <span
      className={`admin-status-badge admin-status-${normalizedStatus.toLowerCase()}`}
    >
      <span className="admin-status-dot" />
      {label}
    </span>
  );
}

export default AdminStatusBadge;