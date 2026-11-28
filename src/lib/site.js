import { Briefcase, ChartColumn, ClipboardList, Repeat, Shield, Users } from "lucide-react";

export const site = {
  /** Company name (copyright, business details for search engines). */
  name: "Ahed",
  /** The line under the name in the logo. */
  slogan: "Always ahead",
  /** Name + line as shown in page titles and link previews: "About Us | Ahed – Always Ahead". */
  brand: "Ahed – Always Ahead",
  /**
   * Site address, used for sitemap.xml and robots.txt (vite.config.js). On Netlify builds the project's main address
   * (env URL, the custom domain once connected) takes over, so this is only the fallback for local builds.
   */
  url: "https://ahed.in",
  tagline: "Helping businesses make the transition from ambition to structured, sustainable performance.",
  /** Default meta description (home page and any page without its own) */
  description:
    "Ahed helps business owners in Kochi, Kottayam and Ahmedabad sharpen strategy, strengthen performance and build the people, processes and systems for growth.",
  email: "ceo@ahed.in",
  phone: "+91 91880 11117",
  phoneHref: "tel:+919188011117",
  /** WhatsApp number, digits only with country code (wa.me links). Contact-form leads that prefer WhatsApp go here. */
  whatsapp: "919188011117",
  /** Cities the firm works from / serves (footer, contact band, contact page, and areaServed for search engines). */
  locations: ["Kochi", "Kottayam", "Ahmedabad"],
  location: "Kochi · Kottayam · Ahmedabad",
};

export const mainNav = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/industries", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

/**
 * About page "Our team": three people, no photos (by request). Order = order on the page.
 * TODO: replace the placeholders with the client's names, roles and short profiles (2–3 sentences each).
 */
export const team = [
  {
    name: "[Team member name]",
    role: "[Role / title]",
    bio: "[Short profile: professional background, years of experience and the areas they lead on. Two or three sentences.]",
  },
  {
    name: "[Team member name]",
    role: "[Role / title]",
    bio: "[Short profile: professional background, years of experience and the areas they lead on. Two or three sentences.]",
  },
  {
    name: "[Team member name]",
    role: "[Role / title]",
    bio: "[Short profile: professional background, years of experience and the areas they lead on. Two or three sentences.]",
  },
];

export const companyNav = [
  { href: "/about", label: "About Us" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/industries", label: "Industries & Challenges" },
  { href: "/insights", label: "Insights & Resources" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    slug: "strategy-advisory",
    title: "Strategy Advisory",
    image: "/img/strategy.webp",
    /** Photo description for search engines and screen readers (alt text; not shown on the page). */
    imageAlt: "Leadership team in a business strategy meeting with market trend dashboards",
    tags: "Business strategy · Growth planning · Market expansion · Operating models",
    summary:
      "Define the direction, identify growth opportunities and translate business ambitions into clear priorities and executable plans.",
    heroTitle: "Set a Clear Direction for Sustainable Growth.",
    offerings: [
      "Corporate and business strategy",
      "Business model development",
      "Market entry and geographic expansion",
      "Growth and commercial strategy",
      "Product and channel strategy",
      "Strategic planning and prioritisation",
      "Organisation and operating model alignment",
      "Business establishment and re-engineering",
      "Family business professionalisation and governance support",
    ],
    questions: [
      "Where should we focus our growth?",
      "Which products, markets or customers deserve priority?",
      "Are our resources aligned with our objectives?",
      "How do we turn a strategic plan into accountable action?",
    ],
    outcome: "A clear direction, prioritised initiatives, defined responsibilities and a practical roadmap.",
  },
  {
    slug: "performance-improvement",
    title: "Performance Improvement",
    image: "/img/performance.webp",
    /** Photo description for search engines and screen readers (alt text; not shown on the page). */
    imageAlt: "Team reviewing business performance KPIs on a dashboard",
    tags: "Process redesign · Cost optimisation · Productivity · Performance management",
    summary:
      "Improve the way the business operates by addressing inefficiencies, strengthening processes and making performance more measurable.",
    heroTitle: "Make Your Business Work Better.",
    offerings: [
      "Business process review and redesign",
      "Operational efficiency",
      "Cost and productivity improvement",
      "Sales process improvement",
      "Supply chain and procurement review",
      "KPI and performance management",
      "SOP development",
      "Management reporting and MIS",
      "Business re-engineering",
      "Continuous improvement programmes",
    ],
    outcome: "Better visibility, less process friction, stronger controls and improved use of resources.",
  },
  {
    slug: "people-and-change",
    title: "People & Change",
    image: "/img/people.webp",
    /** Photo description for search engines and screen readers (alt text; not shown on the page). */
    imageAlt: "Learning and development workshop on organisation and process planning",
    tags: "Organisation design · HR strategy · Leadership · Change management",
    summary:
      "Align organisational structure, leadership, talent and workplace practices with the needs of the business.",
    heroTitle: "Build the Organisation Your Strategy Needs.",
    offerings: [
      "Organisation structure and role clarity",
      "HR strategy and policy development",
      "Manpower planning",
      "Performance management",
      "Leadership development",
      "Talent acquisition process design",
      "Compensation and incentive frameworks",
      "Employee engagement and retention",
      "Learning and development",
      "Change management and culture",
      "HR process improvement",
    ],
    outcome:
      "Clear accountability, capable teams, stronger leadership practices and better alignment between people and business goals.",
  },
  {
    slug: "digital-and-innovation",
    title: "Digital & Innovation",
    image: "/img/digital.webp",
    /** Photo description for search engines and screen readers (alt text; not shown on the page). */
    imageAlt: "Team discussing digital transformation and ERP dashboards",
    tags: "Digital strategy · ERP/CRM advisory · Automation · Innovation",
    summary:
      "Identify where technology, automation and new ways of working can solve business problems and unlock new opportunities.",
    heroTitle: "Make Technology Work for Your Business.",
    offerings: [
      "Digital maturity assessment",
      "Digital transformation roadmap",
      "ERP/CRM requirements and selection advisory",
      "Business process automation",
      "MIS and dashboard design",
      "Workflow digitisation",
      "AI opportunity assessment",
      "Technology implementation coordination",
      "Digital adoption and change support",
      "Innovation and new business model development",
    ],
    outcome:
      "Better-connected processes, improved information flow, reduced manual effort and more effective use of technology.",
  },
  {
    slug: "finance-and-accounting",
    title: "Finance & Accounting",
    image: "/img/finance.webp",
    /** Photo description for search engines and screen readers (alt text; not shown on the page). */
    imageAlt: "Finance professional reviewing a balance sheet and profit and loss statement",
    tags: "Financial planning · Management reporting · Cost control · Accounting processes",
    summary:
      "Strengthen financial discipline, reporting and management information to support informed decisions and business control.",
    heroTitle: "Turn Financial Information into Better Decisions.",
    offerings: [
      "Budgeting and forecasting",
      "Management accounts and MIS",
      "Cost and profitability analysis",
      "Cash-flow planning",
      "Working capital management",
      "Financial controls",
      "Finance process redesign",
      "Accounts receivable and payable processes",
      "Management reporting",
      "Finance system and ERP requirements",
      "Virtual finance management support",
    ],
    outcome:
      "Better financial visibility, disciplined cash management, clearer profitability and more reliable decision support.",
    note: {
      title: "Important",
      text: "Our advisory, management accounting and operational finance support is distinct from statutory audit, reserved professional work and regulated tax or legal services. Any such services are delivered through appropriately qualified professionals.",
    },
  },
  {
    slug: "managed-services",
    title: "Managed Services",
    image: "/img/managed.webp",
    /** Photo description for search engines and screen readers (alt text; not shown on the page). */
    imageAlt: "Business support team managing reporting and operations at their desks",
    tags: "Finance operations · HR administration · MIS support · Process coordination",
    summary:
      "Help businesses organise and operate selected support functions through defined processes, appropriate expertise and clear service standards.",
    heroTitle: "Reliable Business Support, Built Around Your Needs.",
    intro: {
      title: "Managed services can mean different things. Here is what it means with us.",
      statement:
        "The ongoing management or coordination of agreed business-support processes, using defined deliverables, reporting and service standards.",
      text: "Offerings depend on the delivery capability in place. We only list services we can genuinely deliver, either directly or through a reliable professional network.",
    },
    offeringsEyebrow: "Potential offerings",
    offerings: [
      "Management reporting and MIS preparation",
      "Finance operations coordination",
      "Accounting process support",
      "HR administration and payroll coordination",
      "SOP and compliance-calendar administration",
      "CRM and sales-reporting support",
      "Vendor and procurement coordination",
      "Management review and action tracking",
      "Business process monitoring",
      "Outsourced functional coordination",
    ],
    definitions: [
      {
        icon: ClipboardList,
        title: "What the service covers",
        text: "The agreed scope of the process or function we manage or coordinate.",
      },
      { icon: Users, title: "What you provide", text: "The information, access and inputs needed from your team." },
      { icon: Briefcase, title: "What we perform", text: "The activities carried out by us or our delivery team." },
      { icon: Repeat, title: "How often it is delivered", text: "A defined frequency — weekly, monthly or as agreed." },
      { icon: ChartColumn, title: "Reports and outputs", text: "The reports, dashboards or outputs you receive." },
      {
        icon: Shield,
        title: "What remains with you",
        text: "Responsibilities that stay with the client or its statutory professionals.",
      },
    ],
    outcome: "Dependable support functions without requiring the client to build every capability internally.",
  },
];

export const serviceHref = (slug) => `/services/${slug}`;
