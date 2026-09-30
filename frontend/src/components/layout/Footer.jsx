import {
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

import "../../styles/footer.css";

const socialLinks = [
  {
    name: "Instagram",
    url: "#",
    icon: "IG",
  },
  {
    name: "Twitter",
    url: "#",
    icon: "X",
  },
  {
    name: "YouTube",
    url: "#",
    icon: "YT",
  },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-glow" />

      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <Sparkles size={20} />
            <span>COLORIDO</span>
          </div>

          <p>
            A celebration of culture, creativity, sports, and
            unforgettable moments.
          </p>

          <div className="footer-location">
            <MapPin size={17} />
            <span>RVR & JC COLLEGE OF ENGINEERING, Guntur,Andhra Pradesh, India, 522019</span>
          </div>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>

          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#events">Events</a>
          <a href="#cultural">Cultural</a>
          <a href="#sports">Sports</a>
          <a href="#register">Register</a>
        </div>

        <div className="footer-contact">
          <h3>Connect</h3>

          <a href="mailto:colorido2k26@gmail.com">
            <Mail size={17} />
            <span>colorido2k26@gmail.com</span>
          </a>

          <div className="footer-socials">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                aria-label={social.name}
                className="social-icon"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 COLORIDO 2K26. All rights reserved.
        </p>

        <p>
          Designed for the celebration of talent.
        </p>
      </div>
    </footer>
  );
}

export default Footer;