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

/**
 * Every image on the site comes from Imtiaz's own photos:
 *  - `studio`, `houndstooth` are the real photographs (the shaders dither / engrave them live);
 *  - the rest are cobalt engravings drawn from those photos in Paper (page v7, "00 · Engraved assets").
 * `art: true` = already an engraving → the shader re-inks it in the current Dhaka act's colours.
 * `engraved` = the engraved twin of a photo (used on the right of the hero seam).
 * `focus` = the point (0–1 from top-left) that must stay in frame when cropped.
 */
type Photo = { src: string; focus: [number, number]; alt: string; art?: boolean; engraved?: string };
export const photos = {
  studio: { src: "/photos/imtiaz-studio.jpg", engraved: "/art/portrait-studio.jpg", focus: [0.5, 0.3], alt: "Imtiaz Ahmed, studio portrait in a black turtleneck" },
  houndstooth: { src: "/photos/imtiaz-houndstooth.jpg", engraved: "/art/portrait-houndstooth.jpg", focus: [0.5, 0.3], alt: "Imtiaz Ahmed in a houndstooth shirt" },
  portraitStudio: { src: "/art/portrait-studio.jpg", art: true, focus: [0.5, 0.3], alt: "Engraved portrait of Imtiaz Ahmed" },
  portraitHoundstooth: { src: "/art/portrait-houndstooth.jpg", art: true, focus: [0.5, 0.3], alt: "Engraved portrait of Imtiaz Ahmed in a houndstooth shirt" },
  apprentice: { src: "/art/act-1-apprentice.jpg", art: true, focus: [0.5, 0.4], alt: "Engraving: Imtiaz at a drafting table, sketching interfaces" },
  archivist: { src: "/art/act-2-archivist.jpg", art: true, focus: [0.5, 0.4], alt: "Engraving: Imtiaz in a government archive, replacing paper with one platform" },
  voyager: { src: "/art/act-3-voyager.jpg", art: true, focus: [0.5, 0.4], alt: "Engraving: Imtiaz at a rural bus stop with a trip planner" },
  teacher: { src: "/art/act-4-teacher.jpg", art: true, focus: [0.5, 0.4], alt: "Engraving: Imtiaz teaching students under a classical arch" },
  maker: { src: "/art/act-5-maker.jpg", art: true, focus: [0.5, 0.4], alt: "Engraving: Imtiaz approving a scroll from brass automatons" },
  // live product screenshots (captured Nov 2026), printed by the engraving shader
  sitePuku: { src: "/works/puku.jpg", focus: [0.5, 0.35], alt: "Puku website" },
  siteFeluda: { src: "/works/feluda.jpg", focus: [0.5, 0.4], alt: "Feluda website" },
  sitePoridhi: { src: "/works/poridhi.jpg", focus: [0.6, 0.4], alt: "Poridhi website" },
  site988: { src: "/works/988-colorado.jpg", focus: [0.5, 0.45], alt: "988 Colorado website" },
  siteBustang: { src: "/works/bustang.jpg", focus: [0.4, 0.5], alt: "Bustang website" },
  siteImentor: { src: "/works/imentor.jpg", focus: [0.5, 0.4], alt: "iMentor website" },
  siteDiu: { src: "/works/diu.jpg", focus: [0.5, 0.45], alt: "Daffodil International University website" },
  siteAmelie: { src: "/works/amelie.jpg", focus: [0.35, 0.4], alt: "Amélie Company website" },
} satisfies Record<string, Photo>;
export type PhotoKey = keyof typeof photos;

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
    img: "apprentice" as PhotoKey, caption: "Copper-plate engraving, after a photograph",
    story: "Where the craft began. Interfaces drawn and redrawn, shipped weekly, learned the hard way: by watching real people get stuck.",
    gifts: ["Interface craft", "Usability testing", "Shipping cadence"],
  },
  {
    n: "II", name: "SIMEC", title: ["The", "Archivist"], role: "UX / product design · GovTech",
    img: "archivist" as PhotoKey, caption: "Copper-plate engraving, after a photograph",
    story: "Ministries ran on paper stacks and phone calls. Mapped every hand-off, then replaced the mountain with one shared workflow: LIMS.",
    gifts: ["Systems mapping", "Stakeholders", "Gov workflows"],
  },
  {
    n: "III", name: "Digital Gregg (USA)", title: ["The", "Voyager"], role: "Design lead · remote, across the sea",
    img: "voyager" as PhotoKey, caption: "Copper-plate engraving, after a photograph",
    story: "Crossed the ocean without leaving Dhaka. 988 crisis care, RideBustang transit, Amelie's +32% traffic: design for people on hard days.",
    gifts: ["Accessibility", "Crisis UX", "Remote leadership"],
  },
  {
    n: "IV", name: "Poridhi", title: ["The", "Teacher"], role: "Product manager · AI + EdTech",
    img: "teacher" as PhotoKey, caption: "Copper-plate engraving, after a photograph",
    story: "Took the roadmap. Zero-setup cloud labs so students learn by doing, an AI helper for when they're stuck, and the story investors needed.",
    gifts: ["Roadmapping", "Prioritisation", "Investor narrative"],
  },
  {
    n: "V", name: "DIU · now", title: ["The", "Maker of Automatons"], role: "Agentic product manager",
    img: "maker" as PhotoKey, caption: "Copper-plate engraving, after a photograph",
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
  tag: string; // sector
  group: "AI products" | "Public services" | "Education" | "Brand";
  url: string;
  img: PhotoKey; // the live site, printed as an engraving
  result: string; // short line in the works list
  resultBig: string; // the big figure on the case study
  resultNote: string; // what that figure is (and who says so)
  logline: string; // the product in one line
  facts: { k: string; v: string }[];
  what: { cap: string; lead: string; body: string[] };
  features: { title: string; body: string }[];
  numbers: { value: string; label: string }[]; // only figures the live site itself states
  role: string; // TODO(verify): your role on each project
  contribution: string; // TODO(verify): what you designed / shipped
};

/**
 * The eight commissions. Product facts come from each live site (read Nov 2026);
 * `role` and `contribution` are marked TODO(verify) — replace them with your own words.
 */
export const works: Work[] = [
  {
    slug: "puku", name: "Puku", tag: "AI developer tooling", group: "AI products", url: "http://puku.sh/", img: "sitePuku",
    result: "one memory, four tools", resultBig: "4", resultNote: "products sharing one project memory — Editor, CLI, Chat and App",
    logline: "A calm workbench for shipping software.",
    facts: [{ k: "Sector", v: "AI developer tools" }, { k: "For", v: "Software teams" }, { k: "Made in", v: "Dhaka, by Poridhi" }, { k: "Pricing", v: "Free · Pro · Team" }],
    what: { cap: "O", lead: "ne memory of your project, shared by every agent.", body: [
      "Puku is an AI-native workbench: an editor, a CLI, a browser chat and a mobile app that all read the same project memory, a PUKU.md file every agent shares.",
      "It is built around control rather than magic: the agent plans before it edits, every tool has allow / ask / deny permissions, and checkpoints let you rewind.",
    ] },
    features: [
      { title: "Plan before edit.", body: "The agent proposes the change set first; you approve before files are touched." },
      { title: "Per-tool permissions.", body: "Allow, ask or deny for every tool — the human stays in charge of what the agent may do." },
      { title: "Checkpoints and rewind.", body: "Every session is recoverable; parallel subagents work without losing history." },
    ],
    numbers: [{ value: "4", label: "Products: Editor, CLI, Chat, App" }, { value: "3", label: "Coming: Co-Work, Design, Cloud" }, { value: "৳2,400", label: "Pro, per month (site pricing)" }],
    role: "Product · design (TODO verify)", contribution: "TODO(verify): describe what you led on Puku — e.g. the approval and permissions flow.",
  },
  {
    slug: "feluda", name: "feluda", tag: "AI code review & security", group: "AI products", url: "https://feluda.puku.sh/", img: "siteFeluda",
    result: "find the bugs", resultBig: "1,284", resultNote: "pull requests reviewed in a week, per the live site's banner",
    logline: "Reviews every PR. Attacks your app. Hands you the fix.",
    facts: [{ k: "Sector", v: "AI code review · AppSec" }, { k: "For", v: "Engineering & security teams" }, { k: "Family", v: "Built on Puku" }, { k: "Works with", v: "GitHub · GitLab" }],
    what: { cap: "F", lead: "ind the bugs. Ship with confidence.", body: [
      "Feluda, named after Satyajit Ray's detective, is Puku's investigator: it reviews every pull request and runs agentic penetration tests against the running app.",
      "The whole product speaks in case files: exhibits, severities and a fix you can commit — evidence first, verdict second.",
    ] },
    features: [
      { title: "Review.", body: "AI review on every PR: a ranked issue table, a confidence score and suggested commits that fix the problem." },
      { title: "Attack.", body: "Agentic pentests that build a threat model and walk the attack surface, reporting with CVSS severity." },
      { title: "The case file.", body: "A noir detective voice turns dry security findings into something teams actually read." },
    ],
    numbers: [{ value: "1,284", label: "PRs reviewed this week (site banner)" }, { value: "2", label: "Products: Review and Attack" }],
    role: "Product · design (TODO verify)", contribution: "TODO(verify): describe your part in Feluda.",
  },
  {
    slug: "poridhi", name: "Poridhi", italic: ".io", tag: "EdTech · cloud labs", group: "AI products", url: "https://poridhi.io/", img: "sitePoridhi",
    result: "learn by doing", resultBig: "Labs", resultNote: "hands-on cloud labs instead of setup instructions",
    logline: "Engineering education through hands-on labs, real-world challenges and interactive learning.",
    facts: [{ k: "Sector", v: "EdTech" }, { k: "For", v: "Engineering learners" }, { k: "Based in", v: "Dhaka" }, { k: "Includes", v: "Courses · Labs · AI Studio" }],
    what: { cap: "L", lead: "earn the infrastructure by running it.", body: [
      "Poridhi teaches engineering — DevOps, observability, distributed systems — through labs that are already running when the learner arrives.",
      "Courses, labs and an AI studio sit side by side, so theory, practice and help are one click apart.",
    ] },
    features: [
      { title: "Start a lab, not a setup.", body: "Each lesson opens a live environment with the exercise in front of you." },
      { title: "Real-world challenges.", body: "Exercises like setting up Prometheus operators mirror the work engineers actually do." },
      { title: "AI Studio.", body: "Help that sits inside the learning flow instead of in another tab." },
    ],
    numbers: [{ value: "3", label: "Spaces: Courses, Labs, AI Studio" }],
    role: "Product manager (TODO verify)", contribution: "TODO(verify): describe your roadmap / product ownership at Poridhi.",
  },
  {
    slug: "988-colorado", name: "988", italic: "Colorado", tag: "Public mental health", group: "Public services", url: "https://www.988colorado.com/en", img: "site988",
    result: "support is on the line", resultBig: "24/7", resultNote: "free, immediate support — call, text or chat",
    logline: "Colorado's mental health line: call, text or chat 988, any time.",
    facts: [{ k: "Sector", v: "Public mental health" }, { k: "For", v: "Coloradans in distress" }, { k: "Languages", v: "English · Español" }, { k: "Channels", v: "Call · Text · Chat" }],
    what: { cap: "S", lead: "upport is on the line.", body: [
      "988 Colorado is the state's mental health line. The site has one job: get someone who is struggling to a human, fast — by call, text or live chat.",
      "Everything else — warning signs, resources, youth pages, a toolkit for partners — sits one calm step behind those three buttons.",
    ] },
    features: [
      { title: "Three ways in.", body: "Call, Text and Live Chat are the first thing on the page, side by side." },
      { title: "Bilingual by default.", body: "Text and chat are offered in English and Spanish, with a language switch up front." },
      { title: "Calm, plain words.", body: "Know-the-signs lists, short sentences and no clinical jargon for people on a hard day." },
    ],
    numbers: [{ value: "24/7", label: "Free, immediate support" }, { value: "3", label: "Ways to reach a person" }, { value: "2", label: "Languages" }],
    role: "Design lead (TODO verify)", contribution: "TODO(verify): describe your work on 988 Colorado (via Digital Gregg).",
  },
  {
    slug: "bustang", name: "Bustang", tag: "Public transit · CDOT", group: "Public services", url: "https://ridebustang.com/", img: "siteBustang",
    result: "discover more, drive less", resultBig: "4", resultNote: "services under one site: Bustang, Outrider, Snowstang and Pegasus",
    logline: "Colorado's state intercity bus — discover more, drive less.",
    facts: [{ k: "Sector", v: "Public transit" }, { k: "Operator", v: "Colorado DOT" }, { k: "For", v: "Commuters & travellers" }, { k: "Languages", v: "English · Español" }],
    what: { cap: "D", lead: "iscover more, drive less.", body: [
      "Bustang connects Colorado's cities, rural towns and ski country. The site has to work for a commuter on a phone at a rural stop as well as a tourist planning a ski trip.",
      "Trip planning and tickets lead; routes, alerts and a printable state map follow.",
    ] },
    features: [
      { title: "Plan My Trip.", body: "From, to, date — the shortest path from intent to a bus." },
      { title: "One brand, four services.", body: "Bustang, Outrider (rural), Snowstang (ski resorts) and Pegasus (shuttle) under one roof." },
      { title: "Built for every rider.", body: "A Spanish version and CDOT accessibility commitments for riders of every age." },
    ],
    numbers: [{ value: "4", label: "Services: Bustang, Outrider, Snowstang, Pegasus" }, { value: "2", label: "Languages" }],
    role: "PM / design lead (TODO verify)", contribution: "TODO(verify): describe your work on Bustang (via Digital Gregg) — e.g. trip planning and accessibility.",
  },
  {
    slug: "imentor", name: "iMentor", tag: "Nonprofit · college access", group: "Education", url: "http://imentor.org/", img: "siteImentor",
    result: "a champion for every student", resultBig: "74%", resultNote: "of iMentor students enrol in college vs 54% of similar students nationally — iMentor's figure",
    logline: "Every student deserves a champion.",
    facts: [{ k: "Sector", v: "Nonprofit · mentoring" }, { k: "For", v: "Students, mentors, donors" }, { k: "Cities", v: "NYC · Chicago · Baltimore" }, { k: "Since", v: "1999" }],
    what: { cap: "E", lead: "very student deserves a champion.", body: [
      "iMentor matches every 11th and 12th grade student in its partner high schools with a committed volunteer mentor, through to college.",
      "The site speaks to four audiences at once — students, mentors, donors and partners — and still leads with one human story.",
    ] },
    features: [
      { title: "Two clear asks.", body: "Become a Mentor and Donate sit together in the header — every page leads to one of them." },
      { title: "Proof in numerals.", body: "Big, honest figures about matches and college enrolment carry the argument." },
      { title: "Many doors in.", body: "Mentor community, Next Gen Leaders, Open Doors and partner programmes, each with its own path." },
    ],
    numbers: [{ value: "35,948", label: "Students matched since 1999 (iMentor)" }, { value: "74%", label: "Enrol in college vs 54% nationally (iMentor)" }, { value: "68%", label: "Will be first-generation college students (iMentor)" }],
    role: "Design (TODO verify)", contribution: "TODO(verify): describe your work on iMentor.",
  },
  {
    slug: "daffodil-international-university", name: "Daffodil", italic: "International University", tag: "Higher education", group: "Education", url: "https://daffodilvarsity.edu.bd/", img: "siteDiu",
    result: "beyond classrooms", resultBig: "55K+", resultNote: "graduates across 19 countries — DIU's figure",
    logline: "Beyond classrooms, we build futures.",
    facts: [{ k: "Sector", v: "Higher education" }, { k: "For", v: "Students, parents, alumni" }, { k: "Where", v: "Dhaka, Bangladesh" }, { k: "Programmes", v: "38 across 6 faculties" }],
    what: { cap: "B", lead: "eyond classrooms, we build futures.", body: [
      "Daffodil International University is one of Bangladesh's largest private universities. Its site serves prospective students, parents, faculty and a global alumni network at once.",
      "Finding a degree, estimating a scholarship and applying are the main road; research, events and portals branch off it.",
    ] },
    features: [
      { title: "Find your degree.", body: "38 programmes across 6 faculties, browsable by level and faculty." },
      { title: "Scholarship estimator.", body: "Up to 100% tuition coverage across 25+ categories, estimated before applying." },
      { title: "One front door, many portals.", body: "Student, parent, teacher and alumni portals behind a single navigation." },
    ],
    numbers: [{ value: "55K+", label: "Graduates in 19 countries (DIU)" }, { value: "38", label: "Programmes · 6 faculties (DIU)" }, { value: "100%", label: "Max scholarship, 25+ categories (DIU)" }],
    role: "Agentic PM (TODO verify)", contribution: "TODO(verify): describe your AI-first product work at DIU.",
  },
  {
    slug: "amelie", name: "Amélie", italic: "Company", tag: "Creative agency · cause marketing", group: "Brand", url: "https://www.ameliecompany.com/", img: "siteAmelie",
    result: "+32% traffic", resultBig: "+32%", resultNote: "traffic lift (TODO verify: your figure, period and source)",
    logline: "Good causes deserve good work.",
    facts: [{ k: "Sector", v: "Creative agency" }, { k: "For", v: "Cause-driven brands" }, { k: "Known for", v: "Altruism + business" }, { k: "Recognition", v: "AdAge Best Places to Work 2025" }],
    what: { cap: "G", lead: "ood causes deserve good work.", body: [
      "Amélie is a full-service creative agency that blends altruism and business. Its own site has to prove both at once: craft good enough to hire, and causes worth believing in.",
      "Work, services and the agency's DEIJ mission share equal billing with a showreel up front.",
    ] },
    features: [
      { title: "Work first.", body: "A video-led homepage and case studies lead; the pitch follows." },
      { title: "Mission in the nav.", body: "The DEIJ mission is a top-level page, not a footer link." },
      { title: "Findable.", body: "Search-friendly structure behind the reported traffic lift (TODO verify)." },
    ],
    numbers: [{ value: "+32%", label: "Traffic lift (TODO verify)" }, { value: "#1", label: "AdAge Best Places to Work 2025 (site badge)" }],
    role: "Design + web (TODO verify)", contribution: "TODO(verify): describe your work on Amélie.",
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
