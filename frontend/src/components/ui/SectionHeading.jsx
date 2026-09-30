import "../../styles/ui.css";

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
}) {
  return (
    <div
      className={`section-heading ${
        centered ? "section-heading-centered" : ""
      }`}
    >
      <span className="section-eyebrow">
        {eyebrow}
      </span>

      <h2>{title}</h2>

      {description && <p>{description}</p>}
    </div>
  );
}

export default SectionHeading;