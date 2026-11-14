// ─────────────────────────────────────────────────────────────────────────────
// Every word on the site lives here. Edit this file; every page reads from it.
// Items marked TODO(verify) are placeholders written during design — confirm them.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Imtiaz Ahmed",
  brand: "Nibirman",
  title: "Agentic Product Manager",
  city: "Dhaka",
  tz: "UTC+6",
  promise: "I turn AI agents into products people trust.",
  email: "nibirimtiaz1@gmail.com",
  cvUrl: "/cv.pdf", // TODO: drop the real PDF at public/cv.pdf
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" }, // TODO(verify): real profile URLs
    { label: "Dribbble", href: "https://dribbble.com/" },
    { label: "Behance", href: "https://www.behance.net/" },
  ],
};

export const stats = [
  { value: "6+", label: "Years shipping products" },
  { value: "+32%", label: "Traffic, Amelie Company" },
  { value: "AA", label: "WCAG 2.1, RideBustang" },
  { value: "5", label: "Sectors served" },
];

export const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

/** The Evolution — five acts, each with its painting. TODO(verify): order, roles. */
export const acts = [
  {
    n: "I", name: "Tecognize", title: ["The", "Apprentice"], role: "Product designer",
    img: "/paintings/apprentice.jpg", caption: "Oil on linen · the apprentice, at his drafting table",
    story: "Where the craft began. Interfaces drawn and redrawn, shipped weekly, learned the hard way: by watching real people get stuck.",
    gifts: ["Interface craft", "Usability testing", "Shipping cadence"],
  },
  {
    n: "II", name: "SIMEC", title: ["The", "Archivist"], role: "UX / product design · GovTech",
    img: "/paintings/archivist.jpg", caption: "Oil on linen · the archivist, among the ministers",
    story: "Ministries ran on paper stacks and phone calls. Mapped every hand-off, then replaced the mountain with one shared workflow: LIMS.",
    gifts: ["Systems mapping", "Stakeholders", "Gov workflows"],
  },
  {
    n: "III", name: "Digital Gregg (USA)", title: ["The", "Voyager"], role: "Design lead · remote, across the sea",
    img: "/paintings/voyager.jpg", caption: "Oil on linen · the voyager, at the prow",
    story: "Crossed the ocean without leaving Dhaka. 988 crisis care, RideBustang transit, Amelie's +32% traffic: design for people on hard days.",
    gifts: ["Accessibility", "Crisis UX", "Remote leadership"],
  },
  {
    n: "IV", name: "Poridhi", title: ["The", "Teacher"], role: "Product manager · AI + EdTech",
    img: "/paintings/teacher.jpg", caption: "Fresco · the teacher, in the academy",
    story: "Took the roadmap. Zero-setup cloud labs so students learn by doing, an AI helper for when they're stuck, and the story investors needed.",
    gifts: ["Roadmapping", "Prioritisation", "Investor narrative"],
  },
  {
    n: "V", name: "DIU · now", title: ["The", "Maker of Automatons"], role: "Agentic product manager",
    img: "/paintings/forge.jpg", caption: "Oil on linen · the forge of automatons",
    story: "Like Hephaestus with his bronze helpers: agents draft, a human approves. Shipping AI-first products across business units.",
    gifts: ["Agent loops", "Human-in-the-loop", "AI strategy"],
  },
];

export const capabilities = [
  { n: "I", title: "Product strategy", body: "Which problem, for whom, in what order. Roadmaps a team can defend in a room." },
  { n: "II", title: "Agentic AI products", body: "Agent loops with a human in charge: what the agent drafts, who approves." },
  { n: "III", title: "UX research + design", body: "From bus stops to crisis lines. Research first, then design for the hardest day." },
  { n: "IV", title: "Design systems + a11y", body: "WCAG 2.1 AA systems that hold up on one bar of signal." },
];

export type Work = {
  slug: string;
  name: string;
  italic?: string;
  tag: string;
  role: string;
  img: string;
  result: string; // shown in the list
  resultBig: string;
  logline: string;
  facts: { k: string; v: string }[];
  problem: { cap: string; lead: string; body: string[] };
  decisions: { title: string; gaveUp: string }[];
  outcome: string;
};

// TODO(verify): case-study specifics beyond RideBustang are drafted from short notes.
export const works: Work[] = [
  {
    slug: "poridhi", name: "Poridhi", tag: "AI · EdTech", role: "PM · roadmap owner", img: "/paintings/teacher.jpg",
    result: "fewer drop-offs", resultBig: "↓", logline: "Cloud labs with zero setup. Students learn by doing.",
    facts: [{ k: "Role", v: "PM, roadmap owner" }, { k: "Users", v: "Students, every level" }, { k: "Constraint", v: "No local setup" }, { k: "Shipped", v: "AI lab helper" }],
    problem: { cap: "L", lead: "earners quit before their first lab booted.", body: ["Setting up a local environment was the first lesson, and the last one for many students.", "The question became: what if the lab was already running when the student arrived?"] },
    decisions: [
      { title: "Zero-setup labs first.", gaveUp: "a richer, configurable environment for advanced users." },
      { title: "An AI helper, not an AI teacher.", gaveUp: "a flashier tutor; the helper only nudges when a student is stuck." },
      { title: "One roadmap, told as one story.", gaveUp: "side bets that diluted the investor narrative." },
    ],
    outcome: "Lower drop-off before the first lab, and a clearer story for investors.",
  },
  {
    slug: "988-crisis-care", name: "988", italic: "Crisis Care", tag: "Health · Colorado", role: "Product design lead", img: "/paintings/archivist.jpg",
    result: "calm, by design", resultBig: "Calm", logline: "Designing calm for people on their hardest day.",
    facts: [{ k: "Role", v: "Design lead" }, { k: "Users", v: "People in crisis" }, { k: "Constraint", v: "Stress, low attention" }, { k: "Standard", v: "Plain language" }],
    problem: { cap: "P", lead: "eople in crisis can't parse dense pages.", body: ["Clinical, information-heavy pages ask too much of someone who is struggling.", "Every screen had to offer one clear next step."] },
    decisions: [
      { title: "One action per screen.", gaveUp: "completeness on every page." },
      { title: "Short lines, warm words.", gaveUp: "clinical precision in headlines." },
      { title: "The phone number is always visible.", gaveUp: "a cleaner header." },
    ],
    outcome: "A crisis experience built for trust and readability under stress.",
  },
  {
    slug: "ridebustang", name: "Ride", italic: "Bustang", tag: "Transit · WCAG AA", role: "PM / design lead", img: "/paintings/voyager.jpg",
    result: "AA", resultBig: "AA", logline: "Transit for every age, on one bar of signal.",
    facts: [{ k: "Role", v: "PM & design lead" }, { k: "Riders", v: "Rural, every age" }, { k: "Constraint", v: "One bar of signal" }, { k: "Standard", v: "WCAG 2.1 AA" }],
    problem: {
      cap: "R", lead: "ural riders. One bar of signal. Every age.",
      body: [
        "The riders who need Bustang most are the ones a typical transit app forgets: older people on old phones, students on prepaid data, and anyone waiting at a stop where the network drops to a single bar.",
        "A map-first app spends its first seconds loading tiles. At a rural stop, that is the bus leaving. The question wasn't “how do we show the route?” but “what's the least we can send to get someone on the right bus?”",
      ],
    },
    decisions: [
      { title: "Text before map.", gaveUp: "the hero map screenshot every transit app leads with. The map loads only when asked." },
      { title: "One answer, not a list.", gaveUp: "showing every option. The next bus is the default; alternatives sit one tap away." },
      { title: "Type that a grandmother can read.", gaveUp: "density. Larger type and AA contrast meant fewer things per screen." },
    ],
    outcome: "WCAG 2.1 AA compliant, and built to answer before the network gives up.",
  },
  {
    slug: "lims", name: "LIMS", tag: "GovTech · Ministries", role: "Product designer → PM", img: "/paintings/archivist.jpg",
    result: "paper, retired", resultBig: "1", logline: "Paper mountains, turned into one government platform.",
    facts: [{ k: "Role", v: "Designer → PM" }, { k: "Users", v: "Ministry staff" }, { k: "Constraint", v: "Legacy process" }, { k: "Shipped", v: "One workflow" }],
    problem: { cap: "M", lead: "inistry records lived in folders and phone calls.", body: ["Every hand-off between offices was a stack of paper and a phone call.", "We mapped every hand-off before drawing a single screen."] },
    decisions: [
      { title: "Map the process before the product.", gaveUp: "an early demo." },
      { title: "One shared workflow.", gaveUp: "per-office customisation." },
      { title: "Train the champions first.", gaveUp: "a big-bang launch." },
    ],
    outcome: "One platform instead of stacks of paper.",
  },
  {
    slug: "fuudy-amelie", name: "Fuudy", italic: "& Amelie", tag: "Food · Local business", role: "Design + product", img: "/paintings/apprentice.jpg",
    result: "+32% traffic", resultBig: "+32%", logline: "One ordering system across customer, rider and admin apps.",
    facts: [{ k: "Role", v: "Design + product" }, { k: "Apps", v: "Customer, rider, admin" }, { k: "Constraint", v: "Small teams" }, { k: "Result", v: "+32% traffic" }],
    problem: { cap: "T", lead: "hree apps, three mental models, one hungry customer.", body: ["Each app had grown on its own, so the same order looked different everywhere.", "Local businesses also needed sites that people could actually find."] },
    decisions: [
      { title: "One design system for three apps.", gaveUp: "bespoke screens per team." },
      { title: "Search-first local sites.", gaveUp: "heavier visual homepages." },
      { title: "Measure traffic, not opinions.", gaveUp: "endless redesign debates." },
    ],
    outcome: "+32% traffic on the Amelie / Charlotte LED sites.",
  },
];

/** Train journey stations (home, Act II). TODO(verify) order + roles. */
export const stations = acts.map((a) => ({ name: a.name.replace(" · now", ""), role: a.role, note: a.story.split(". ")[0] + "." }));

export const loop = [
  { step: "Ask", line: "Who is it for, and what happens to them if we get it wrong?" },
  { step: "Listen", line: "Go where the users are. Bus stops, clinics, ministries." },
  { step: "Build", line: "The agent drafts the options. A human approves the one we ship." },
  { step: "Measure", line: "Ship, read the numbers with the team, then do it again." },
];

export const chapters = [
  { id: "top", label: "Prologue", count: null },
  { id: "journey", label: "Journey", count: acts.length },
  { id: "capabilities", label: "Capabilities", count: capabilities.length },
  { id: "works", label: "Works", count: works.length },
  { id: "commission", label: "Commission", count: null },
] as const;
