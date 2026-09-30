import { Inbox } from "lucide-react";
import "../../styles/admin/admin-empty-state.css";

function AdminEmptyState({
  title = "Nothing here yet",
  description = "There is no data to display."
}) {
  return (
    <div className="admin-empty-state">
      <div className="admin-empty-state-glow admin-empty-state-glow-pink" />
      <div className="admin-empty-state-glow admin-empty-state-glow-cyan" />

      <div className="admin-empty-state-content">
        <div className="admin-empty-state-icon">
          <div className="admin-empty-state-icon-inner">
            <Inbox size={30} strokeWidth={1.8} />
          </div>
        </div>

        <span className="admin-empty-state-eyebrow">
          COLORIDO 2K26
        </span>

        <h2>{title}</h2>

        <p>{description}</p>
      </div>
    </div>
  );
}

export default AdminEmptyState;