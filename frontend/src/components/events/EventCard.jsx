import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <article className="event-card">
      <div className="event-card-top">
        <span className="event-card-category">
          {event.category}
        </span>
      </div>

      <div className="event-card-image">
        <img
          src={event.imageUrl || "/events/default.webp"}
          alt={event.name}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="event-card-body">
        <span className="event-card-subcategory">
          {event.subcategory || event.category}
        </span>

        <h3>{event.name}</h3>

        <p>
          {event.description ||
            "Event details will be announced by the organizers."}
        </p>

        <div className="event-card-meta">
          <span>
            <CalendarDays size={16} />
            {event.eventDate || "Date TBA"}
          </span>

          <span>
            <MapPin size={16} />
            {event.venue || "Venue TBA"}
          </span>

          <span>
            <Users size={16} />
            {event.teamSize || 1}
          </span>
        </div>

        <Link
          to={`/events/${event.id}`}
          className="event-card-link"
        >
          View Details
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export default EventCard;