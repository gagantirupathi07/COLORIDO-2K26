import {
  ArrowDown,
  CalendarDays,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlowButton from "../components/ui/GlowButton";
import SectionHeading from "../components/ui/SectionHeading";

import coloridoImage from "../assets/colorido-hero.jpg";

import "../styles/home.css";

function Home() {
  return (
    <div className="home">
      <Navbar />

      <main>
        <section className="hero" id="home">
          <div className="hero-decoration hero-decoration-one" />
          <div className="hero-decoration hero-decoration-two" />
          <div className="hero-decoration hero-decoration-three" />

          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              R.V.R. & J.C. COLLEGE OF ENGINEERING PRESENTS
            </div>

            <p className="hero-festival-label">
              National Level Cultural & Sports Festival
            </p>

            <h1>
              <span className="hero-title-main">
                COLORIDO
              </span>

              <span className="hero-title-year">
                2K26
              </span>
            </h1>

            <p className="hero-description">
              Where talent meets energy, creativity meets
              competition, and every moment becomes a memory.
              Experience the spirit of COLORIDO 2K26.
            </p>

            <div className="hero-actions">
              <GlowButton href="/events">
                Explore Events
              </GlowButton>

              <Link
                to="/register"
                className="glow-button glow-button-secondary"
              >
                Register Now
                <ArrowDown
                  size={17}
                  style={{
                    transform: "rotate(-45deg)",
                  }}
                />
              </Link>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image-glow" />

            <div className="hero-image-frame">
              <img
                src={coloridoImage}
                alt="COLORIDO 2K26 cultural and sports festival"
              />
            </div>

            <div className="hero-image-tag hero-image-tag-one">
              <Trophy size={18} />
              <span>SPORTS</span>
            </div>

            <div className="hero-image-tag hero-image-tag-two">
              <CalendarDays size={18} />
              <span>2K26</span>
            </div>
          </div>

          <a href="#intro" className="hero-scroll">
            <span>Scroll to explore</span>
            <ArrowDown size={16} />
          </a>
        </section>

        <section className="home-intro" id="intro">
          <SectionHeading
            label="The Festival"
            title="A celebration of talent, culture and competition."
            description="COLORIDO 2K26 brings together students and talented participants for an unforgettable celebration of cultural expression and sporting excellence."
            align="center"
          />

          <div className="intro-grid">
            <article className="intro-card">
              <div className="intro-card-icon">
                <Sparkles size={24} />
              </div>

              <h3>Culture</h3>

              <p>
                Experience music, dance, drama, fashion,
                fine arts, literature and creative
                expression.
              </p>
            </article>

            <article className="intro-card">
              <div className="intro-card-icon">
                <Trophy size={24} />
              </div>

              <h3>Sports</h3>

              <p>
                Compete across exciting team and
                individual sporting events and showcase
                your competitive spirit.
              </p>
            </article>

            <article className="intro-card">
              <div className="intro-card-icon">
                <CalendarDays size={24} />
              </div>

              <h3>Memories</h3>

              <p>
                Meet new people, discover new talents and
                create moments that stay with you long
                after the festival.
              </p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;