import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import "../../styles/ui.css";

function GlowButton({
  children,
  href = "#",
  className = "",
}) {
  return (
    <Link
      to={href}
      className={`glow-button ${className}`}
    >
      <span>{children}</span>

      <span className="glow-button-icon">
        <ArrowUpRight size={17} />
      </span>
    </Link>
  );
}

export default GlowButton;