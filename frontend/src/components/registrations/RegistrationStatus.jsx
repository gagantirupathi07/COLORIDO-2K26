import "../../styles/registration-history.css";

function RegistrationStatus({ status }) {
  const normalizedStatus = String(status || "").toUpperCase();

  const isCancelled = normalizedStatus === "CANCELLED";

  return (
    <span
      className={`registration-status ${
        isCancelled
          ? "registration-status-cancelled"
          : "registration-status-registered"
      }`}
    >
      {isCancelled ? "Cancelled" : "Registered"}
    </span>
  );
}

export default RegistrationStatus;