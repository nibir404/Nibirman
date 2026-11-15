// Every word on the site lives here.

export const profile = {
  name: "Imtiaz Ahmed",
  role: "AI Product Architect",
  email: "nibirimtiaz1@gmail.com",
  city: "Dhaka, Bangladesh",
  tagline: "Building intelligent products and meaningful digital experiences — from Dhaka, for the world.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" }, // TODO(verify)
    { label: "GitHub", href: "https://github.com/nibir404" },
    { label: "Email", href: "mailto:nibirimtiaz1@gmail.com" },
  ],
};

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/ai-lab", label: "AI Lab" },
  { href: "/product-gtm", label: "Product & GTM" },
  { href: "/engineering", label: "Engineering" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
];

export const navBlurbs: Record<string, { blurb: string; img: string }> = {
  "/work": { blurb: "Products, systems and experiences — clearly labelled by status.", img: "/art/act-2-archivist.jpg" },
  "/ai-lab": { blurb: "Experiments in agentic systems and AI-native interfaces.", img: "/art/act-5-maker.jpg" },
  "/product-gtm": { blurb: "Strategy that moves a product forward.", img: "/art/act-3-voyager.jpg" },
  "/engineering": { blurb: "Turning product thinking into buildable systems.", img: "/art/act-1-apprentice.jpg" },
  "/research": { blurb: "Better questions create better products.", img: "/art/act-4-teacher.jpg" },
  "/about": { blurb: "I think in systems. I build around people.", img: "/art/portrait-houndstooth.jpg" },
};

export const crafts = [
  { n: "01", key: "Strategy", title: "Product Strategy", body: "Turning opportunities into clear directions, business models, roadmaps and decisions.", img: "/art/act-1-apprentice.jpg" },
  { n: "02", key: "AI Systems", title: "AI & Intelligent Systems", body: "AI-native products, intelligent agents, automation and human–AI collaboration.", img: "/art/act-5-maker.jpg" },
  { n: "03", key: "Design", title: "Product Design & Experience", body: "Intuitive experiences, product ecosystems, design systems and interaction models.", img: "/art/portrait-studio.jpg" },
  { n: "04", key: "Engineering", title: "Product Engineering", body: "Technical architecture, functional requirements, prototypes and development direction.", img: "/art/act-2-archivist.jpg" },
  { n: "05", key: "Growth", title: "Growth & Go-to-Market", body: "Positioning, market opportunity, adoption and sustainable business growth.", img: "/art/act-3-voyager.jpg" },
];

export type Status = "Concept" | "In build" | "Exploration" | "Shipped";

export type Venture = {
  slug: string;
  name: string;
  status: Status;
  category: string;
  filter: string;
  tags: string[];
  img: string;
  line: string;
  vision: string;
  areas: string[];
  challenge: [string, string];
  layers: { label: string; items: string[]; highlight?: string }[];
  gate: string[];
};

export const ventures: Venture[] = [
  {
    slug: "biscuit",
    name: "Biscuit / Puku Bots",
    status: "Concept",
    category: "AI · Agentic Systems",
    filter: "AI & Intelligent",
    tags: ["AI Agents", "Multi-Agent", "Architecture"],
    img: "/art/act-5-maker.jpg",
    line: "A coordinated workforce of agents, not a single assistant.",
    vision: "Exploring a new way to work with AI through specialised agents, collaborative intelligence and task-oriented workflows.",
    areas: ["Specialised AI agents", "Multi-agent collaboration", "Intelligent task execution", "Agent orchestration", "Human–AI interaction"],
    challenge: ["One assistant can answer.", "It can't run a team."],
    layers: [
      { label: "Interface", items: ["Web workspace", "CLI", "Chat", "Mobile"] },
      { label: "Orchestration", items: ["Orchestrator", "Task planner", "Context broker"], highlight: "Orchestrator" },
      { label: "Agent workforce", items: ["Researcher", "Strategist", "Builder", "Reviewer"], highlight: "Reviewer" },
      { label: "Tools + memory", items: ["project_memory.md", "vector_store", "tool_registry", "permissions"] },
    ],
    gate: ["Approve plan", "Allow / ask / deny tools", "Sign off output", "Rewind checkpoint"],
  },
  {
    slug: "business-brain",
    name: "Business Brain",
    status: "In build",
    category: "Enterprise SaaS · ERP · BI",
    filter: "Enterprise & SaaS",
    tags: ["ERP", "Business Intelligence", "Enterprise UX"],
    img: "/art/act-2-archivist.jpg",
    line: "One connected brain for the whole business.",
    vision: "A unified business management ecosystem connecting operational functions, processes and organisational intelligence.",
    areas: ["Enterprise resource planning", "Business operations", "Integrated modules", "Operational intelligence", "Decision support"],
    challenge: ["Every department has a tool.", "Nobody has the whole picture."],
    layers: [
      { label: "Experience", items: ["Executive cockpit", "Ops workspace", "Mobile approvals"] },
      { label: "Intelligence", items: ["Insight engine", "Forecasts", "Alerts"], highlight: "Insight engine" },
      { label: "Modules", items: ["Finance", "HR", "Inventory", "Sales"] },
      { label: "Data", items: ["unified_ledger", "event_stream", "roles_permissions"] },
    ],
    gate: ["Role-based access", "Audit trail", "Approval chains"],
  },
  {
    slug: "let-go",
    name: "LET-GO",
    status: "Concept",
    category: "Mobility · Marketplace",
    filter: "Marketplaces",
    tags: ["Marketplace", "Mobility", "Strategy"],
    img: "/art/act-3-voyager.jpg",
    line: "Every way to move, one marketplace.",
    vision: "A mobility marketplace connecting transportation options through one platform and flexible pricing models.",
    areas: ["Multi-category transport", "Ride-hailing", "Hybrid pricing", "Marketplace operations", "Scalable mobility architecture"],
    challenge: ["Riders juggle five apps.", "Drivers juggle five more."],
    layers: [
      { label: "Apps", items: ["Rider", "Driver", "Fleet", "Admin"] },
      { label: "Marketplace", items: ["Matching", "Hybrid pricing", "Dispatch"], highlight: "Hybrid pricing" },
      { label: "Categories", items: ["Bike", "CNG", "Car", "Micro-bus"] },
      { label: "Platform", items: ["payments", "maps_routing", "trust_safety"] },
    ],
    gate: ["Safety checks", "Fare transparency", "Dispute resolution"],
  },
  {
    slug: "omnia",
    name: "Omnia",
    status: "Exploration",
    category: "AI Operating System",
    filter: "AI & Intelligent",
    tags: ["AI OS", "Agentic Workflows", "Systems"],
    img: "/art/act-1-apprentice.jpg",
    line: "An operating system where agents, apps and tools share one context.",
    vision: "An AI operating system exploring how agents, applications, tools and workflows can operate in one environment.",
    areas: ["AI-native environments", "Intelligent orchestration", "Context-aware workflows", "Unified experiences", "Human–AI collaboration"],
    challenge: ["Apps don't talk to each other.", "Agents shouldn't have to ask."],
    layers: [
      { label: "Shell", items: ["Intent bar", "Spaces", "Notifications"] },
      { label: "Kernel", items: ["Context graph", "Agent scheduler", "Policies"], highlight: "Context graph" },
      { label: "Agents + apps", items: ["Mail", "Docs", "Code", "Calendar"] },
      { label: "Substrate", items: ["memory", "tool_bus", "identity"] },
    ],
    gate: ["Consent per app", "Reversible actions", "Activity log"],
  },
];

export const experience = [
  { org: "Tecognize", role: "UI/UX Designer", period: "Oct 2021 – Jul 2023", start: 2021.8, end: 2023.55, place: "On-site",
    points: ["Design research and competitor analysis.", "Product specifications and design best practices.", "Digital and print designs, user storyboards.", "New products and improved experiences."] },
  { org: "SIMEC", role: "UI/UX Designer · GovTech", period: "Jul 2023 – Jul 2024", start: 2023.55, end: 2024.55, place: "On-site",
    points: ["Led design direction from idea to prototype to final UI.", "Turned business ideas into usable experiences with PMs and developers.", "Shipped dashboards, assets and system flows.", "Designed scalable UX patterns."] },
  { org: "Poridhi.io", role: "Product & UX Designer", period: "Jun 2024 – Aug 2025", start: 2024.45, end: 2025.65, place: "Remote · Part-time",
    points: ["Shaped roadmaps and priorities from behaviour and business needs.", "Lab-based learning across video, Markdown, CLI, IDE and cloud tools.", "Flows that reduced task drop-off.", "Pitch decks and narratives for investors."] },
  { org: "Digital Gregg", role: "Senior UI/UX Designer", period: "Jul 2024 – May 2026", start: 2024.55, end: 2026.4, place: "Remote · USA",
    points: ["Research insights turned into decisions that cut friction and lift conversion.", "End-to-end experience design across multiple products.", "UX strategy aligned with roadmaps; decisions defended with data.", "Mentored junior and mid-level designers."] },
  { org: "Daffodil International University", role: "Senior Product Designer", period: "Jun 2026 – Present", start: 2026.45, end: 2027, place: "Dhaka",
    points: ["Product design strategy across business units.", "Cross-functional leadership with product, engineering, marketing and executives.", "AI-first product experiences.", "Built and mentored designers and design engineers."] },
];

export const clients = [
  { n: "01", name: "Amelie Company", tag: "Lead gen · SEO · Conversion", metric: "+32%", img: "/works/amelie.jpg", overview: "High-conversion website experiences focused on search visibility, clarity and lead generation." },
  { n: "02", name: "Charlotte LED Pros", tag: "Redesign · Local services", metric: "", img: "/works/feluda.jpg", overview: "A full UX/UI overhaul focused on quote submissions and local lead generation." },
  { n: "03", name: "988 Colorado Crisis", tag: "Accessibility · IA · Public service", metric: "", img: "/works/988-colorado.jpg", overview: "A landing experience that builds trust for people seeking urgent help." },
  { n: "04", name: "Fuudy", tag: "Mobile · Multi-role marketplace", metric: "", img: "/works/puku.jpg", overview: "Mobile-first ordering across customer, rider and admin dashboards." },
  { n: "05", name: "Ridebustang", tag: "Transit · WCAG 2.1 AA", metric: "AA", img: "/works/bustang.jpg", overview: "A public transit web app with trip planning, routes and ticketing." },
  { n: "06", name: "Poridhi.io", tag: "EdTech · Cloud labs", metric: "", img: "/works/poridhi.jpg", overview: "An end-to-end learning system with zero-setup cloud labs." },
  { n: "07", name: "LIMS", tag: "GovTech · Enterprise UX", metric: "", img: "/works/diu.jpg", overview: "One platform for labour identities and employment history across ministries." },
];

export const approach = [
  { n: "01", t: "Understand", d: "Understand the problem before proposing a solution." },
  { n: "02", t: "Validate", d: "Validate the opportunity through research and evidence." },
  { n: "03", t: "Define", d: "Define the product around user and business value." },
  { n: "04", t: "Architect", d: "Architect the experience and technical direction." },
  { n: "05", t: "Iterate", d: "Build, test, learn and continuously improve." },
];

export const labAreas = [
  { t: "Agentic AI", d: "Systems that plan, delegate, use tools and execute." },
  { t: "Multi-agent collaboration", d: "Specialised agents sharing context to coordinate complex work." },
  { t: "Human–AI interaction", d: "Understandable, controllable, trustworthy." },
  { t: "AI-native interfaces", d: "Interfaces that adapt to intent, not rigid flows." },
  { t: "AI for business", d: "Operations, productivity and decision-making." },
];

export const experiments = [
  { id: "EXP.01", name: "Biscuit", state: "Running" },
  { id: "EXP.02", name: "Puku Bots", state: "Running" },
  { id: "EXP.03", name: "Omnia", state: "Paused" },
  { id: "EXP.04", name: "AI IDE explorations", state: "Sketch" },
  { id: "EXP.05", name: "Personal AI systems", state: "Research" },
];

export const gtm = [
  { t: "Opportunity Discovery", d: "Customer problems, market gaps, competitive landscapes and business opportunities." },
  { t: "Product Definition", d: "Vision, value propositions, BRDs, PRDs, specifications and roadmaps." },
  { t: "Business Modeling", d: "Customer value connected to monetisation, feasibility and sustainable models." },
  { t: "Competitive Intelligence", d: "Strategic gaps and defensible differentiation." },
  { t: "Go-to-Market", d: "Positioning, messaging, segments, launch priorities and adoption." },
];

export const engineeringAreas = [
  "Product architecture & module definition",
  "Functional & non-functional requirements",
  "System workflows & user journeys",
  "API & integration considerations",
  "AI agent architecture & orchestration",
  "Design systems & component architecture",
  "Technical documentation & specs",
  "Developer experience & handoff",
];

export const essays = [
  "The Future of AI-Native Products",
  "Designing for Autonomous Agents",
  "Why Most AI Interfaces Feel the Same",
  "Ephemeral UI & Adaptive Interfaces",
  "Human-Centered AI Experiences",
  "Product Strategy in an AI-First World",
  "Building Scalable Design Systems",
  "UX Research Beyond Usability Testing",
  "The Relationship Between DX and UX",
  "From Product Concepts to Viable Businesses",
];

export const lenses = [
  { t: "User", q: "Is this genuinely useful?" },
  { t: "Business", q: "Is this commercially viable?" },
  { t: "Design", q: "Is this intuitive and meaningful?" },
  { t: "Engineering", q: "Can this be built and scaled?" },
  { t: "Strategy", q: "Does this create a sustainable advantage?" },
];

export const interests = ["AI & Machine Learning", "Product Strategy", "UX Research", "Design Systems", "Human–AI Interaction", "SaaS", "Agentic Workflows", "Digital Transformation", "Business Architecture", "Product Leadership"];

export const topics = ["AI Product Development", "Strategy & Consulting", "UX & Product Design", "Enterprise Transformation", "AI Research", "Product Architecture", "Partnership"];
