import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Facebook,
  GlassWater,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";

const FACEBOOK_URL = "https://www.facebook.com/GrapeExpectationsWineBar/";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Grape+Expectations+5535+Cypress+Gardens+Blvd+Winter+Haven+FL+33884";

const pours = [
  {
    id: "red",
    label: "Red",
    headline: "Deep, bright, and ready to linger.",
    copy: "From easygoing weeknight pours to bottles worth slowing down for, the red list spans familiar favorites and welcome surprises.",
    notes: ["Silky", "Structured", "Fruit-forward"],
  },
  {
    id: "white",
    label: "White",
    headline: "Crisp refreshment, no occasion required.",
    copy: "Explore aromatic, mineral, and richly textured whites selected for Florida afternoons and unhurried evenings.",
    notes: ["Crisp", "Aromatic", "Textured"],
  },
  {
    id: "rose",
    label: "Rosé",
    headline: "A little sunshine in every glass.",
    copy: "Dry, bright, and endlessly versatile. Rosé belongs at the table, at the bar, and anywhere good company gathers.",
    notes: ["Dry", "Fresh", "Food-friendly"],
  },
  {
    id: "sparkling",
    label: "Sparkling",
    headline: "Make an ordinary night feel like something.",
    copy: "Celebrate the big moments, the small wins, or simply finding an open seat beside someone you like.",
    notes: ["Lively", "Elegant", "Celebratory"],
  },
] as const;

const gallery = [
  {
    src: "/images/hero-interior.jpg",
    alt: "A glass of red wine at the Grape Expectations bar",
  },
  {
    src: "/images/charcuterie.jpg",
    alt: "Wine and a charcuterie plate at Grape Expectations",
  },
  {
    src: "/images/bar-interior.jpg",
    alt: "The intimate Grape Expectations wine bar interior",
  },
  {
    src: "/images/glass-at-bar.jpg",
    alt: "A selection of wine bottles served at Grape Expectations",
  },
  {
    src: "/images/wine-pour.jpg",
    alt: "Wine and hand-painted glasses at Grape Expectations",
  },
  {
    src: "/images/community.jpg",
    alt: "A red wine pour with the Grape Expectations bar behind it",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pour, setPour] = useState<(typeof pours)[number]["id"]>("red");
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const selectedPour = pours.find((item) => item.id === pour) ?? pours[0];

  useEffect(() => {
    document.body.style.overflow = menuOpen || galleryIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, galleryIndex]);

  const closeMenu = () => setMenuOpen(false);
  const moveGallery = (direction: number) => {
    setGalleryIndex((current) => {
      if (current === null) return null;
      return (current + direction + gallery.length) % gallery.length;
    });
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Grape Expectations home">
          <span className="brand-mark">GE</span>
          <span className="brand-name">Grape Expectations</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#wine">Wine</a>
          <a href="#experience">Experience</a>
          <a href="#happenings">Happenings</a>
          <a href="#visit">Visit</a>
        </nav>

        <a className="header-action" href="tel:+18633188800">
          <Phone size={16} aria-hidden="true" />
          <span>Call the bar</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <nav aria-label="Mobile navigation">
            <a href="#wine" onClick={closeMenu}>Wine</a>
            <a href="#experience" onClick={closeMenu}>Experience</a>
            <a href="#happenings" onClick={closeMenu}>Happenings</a>
            <a href="#visit" onClick={closeMenu}>Visit</a>
          </nav>
          <div className="mobile-menu-actions">
            <a href="tel:+18633188800"><Phone size={18} /> Call</a>
            <a href={MAP_URL} target="_blank" rel="noreferrer">
              <MapPin size={18} /> Directions
            </a>
          </div>
        </div>
      )}

      <main>
        <section className="hero" id="top">
          <img
            className="hero-image"
            src="/images/hero-interior.jpg"
            alt="A generous glass of red wine at the Grape Expectations bar"
          />
          <div className="hero-shade" />
          <div className="hero-content page-shell">
            <p className="eyebrow">Winter Haven, Florida</p>
            <h1>Grape<br />Expectations</h1>
            <p className="hero-copy">
              Your neighborhood wine bar for generous pours, fresh pairings,
              familiar faces, and nights that unfold at their own pace.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#wine">
                Explore the experience <ArrowRight size={17} />
              </a>
              <a className="button button-quiet" href={MAP_URL} target="_blank" rel="noreferrer">
                <MapPin size={17} /> Get directions
              </a>
            </div>
          </div>
          <a className="hero-foot" href="#wine" aria-label="Continue to wine selection">
            <span>Largest by-the-glass selection in Winter Haven</span>
            <span className="hero-special">2 for 1 daily wine specials</span>
          </a>
        </section>

        <section className="wine-section section" id="wine">
          <div className="page-shell wine-layout">
            <div className="section-intro">
              <p className="eyebrow eyebrow-dark">Find your pour</p>
              <h2>Wine without the velvet rope.</h2>
              <p>
                Come curious. The list moves from comfortable classics to bottles
                you may not know yet, all served in a room where questions are welcome.
              </p>
              <a className="text-link" href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                See what is pouring now <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="pour-explorer">
              <div className="pour-tabs" role="tablist" aria-label="Wine styles">
                {pours.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={pour === item.id}
                    className={pour === item.id ? "active" : ""}
                    onClick={() => setPour(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="pour-content" role="tabpanel">
                <div>
                  <GlassWater size={28} strokeWidth={1.5} />
                  <h3>{selectedPour.headline}</h3>
                  <p>{selectedPour.copy}</p>
                </div>
                <ul>
                  {selectedPour.notes.map((note) => (
                    <li key={note}><Check size={15} /> {note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="story-section section" id="experience">
          <div className="page-shell story-grid">
            <div className="story-image story-image-main">
              <img src="/images/charcuterie.jpg" alt="Wine and a charcuterie plate at the bar" />
            </div>
            <div className="story-copy">
              <p className="eyebrow">Stay awhile</p>
              <h2>Good wine. Fresh charcuterie. Zero pretense.</h2>
              <p>
                Grape Expectations is the kind of place where one glass becomes
                a conversation. Settle in at the bar, share a board, and let the
                staff help you find something that fits the moment.
              </p>
              <div className="story-points">
                <div><strong>Generous pours</strong><span>Wine lover approved</span></div>
                <div><strong>Indoor + outdoor</strong><span>Choose your pace</span></div>
                <div><strong>Friendly guidance</strong><span>No wine test required</span></div>
              </div>
            </div>
            <div className="story-image story-image-secondary">
              <img src="/images/bar-interior.jpg" alt="Hanging glasses inside Grape Expectations" />
            </div>
          </div>
        </section>

        <section className="happenings-section section" id="happenings">
          <div className="page-shell">
            <div className="happenings-heading">
              <div>
                <p className="eyebrow">At the bar</p>
                <h2>There is usually a reason to raise a glass.</h2>
              </div>
              <a className="button button-light" href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                <Facebook size={17} /> Current events
              </a>
            </div>

            <div className="event-list">
              <article>
                <span className="event-number">01</span>
                <div><h3>Live & local</h3><p>Soft piano, acoustic guitar, and local vocalists rotate through the room.</p></div>
                <CalendarDays size={22} />
              </article>
              <article>
                <span className="event-number">02</span>
                <div><h3>Creative nights</h3><p>Painted glasses, sip-and-create gatherings, and one-of-a-kind community events.</p></div>
                <GlassWater size={22} />
              </article>
              <article>
                <span className="event-number">03</span>
                <div><h3>Daily wine specials</h3><p>Two-for-one selections make it easy to stay for the second glass.</p></div>
                <Clock3 size={22} />
              </article>
            </div>
          </div>
        </section>

        <section className="gallery-section section" aria-labelledby="gallery-title">
          <div className="page-shell">
            <div className="gallery-heading">
              <div>
                <p className="eyebrow eyebrow-dark">Inside Grape Expectations</p>
                <h2 id="gallery-title">A little polished. A lot personal.</h2>
              </div>
              <p>Real pours, real nights, and the unmistakable personality of the neighborhood bar.</p>
            </div>
            <div className="gallery-grid">
              {gallery.map((image, index) => (
                <button
                  type="button"
                  className={`gallery-item gallery-item-${index + 1}`}
                  key={image.src}
                  onClick={() => setGalleryIndex(index)}
                  aria-label={`Open photo ${index + 1}`}
                >
                  <img src={image.src} alt={image.alt} />
                  <span><ArrowUpRight size={18} /></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="quote-section">
          <div className="page-shell quote-layout">
            <p className="quote-mark">“</p>
            <blockquote>
              The kind of place where you can arrive for a glass and leave with a few more friends.
            </blockquote>
            <p className="quote-source">Inspired by longtime guest reviews</p>
          </div>
        </section>

        <section className="visit-section section" id="visit">
          <div className="page-shell visit-grid">
            <div className="visit-copy">
              <p className="eyebrow eyebrow-dark">Come by</p>
              <h2>Your seat is closer than you think.</h2>
              <address>
                5535 Cypress Gardens Blvd, Suite 150<br />
                Winter Haven, FL 33884
              </address>
              <div className="visit-actions">
                <a className="button button-dark" href={MAP_URL} target="_blank" rel="noreferrer">
                  <MapPin size={17} /> Directions
                </a>
                <a className="button button-outline" href="tel:+18633188800">
                  <Phone size={17} /> (863) 318-8800
                </a>
              </div>
            </div>
            <div className="hours">
              <div className="hours-heading"><Clock3 size={20} /><h3>Hours</h3></div>
              <dl>
                <div><dt>Monday – Saturday</dt><dd>12 PM – 10 PM</dd></div>
                <div><dt>Sunday</dt><dd>3 PM – 7 PM</dd></div>
              </dl>
              <p>Hours may shift for holidays and special events.</p>
              <a className="text-link" href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                Confirm today’s hours <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="page-shell footer-grid">
          <div>
            <span className="footer-mark">GE</span>
            <h2>Grape Expectations</h2>
            <p>Wine bar · Winter Haven, Florida</p>
          </div>
          <div className="footer-links">
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer"><Facebook size={17} /> Facebook</a>
            <a href="tel:+18633188800"><Phone size={17} /> Call</a>
            <a href={MAP_URL} target="_blank" rel="noreferrer"><MapPin size={17} /> Directions</a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Grape Expectations</p>
        </div>
      </footer>

      {galleryIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
          <button className="lightbox-close" type="button" onClick={() => setGalleryIndex(null)} aria-label="Close photo">
            <X />
          </button>
          <button className="lightbox-control lightbox-prev" type="button" onClick={() => moveGallery(-1)} aria-label="Previous photo">
            <ChevronLeft />
          </button>
          <img src={gallery[galleryIndex].src} alt={gallery[galleryIndex].alt} />
          <button className="lightbox-control lightbox-next" type="button" onClick={() => moveGallery(1)} aria-label="Next photo">
            <ChevronRight />
          </button>
          <p>{galleryIndex + 1} / {gallery.length}</p>
        </div>
      )}
    </>
  );
}

export default App;
