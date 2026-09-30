import { useState } from "react";
import {
  Award,
  Palette,
  Sparkles,
  Trophy,
  Users,
  Building2,
  CalendarDays,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import coloridoImage from "../assets/colorido-hero.jpg";
import rvrLogo from "../assets/rvrjc-logo.png";

import "../styles/about.css";

function About() {
  const [activeStory, setActiveStory] = useState("college");

  const storyImage =
    activeStory === "college"
      ? rvrLogo
      : coloridoImage;

  const storyAlt =
    activeStory === "college"
      ? "R.V.R. & J.C. College of Engineering logo"
      : "COLORIDO 2K26";

  return (
    <div className="about-page">
      <Navbar />

      <main>
        <section className="about-hero">
          <div className="about-hero-content">
            <span className="about-label">
              COLORIDO 2K26
            </span>

            <h1>
              Where Talent Meets
              <span> Celebration.</span>
            </h1>

            <p>
              COLORIDO 2K26 is a national-level cultural and
              sports festival presented by R.V.R. & J.C. College
              of Engineering, bringing together creativity,
              talent, teamwork and competitive spirit.
            </p>
          </div>

          <div className="about-hero-image">
            <div className="about-hero-image-frame">
              <img
                src={coloridoImage}
                alt="COLORIDO 2K26 festival"
              />
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-heading">
            <span>ABOUT COLORIDO</span>

            <h2>
              More than an event.
              <span> It's an experience.</span>
            </h2>

            <p>
              COLORIDO brings together participants from
              different institutions to showcase their talent
              across cultural and sporting events. From
              performing arts and fashion to team sports and
              individual competitions, the festival celebrates
              participation, creativity and excellence.
            </p>
          </div>

          <div className="about-feature-grid">
            <motion.article
              className="about-feature-card"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="about-feature-icon">
                <Palette size={25} />
              </div>

              <h3>Cultural Expression</h3>

              <p>
                Music, dance, drama, fashion, fine arts,
                literature and creative competitions provide
                participants with a platform to express their
                talent.
              </p>

              <span className="about-card-number">
                01
              </span>
            </motion.article>

            <motion.article
              className="about-feature-card"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="about-feature-icon">
                <Trophy size={25} />
              </div>

              <h3>Sportsmanship</h3>

              <p>
                Participants compete across a range of sporting
                events while building teamwork, discipline and
                competitive spirit.
              </p>

              <span className="about-card-number">
                02
              </span>
            </motion.article>

            <motion.article
              className="about-feature-card"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="about-feature-icon">
                <Users size={25} />
              </div>

              <h3>Connect & Compete</h3>

              <p>
                COLORIDO creates an opportunity to meet students,
                discover new talent and build memorable
                experiences together.
              </p>

              <span className="about-card-number">
                03
              </span>
            </motion.article>

            <motion.article
              className="about-feature-card"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="about-feature-icon">
                <Award size={25} />
              </div>

              <h3>Celebrate Excellence</h3>

              <p>
                Every performance and competition is an
                opportunity to showcase dedication, creativity
                and the pursuit of excellence.
              </p>

              <span className="about-card-number">
                04
              </span>
            </motion.article>
          </div>
        </section>

        <section className="about-highlight">
          <div className="about-highlight-glow about-highlight-glow-one" />

          <div className="about-highlight-glow about-highlight-glow-two" />

          <div className="about-highlight-top">
            <div className="about-highlight-logo">
              <AnimatePresence mode="wait">
                <motion.img
                  key={storyImage}
                  src={storyImage}
                  alt={storyAlt}
                  initial={{
                    opacity: 0,
                    scale: 0.75,
                    rotate: -8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.75,
                    rotate: 8,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                />
              </AnimatePresence>
            </div>

            <span className="about-highlight-label">
              THE STORY BEHIND COLORIDO
            </span>

            <h2>
              A celebration built
              <span> around people.</span>
            </h2>

            <p className="about-highlight-intro">
              From the institution that nurtures talent to the
              festival that brings it together, COLORIDO is a
              reflection of creativity, participation and
              community.
            </p>
          </div>

          <div className="about-story-switcher">
            <button
              type="button"
              className={
                activeStory === "college"
                  ? "about-story-button active"
                  : "about-story-button"
              }
              onClick={() => setActiveStory("college")}
            >
              <img
                src={rvrLogo}
                alt=""
                className="about-story-button-logo"
              />

              <span>R.V.R. & J.C.</span>
            </button>

            <button
              type="button"
              className={
                activeStory === "colorido"
                  ? "about-story-button active"
                  : "about-story-button"
              }
              onClick={() => setActiveStory("colorido")}
            >
              <img
                src={coloridoImage}
                alt=""
                className="about-story-button-logo about-story-colorido-logo"
              />

              <span>COLORIDO 2K26</span>
            </button>
          </div>

          <div className="about-story-content">
            <AnimatePresence mode="wait">
              {activeStory === "college" ? (
                <motion.div
                  key="college"
                  className="about-story-panel"
                  initial={{
                    opacity: 0,
                    x: -25,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 25,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                >
                  <div className="about-story-panel-logo">
                    <img
                      src={rvrLogo}
                      alt="R.V.R. & J.C. College of Engineering logo"
                    />
                  </div>

                  <div>
                    <span className="about-story-eyebrow">
                      ESTABLISHED IN 1985
                    </span>

                    <h3>
                      R.V.R. & J.C. College of Engineering
                    </h3>

                    <p>
                      R.V.R. & J.C. College of Engineering
                      (RVR&JC), established in 1985 at
                      Chowdavaram, Guntur, Andhra Pradesh, has
                      grown into a respected institution dedicated
                      to quality technical education, innovation
                      and holistic student development.
                    </p>

                    <p>
                      Along with academics, the college encourages
                      students to participate in cultural,
                      creative, technical and sporting activities,
                      providing opportunities to discover and
                      develop their talents.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="colorido"
                  className="about-story-panel"
                  initial={{
                    opacity: 0,
                    x: 25,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -25,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                >
                  <div className="about-story-panel-logo about-story-colorido-panel-logo">
                    <img
                      src={coloridoImage}
                      alt="COLORIDO 2K26"
                    />
                  </div>

                  <div>
                    <span className="about-story-eyebrow">
                      COLORIDO 2K26
                    </span>

                    <h3>
                      Where talent becomes an experience.
                    </h3>

                    <p>
                      COLORIDO 2K26 is a vibrant celebration of
                      student talent, creativity, teamwork and
                      competitive spirit. The event brings
                      together students through diverse cultural
                      and sports competitions.
                    </p>

                    <p>
                      From music, dance, drama and fashion to
                      literary activities and indoor and outdoor
                      sports, COLORIDO provides an energetic
                      platform to showcase abilities, connect
                      with others and create memorable campus
                      experiences.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="about-highlight-stats">
            <div className="about-stat">
              <CalendarDays size={21} />
              <strong>1985</strong>
              <span>College Established</span>
            </div>

            <div className="about-stat">
              <Trophy size={21} />
              <strong>Cultural + Sports</strong>
              <span>Multiple Event Categories</span>
            </div>

            <div className="about-stat">
              <Users size={21} />
              <strong>Students</strong>
              <span>Connect & Compete</span>
            </div>

            <div className="about-stat">
              <Heart size={21} />
              <strong>One Spirit</strong>
              <span>Celebrate Together</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;