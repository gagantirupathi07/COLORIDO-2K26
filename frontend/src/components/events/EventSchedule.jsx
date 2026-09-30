import {
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

function EventSchedule({ event }) {
  return (
    <div className="event-schedule">
      <div className="schedule-item">
        <CalendarDays size={20} />

        <div>
          <span>Date</span>
          <strong>
            {event.eventDate ||
              "To be announced"}
          </strong>
        </div>
      </div>

      <div className="schedule-item">
        <Clock3 size={20} />

        <div>
          <span>Start Time</span>
          <strong>
            {event.eventStartTime ||
              "To be announced"}
          </strong>
        </div>
      </div>

      <div className="schedule-item">
        <Clock3 size={20} />

        <div>
          <span>Duration</span>
          <strong>
            {event.duration ||
              "To be announced"}
          </strong>
        </div>
      </div>

      <div className="schedule-item">
        <MapPin size={20} />

        <div>
          <span>Venue</span>
          <strong>
            {event.venue ||
              "To be announced"}
          </strong>
        </div>
      </div>
    </div>
  );
}

export default EventSchedule;