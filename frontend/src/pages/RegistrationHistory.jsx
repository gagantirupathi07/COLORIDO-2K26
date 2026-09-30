import { useEffect, useMemo, useState } from "react";
import {
  cancelMyRegistration,
  getMyRegistrations,
} from "../api/registrationApi";
import RegistrationCard from "../components/registrations/RegistrationCard";
import RegistrationFilters from "../components/registrations/RegistrationFilters";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/registration-history.css";

import coloridoImage from "../assets/colorido-hero.jpg";

function RegistrationHistory() {
  const [registrations, setRegistrations] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyRegistrations();

      setRegistrations(
        Array.isArray(data) ? data : []
      );
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to load your registrations."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const filteredRegistrations = useMemo(() => {
    if (activeFilter === "ALL") {
      return registrations;
    }

    if (activeFilter === "CANCELLED") {
      return registrations.filter(
        (registration) =>
          String(registration.status).toUpperCase() ===
          "CANCELLED"
      );
    }

    return registrations.filter((registration) => {
      const status = String(
        registration.status
      ).toUpperCase();

      return (
        status === "REGISTERED" ||
        status === "CONFIRMED"
      );
    });
  }, [registrations, activeFilter]);

  const handleCancel = async (registration) => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel your registration for "${registration.eventName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingId(registration.id);
      setError("");

      await cancelMyRegistration(registration.id);

      setRegistrations((current) =>
        current.map((item) =>
          item.id === registration.id
            ? {
                ...item,
                status: "CANCELLED",
              }
            : item
        )
      );
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to cancel the registration."
      );
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="registration-history-page">
        <section className="registration-history-hero">
          <div className="registration-history-hero-content">
            <div className="registration-history-hero-text">
              <span className="registration-history-eyebrow">
                COLORIDO 2K26
              </span>

              <h1>My</h1>
              <h1>Registrations</h1>

              <p>
                Manage your Colorido event registrations
                and view your registration history.
              </p>
            </div>

            <div className="registration-history-hero-image">
              <div className="registration-history-hero-image-frame">
                <img
                  src={coloridoImage}
                  alt="COLORIDO 2K26 registrations"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="registration-history-content">
          <div className="registration-history-container">
            <RegistrationFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {error && (
              <div className="registration-error">
                {error}
              </div>
            )}

            {loading ? (
              <div className="registration-state">
                <div className="registration-loader" />
                <p>Loading your registrations...</p>
              </div>
            ) : filteredRegistrations.length === 0 ? (
              <div className="registration-empty">
                <div className="registration-empty-icon">
                  RG
                </div>

                <h2>No registrations found</h2>

                <p>
                  {activeFilter === "ALL"
                    ? "You have not registered for any Colorido events yet."
                    : activeFilter === "REGISTERED"
                      ? "You do not have any active registrations."
                      : "You do not have any cancelled registrations."}
                </p>
              </div>
            ) : (
              <div className="registration-list">
                {filteredRegistrations.map(
                  (registration) => (
                    <RegistrationCard
                      key={registration.id}
                      registration={registration}
                      onCancel={handleCancel}
                      cancelling={
                        cancellingId === registration.id
                      }
                    />
                  )
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default RegistrationHistory;