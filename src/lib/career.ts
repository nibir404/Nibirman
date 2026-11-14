// Single source of truth for every word on the site.
// Edit here; every chapter (and the plain /list page) reads from this file.

export const profile = {
  name: "Imtiaz Ahmed",
  title: "Agentic Product Manager",
  city: "Dhaka",
  tz: "UTC+6",
  promise: "I turn AI agents into products people trust.",
  email: "nibirimtiaz1@gmail.com",
  cvUrl: "/cv.pdf",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
    { label: "Behance", href: "https://www.behance.net/" },
  ],
};

export const stats = [
  { value: "6+", label: "years shipping products" },
  { value: "+32%", label: "traffic lift, Amelie Company" },
  { value: "AA", label: "WCAG 2.1, RideBustang transit" },
  { value: "5", label: "sectors: Gov, AI, Ed, Health, Transit" },
];

export const chapters = [
  { id: "cover", label: "Cover" },
  { id: "who", label: "Who" },
  { id: "powerups", label: "Power-ups" },
  { id: "think", label: "How I think" },
  { id: "worlds", label: "Worlds" },
  { id: "volumes", label: "Volumes" },
  { id: "join", label: "Join" },
] as const;

export const powerUps = [
  {
    n: "01",
    title: "Product strategy",
    proof: "Owned the Poridhi.io roadmap and priorities; cut learner drop-off and shaped the investor story.",
    tone: "bg-cobalt text-paper",
  },
  {
    n: "02",
    title: "Agentic AI products",
    proof: "Shipping agentic features across DIU business units — agent drafts, humans approve.",
    tone: "bg-tang text-ink",
  },
  {
    n: "03",
    title: "UX research + design",
    proof: "From rural bus stops to crisis lines: research first, then design for the hardest day.",
    tone: "bg-paper text-ink",
  },
  {
    n: "04",
    title: "Design systems + a11y",
    proof: "WCAG 2.1 AA transit planner that works on one bar of signal.",
    tone: "bg-ink text-paper border-cream",
  },
];

export const loop = [
  { step: "Ask", img: "/anime/question.jpg", line: "Who is it for, and what happens to them if we get it wrong?", tone: "bg-tang text-ink" },
  { step: "Listen", img: "/anime/busstop.jpg", line: "Go where the users are. Bus stops, clinics, ministries.", tone: "bg-paper text-ink" },
  { step: "Build", img: "/anime/biscuit-scene.jpg", line: "Agent drafts the options. A human approves the one we ship.", tone: "bg-cobalt text-paper" },
  { step: "Measure", img: "/anime/team.jpg", line: "Ship, read the numbers with the team, then do it again.", tone: "bg-ink text-tang" },
];

export const worlds = [
  { name: "GovTech", sub: "LIMS · ministries", style: "bg-cobalt text-paper", ring: "ring-cream" },
  { name: "AI + EdTech", sub: "Poridhi.io · DIU", style: "bg-tang text-ink", ring: "ring-cream" },
  { name: "Health", sub: "988 Colorado", style: "bg-paper text-ink", ring: "ring-cobalt" },
  { name: "Transit", sub: "RideBustang", style: "bg-ink text-paper", ring: "ring-tang" },
  { name: "Food + Local Biz", sub: "Fuudy · Charlotte LED · Amelie", style: "bg-cream text-ink", ring: "ring-ink" },
];

export const teams = ["DIU", "Digital Gregg (USA)", "Poridhi", "SIMEC", "Tecognize"];

export type Volume = {
  slug: string;
  vol: string;
  name: string;
  tag: string;
  img: string;
  header: string;
  logline: string;
  problem: string;
  move: string;
  resultBig: string;
  result: string;
  role: string;
};

export const volumes: Volume[] = [
  {
    slug: "poridhi",
    vol: "01",
    name: "Poridhi",
    tag: "AI · EdTech",
    img: "/anime/ailab.jpg",
    header: "bg-cobalt text-paper",
    logline: "Cloud labs with zero setup. Students learn by doing.",
    problem: "Learners quit before their first lab ever booted.",
    move: "Owned the roadmap: zero-setup labs first, an AI helper for when they get stuck.",
    resultBig: "↓",
    result: "Lower drop-off and a clearer investor narrative.",
    role: "PM · roadmap owner",
  },
  {
    slug: "988-crisis",
    vol: "02",
    name: "988 Crisis",
    tag: "Health",
    img: "/anime/crisis.jpg",
    header: "bg-cobalt text-paper",
    logline: "Designing calm for people on their hardest day.",
    problem: "People in crisis can't parse dense, clinical pages.",
    move: "Trust and readability first: short lines, one action per screen.",
    resultBig: "Calm",
    result: "A crisis experience built for people under stress.",
    role: "Product design lead",
  },
  {
    slug: "ridebustang",
    vol: "03",
    name: "RideBustang",
    tag: "Transit · WCAG AA",
    img: "/anime/busstop.jpg",
    header: "bg-tang text-ink",
    logline: "Transit for every age, on one bar of signal.",
    problem: "Rural riders. One bar of signal. Every age.",
    move: "A light trip planner first. The map only on demand.",
    resultBig: "AA",
    result: "WCAG 2.1 compliant, built for weak networks.",
    role: "PM / design lead",
  },
  {
    slug: "lims",
    vol: "04",
    name: "LIMS",
    tag: "GovTech",
    img: "/anime/govtech.jpg",
    header: "bg-cobalt text-paper",
    logline: "Paper mountains, turned into one government platform.",
    problem: "Ministry records lived in folders and phone calls.",
    move: "Mapped every hand-off, then shipped one shared workflow.",
    resultBig: "1",
    result: "One platform instead of stacks of paper.",
    role: "Product designer → PM",
  },
  {
    slug: "fuudy",
    vol: "05",
    name: "Fuudy",
    tag: "Food · Local biz",
    img: "/anime/desk.jpg",
    header: "bg-cream text-ink",
    logline: "One ordering system across customer, rider and admin apps.",
    problem: "Three apps, three mental models, one hungry customer.",
    move: "One design system shared by customer, rider and admin.",
    resultBig: "+32%",
    result: "Traffic lift on the Amelie / Charlotte LED sites.",
    role: "Design + product",
  },
];

export const filmBeats = [
  { at: "0%", word: "IMTIAZ", img: "/anime/hero-sky.jpg", note: "Above the clouds" },
  { at: "25%", word: "QUESTIONS FIRST", img: "/anime/portrait.jpg", note: "The word cracks open" },
  { at: "55%", word: "BUILT FOR EVERYONE", img: "/anime/hero-busstop.jpg", note: "The camera lands" },
  { at: "85%", word: "SHIPPED.", img: "/anime/hero-team.jpg", note: "The party" },
];
