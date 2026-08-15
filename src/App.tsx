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
  Music2,
  Palette,
  PawPrint,
  Phone,
  X,
} from "lucide-react";

const FACEBOOK_URL = "https://www.facebook.com/GrapeExpectationsWineBar/";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Grape+Expectations+5535+Cypress+Gardens+Blvd+Suite+150+Winter+Haven+FL+33884";
const CYPRESS_STATION_URL =
  "https://www.google.com/maps/search/?api=1&query=Cypress+Station+Winter+Haven+FL";

const weeklyHours = [
  { day: "Sunday", open: 16, close: 20 },
  { day: "Monday", open: null, close: null },
  { day: "Tuesday", open: 12, close: 22 },
  { day: "Wednesday", open: 12, close: 22 },
  { day: "Thursday", open: 12, close: 22 },
  { day: "Friday", open: 12, close: 22 },
  { day: "Saturday", open: 12, close: 22 },
] as const;

const eventSchedule = [
  {
    timing: "Every open day",
    status: "Recurring",
    title: "Happy hour pours",
    copy: "Settle in with generous pours and rotating wine specials from a broad list of vintages.",
    linkLabel: "See today's pours",
    icon: Clock3,
  },
  {
    timing: "Select nights",
    status: "Occasional",
    title: "Live & local",
    copy: "Soft piano, acoustic guitar, and local vocalists bring an easy soundtrack to the room.",
    linkLabel: "Watch for the next date",
    icon: Music2,
  },
  {
    timing: "Past favorite",
    status: "Event archive",
    title: "Yappy Hour",
    copy: "A patio gathering for wine lovers and their four-legged companions, previously featured at the bar.",
    linkLabel: "Follow for its return",
    icon: PawPrint,
  },
  {
    timing: "Past favorite",
    status: "Event archive",
    title: "Creative nights",
    copy: "Painted glasses, sip-and-create gatherings, and relaxed community nights with a creative streak.",
    linkLabel: "Follow for new events",
    icon: Palette,
  },
] as const;

function getVenueStatus() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  const day = value("weekday");
  const minutes = Number(value("hour")) * 60 + Number(value("minute"));
  const todayIndex = weeklyHours.findIndex((entry) => entry.day === day);
  const today = weeklyHours[todayIndex];

  if (today?.open !== null && today?.close !== null) {
    if (minutes >= today.open * 60 && minutes < today.close * 60) {
      return { open: true, label: `Open now - until ${today.close === 22 ? "10 PM" : "8 PM"}` };
    }
    if (minutes < today.open * 60) {
      return { open: false, label: `Opens today at ${today.open === 12 ? "noon" : "4 PM"}` };
    }
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const next = weeklyHours[(todayIndex + offset) % weeklyHours.length];
    if (next.open !== null) {
      const when = offset === 1 ? "tomorrow" : next.day;
      return { open: false, label: `Opens ${when} at ${next.open === 12 ? "noon" : "4 PM"}` };
    }
  }

  return { open: false, label: "Closed now" };
}

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

const featuredMoments = [
  {
    src: "/images/current/mimosas.jpg",
    eyebrow: "Weekend ritual",
    title: "Mimosas, made for sharing",
    copy: "A bright pour and a house charcuterie board make an easy afternoon occasion.",
  },
  {
    src: "/images/current/charcuterie-boards.jpg",
    eyebrow: "Now serving",
    title: "House charcuterie boards",
    copy: "A savory spread designed to pair with the glass already in your hand.",
  },
  {
    src: "/images/current/margaux-feature.jpg",
    eyebrow: "Featured bottle",
    title: "Chateau La Fortune Margaux",
    copy: "A classic Bordeaux selection for memorable moments and unhurried conversation.",
  },
] as const;

const gallery = [
  {
    src: "/images/current/community-tasting.jpg",
    alt: "Guests gathering for a tasting at Grape Expectations",
  },
  {
    src: "/images/current/wine-display.jpg",
    alt: "Wine bottles displayed at the Grape Expectations bar",
  },
  {
    src: "/images/current/friends-at-the-bar.jpg",
    alt: "Friends smiling together at Grape Expectations",
  },
  {
    src: "/images/current/patio-dog.jpg",
    alt: "A dog in sunglasses enjoying the Grape Expectations patio",
  },
  {
    src: "/images/current/wine-sign.jpg",
    alt: "A sidewalk sign inviting guests to enjoy a glass of wine",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pour, setPour] = useState<(typeof pours)[number]["id"]>("red");
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [venueStatus, setVenueStatus] = useState(getVenueStatus);
  const selectedPour = pours.find((item) => item.id === pour) ?? pours[0];

  useEffect(() => {
    document.body.style.overflow = menuOpen || galleryIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, galleryIndex]);

  useEffect(() => {
    const timer = window.setInterval(() => setVenueStatus(getVenueStatus()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

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
          <img
            className="brand-logo"
            src="/images/current/grape-expectations-logo.jpg"
            alt=""
          />
          <span className="brand-name">Grape Expectations</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#wine">Wine</a>
          <a href="#gallery">Photos</a>
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
            <a href="#gallery" onClick={closeMenu}>Photos</a>
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
          <div className="hero-art" aria-hidden="true" />
          <div className="hero-content page-shell">
            <div className="hero-kicker">
              <p className="eyebrow">Winter Haven, Florida</p>
              <span className={`venue-status ${venueStatus.open ? "is-open" : ""}`}>
                <span aria-hidden="true" />{venueStatus.label}
              </span>
            </div>
            <h1>Grape<br />Expectations</h1>
            <p className="hero-copy">
              A relaxed neighborhood bar with a big list of vintages, generous
              pours, and happy hour specials worth lingering over.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#wine">
                Explore the wine <ArrowRight size={17} />
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

        <section className="featured-section section" aria-labelledby="featured-title">
          <div className="page-shell">
            <div className="featured-heading">
              <div>
                <p className="eyebrow eyebrow-dark">At the bar now</p>
                <h2 id="featured-title">Current pours and pairings.</h2>
              </div>
              <p>
                A closer look at the bottles, boards, and easy reasons to gather around the table.
              </p>
            </div>
            <div className="featured-grid">
              {featuredMoments.map((item) => (
                <article className="featured-card" key={item.src}>
                  <img src={item.src} alt={item.title} />
                  <div>
                    <p className="eyebrow eyebrow-dark">{item.eyebrow}</p>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </article>
              ))}
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

            <div className="event-schedule">
              {eventSchedule.map((event) => {
                const EventIcon = event.icon;
                return (
                  <article className="event-card" key={event.title}>
                    <div className="event-card-topline">
                      <span>{event.timing}</span>
                      <span className="event-status">{event.status}</span>
                    </div>
                    <EventIcon size={24} strokeWidth={1.5} aria-hidden="true" />
                    <h3>{event.title}</h3>
                    <p>{event.copy}</p>
                    <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                      {event.linkLabel} <ArrowUpRight size={15} />
                    </a>
                  </article>
                );
              })}
            </div>
            <div className="event-source-note">
              <CalendarDays size={18} aria-hidden="true" />
              <p><strong>Facebook is the live calendar.</strong> Past favorites are labeled, and new dates appear there first.</p>
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Open Facebook <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="gallery-section section" id="gallery" aria-labelledby="gallery-title">
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
              <p className="visit-description">Relaxed bar with a big list of vintages, as well as happy hour specials.</p>
              <a className="venue-location" href={CYPRESS_STATION_URL} target="_blank" rel="noreferrer">
                <MapPin size={16} /> Located in Cypress Station <ArrowUpRight size={14} />
              </a>
              <address>
                5535 Cypress Gardens Blvd #150<br />
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
              <div className="hours-heading">
                <div><Clock3 size={20} /><h3>Hours</h3></div>
                <span className={`venue-status venue-status-dark ${venueStatus.open ? "is-open" : ""}`}>
                  <span aria-hidden="true" />{venueStatus.label}
                </span>
              </div>
              <dl>
                <div><dt>Monday</dt><dd>Closed</dd></div>
                <div><dt>Tuesday - Thursday</dt><dd>12-10 PM</dd></div>
                <div><dt>Friday</dt><dd>12-10 PM</dd></div>
                <div><dt>Saturday</dt><dd>12-10 PM</dd></div>
                <div><dt>Sunday</dt><dd>4-8 PM</dd></div>
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
            <img
              className="footer-logo"
              src="/images/current/grape-expectations-logo.jpg"
              alt=""
            />
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
