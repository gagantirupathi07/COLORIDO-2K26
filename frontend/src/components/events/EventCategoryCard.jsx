import {
  Music,
  Palette,
  Drama,
  Trophy,
  Shirt,
  BookOpen,
  Sparkles,
  Mic2,
} from "lucide-react";

const icons = {
  MUSIC: Music,
  FINE_ARTS: Palette,
  DANCE: Sparkles,
  DRAMATICS: Drama,
  SPORTS: Trophy,
  FASHION: Shirt,
  LITERARY: BookOpen,
  TEKRAFT: Mic2,
};

function EventCategoryCard({ category, title, description, count }) {
  const Icon = icons[category] || Sparkles;

  return (
    <div className="event-category-card">
      <div className="event-category-icon">
        <Icon size={28} />
      </div>

      <div className="event-category-content">
        <span>{count} Events</span>

        <h3>{title}</h3>

        <p>{description}</p>
      </div>
    </div>
  );
}

export default EventCategoryCard;