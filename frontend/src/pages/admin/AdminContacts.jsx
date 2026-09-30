import {
  Eye,
  Mail,
  RefreshCw,
  Search,
  Trash2,
  X
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState
} from "react";
import {
  deleteContact,
  getAdminContacts
} from "../../api/adminContactApi";
import AdminEmptyState from "../../components/admin/AdminEmptyState";
import "../../styles/admin/admin-contacts.css";

function AdminContacts() {
  const [contacts, setContacts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedContact, setSelectedContact] =
    useState(null);

  const [error, setError] =
    useState("");

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getAdminContacts();

      setContacts(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to load contact messages."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const filteredContacts =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return contacts;
      }

      return contacts.filter(
        (contact) =>
          [
            contact.name,
            contact.email,
            contact.subject,
            contact.message
          ]
            .filter(Boolean)
            .some((value) =>
              String(value)
                .toLowerCase()
                .includes(query)
            )
      );
    }, [contacts, search]);

  const todayCount =
    useMemo(() => {
      const today =
        new Date().toLocaleDateString(
          "en-IN"
        );

      return contacts.filter(
        (contact) => {
          if (!contact.createdAt) {
            return false;
          }

          return (
            new Date(
              contact.createdAt
            ).toLocaleDateString(
              "en-IN"
            ) === today
          );
        }
      ).length;
    }, [contacts]);

  const handleDelete = async (
    contact
  ) => {
    const confirmed =
      window.confirm(
        `Delete the message from ${
          contact.name ||
          "this contact"
        }?`
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteContact(
        contact.id
      );

      setContacts(
        (current) =>
          current.filter(
            (item) =>
              item.id !== contact.id
          )
      );

      if (
        selectedContact?.id ===
        contact.id
      ) {
        setSelectedContact(null);
      }
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to delete message."
      );
    }
  };

  return (
    <section className="admin-contacts-page">
      <div className="admin-contacts-background-orb admin-contacts-orb-one" />
      <div className="admin-contacts-background-orb admin-contacts-orb-two" />

      <div className="admin-contact-page-heading">
        <div>
          <span className="admin-contact-page-eyebrow">
            COMMUNICATION
          </span>

          <h1>
            Contact Messages
          </h1>

          <p>
            Review messages submitted
            through the COLORIDO website.
          </p>
        </div>

        <button
          type="button"
          className="admin-contact-refresh"
          onClick={loadContacts}
          disabled={loading}
        >
          <RefreshCw
            size={17}
            className={
              loading
                ? "admin-contact-spin"
                : ""
            }
          />

          Refresh
        </button>
      </div>

      <div className="admin-contact-summary">
        <article className="admin-contact-summary-card">
          <div className="admin-contact-summary-icon">
            <Mail size={21} />
          </div>

          <div>
            <span>
              Total Messages
            </span>

            <strong>
              {contacts.length}
            </strong>
          </div>
        </article>

        <article className="admin-contact-summary-card">
          <div className="admin-contact-summary-icon pink">
            <Mail size={21} />
          </div>

          <div>
            <span>
              Today
            </span>

            <strong>
              {todayCount}
            </strong>
          </div>
        </article>

        <article className="admin-contact-summary-card">
          <div className="admin-contact-summary-icon cyan">
            <Eye size={21} />
          </div>

          <div>
            <span>
              Showing
            </span>

            <strong>
              {filteredContacts.length}
            </strong>
          </div>
        </article>
      </div>

      <div className="admin-contact-search-area">
        <div className="admin-contact-search">
          <Search size={18} />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search by name, email, subject or message..."
          />

          {search && (
            <button
              type="button"
              className="admin-contact-search-clear"
              onClick={() =>
                setSearch("")
              }
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="admin-contact-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="admin-contact-loading">
          <div className="admin-contact-loader" />

          <span>
            Loading contact messages...
          </span>
        </div>
      ) : filteredContacts.length ===
        0 ? (
        <AdminEmptyState
          title="No contact messages"
          description={
            search
              ? "Try changing your search."
              : "Messages submitted through the contact form will appear here."
          }
        />
      ) : (
        <div className="admin-contact-list">
          {filteredContacts.map(
            (contact) => (
              <article
                className="admin-contact-card"
                key={contact.id}
              >
                <div className="admin-contact-card-accent" />

                <div className="admin-contact-avatar">
                  {contact.name
                    ?.charAt(0)
                    ?.toUpperCase() ||
                    "U"}
                </div>

                <div className="admin-contact-content">
                  <div className="admin-contact-top">
                    <div>
                      <span className="admin-contact-label">
                        MESSAGE
                      </span>

                      <h3>
                        {contact.subject ||
                          "No subject"}
                      </h3>

                      <p>
                        {contact.name ||
                          "Unknown sender"}
                        {" · "}
                        {contact.email ||
                          "No email"}
                      </p>
                    </div>
                  </div>

                  <div className="admin-contact-preview">
                    {contact.message ||
                      "No message content."}
                  </div>

                  <div className="admin-contact-actions">
                    <button
                      type="button"
                      className="admin-contact-view"
                      onClick={() =>
                        setSelectedContact(
                          contact
                        )
                      }
                    >
                      <Eye size={15} />
                      View Message
                    </button>

                    <button
                      type="button"
                      className="admin-contact-delete"
                      onClick={() =>
                        handleDelete(
                          contact
                        )
                      }
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      )}

      {selectedContact && (
        <div
          className="admin-contact-modal-overlay"
          onClick={() =>
            setSelectedContact(null)
          }
        >
          <div
            className="admin-contact-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="admin-contact-modal-header">
              <div>
                <span>
                  CONTACT MESSAGE
                </span>

                <h2>
                  {selectedContact.subject ||
                    "No subject"}
                </h2>
              </div>

              <button
                type="button"
                className="admin-contact-modal-close"
                onClick={() =>
                  setSelectedContact(
                    null
                  )
                }
                aria-label="Close message"
              >
                <X size={19} />
              </button>
            </div>

            <div className="admin-contact-modal-sender">
              <div className="admin-contact-avatar">
                {selectedContact.name
                  ?.charAt(0)
                  ?.toUpperCase() ||
                  "U"}
              </div>

              <div>
                <strong>
                  {selectedContact.name ||
                    "Unknown sender"}
                </strong>

                <span>
                  {selectedContact.email ||
                    "No email"}
                </span>
              </div>
            </div>

            <div className="admin-contact-message-box">
              <span>
                MESSAGE
              </span>

              <p>
                {selectedContact.message ||
                  "No message content."}
              </p>
            </div>

            <div className="admin-contact-modal-footer">
              <button
                type="button"
                className="admin-contact-modal-delete"
                onClick={() =>
                  handleDelete(
                    selectedContact
                  )
                }
              >
                <Trash2 size={16} />
                Delete Message
              </button>

              <button
                type="button"
                className="admin-contact-modal-close-action"
                onClick={() =>
                  setSelectedContact(
                    null
                  )
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminContacts;