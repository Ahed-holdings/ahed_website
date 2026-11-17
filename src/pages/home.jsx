import { PageMeta } from "@/components/layout/page-meta";
import { Image } from "@/components/image";
import {
  Building2,
  ChartColumn,
  Compass,
  House,
  Monitor,
  Rocket,
  Search,
  Settings,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import Grainient from "@/components/backgrounds/grainient";
import { ChallengeStack } from "@/components/sections/challenge-stack";
import { CtaBand } from "@/components/sections/cta-band";
import { ServicesShowcase } from "@/components/sections/service-stack";
import {
  ButtonLink,
  delay,
  Eyebrow,
  Feature,
  IconCard,
  MethodSteps,
  principles,
  Section,
} from "@/components/ui";
import { services } from "@/lib/site";

const challenges = [
  { icon: Target, title: "Unclear direction", text: "Align business priorities, resources and execution." },
  {
    icon: ChartColumn,
    title: "Inconsistent performance",
    text: "Improve productivity, profitability and accountability.",
  },
  { icon: Users, title: "People and structure gaps", text: "Build stronger teams, roles and leadership practices." },
  { icon: Settings, title: "Inefficient processes", text: "Simplify workflows and strengthen operational controls." },
  { icon: Monitor, title: "Underused technology", text: "Connect digital tools to real business needs." },
  {
    icon: Wallet,
    title: "Limited financial visibility",
    text: "Strengthen reporting, cash-flow visibility and decision support.",
  },
];

const audiences = [
  {
    icon: TrendingUp,
    title: "Growing SMEs",
    text: "Businesses that need stronger management systems, clearer accountability and scalable processes.",
  },
  {
    icon: House,
    title: "Family-owned businesses",
    text: "Organisations seeking professionalisation, improved governance and a more structured approach to growth.",
  },
  {
    icon: Building2,
    title: "Established companies",
    text: "Businesses pursuing operational improvement, organisational change or digital transformation.",
  },
  {
    icon: Rocket,
    title: "New ventures and expansion projects",
    text: "Promoters who need help building a business model, setting up functions and preparing for market entry.",
  },
];

/**
 * Hero background colours, dark to light along the gradient (angle 55° → light end top right, away from the text).
 * Navy only: shades of the brand navy, all dark enough for the white and grey-blue hero text.
 * Hex because the WebGL component can't read CSS variables.
 */
const heroGradient = [
  "#06142A", // deeper than navy
  "#0B1F3B", // --inverse (executive navy)
  "#12284A",
  "#1A3560",
  "#244677", // lightest navy, top right
];

export default function HomePage() {
  return (
    <>
      <PageMeta />
      {/* Full-screen navy hero, text only, vertically centred over the animated gradient */}
      <section
        data-inverse
        className="under-header relative isolate flex min-h-svh overflow-hidden bg-inverse text-inverse-foreground"
      >
        {/* Animated grain gradient behind the hero. The navy section background shows if WebGL2 is unavailable. */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <Grainient
            colors={heroGradient}
            angle={55}
            flow={0.8}
            silk={0.35}
            grainAmount={0.03}
            type="linear"
            bands={1}
            softness={1}
            scale={1}
            speed={1}
            grainSize={1}
            grainAnimated
            contrast={1}
            saturation={1}
            variation={0}
            interactive
            stir={1}
            clickSwirl
            intro
            lightMode={false}
          />
        </div>
        {/* [@media(max-height:44rem)]: short phones (e.g. 375×667) get tighter spacing so the buttons stay in view */}
        <div className="@container container-page grid content-center gap-7 py-14 sm:py-20 short:gap-5 short:py-10 [@media(max-height:44rem)]:gap-5 [@media(max-height:44rem)]:py-8">
          {/* Non-breaking space before each "·" so a separator never starts a wrapped line */}
          <Eyebrow className="animate-fade-up">
            Business advisory{" "}· Transformation{" "}· Growth
          </Eyebrow>
          {/* Two lines, one sentence each (from sm; on phones each sentence still starts its own line but may wrap).
              The space between the spans keeps the sentences apart for screen readers and copy-paste. */}
          <h1 className="animate-fade-up text-hero-title [animation-delay:80ms]">
            <span className="block sm:whitespace-nowrap">Want to Build a Stronger Business?</span>{" "}
            <span className="block sm:whitespace-nowrap">
              We Prepares you to <span className="whitespace-nowrap text-inverse-accent">Next Level.</span>
            </span>
          </h1>
          <p className="max-w-[52ch] animate-fade-up text-lead-lg text-inverse-muted [animation-delay:160ms]">
            We work with business leaders to sharpen strategy, strengthen performance and develop the people,
            processes and systems needed for sustainable growth.
          </p>
          <div className="flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
            <ButtonLink href="/contact" variant="primary">
              Discuss Your Business
            </ButtonLink>
            <ButtonLink href="/services" variant="ghostLight" arrow={false}>
              Explore Our Services
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* One screen tall, content centred (grows on phones where text + stack need more room) */}
      <Section tone="muted" className="flex min-h-svh items-center">
        <div className="container-page grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div data-reveal className="grid content-start gap-5">
            <Eyebrow>The challenge</Eyebrow>
            <h2 className="text-h2">Growth brings opportunity. It also brings complexity.</h2>
            <p className="text-muted-foreground">
              As businesses expand, the systems and practices that worked in the early stages may no longer be enough.
              Decisions become more complex, responsibilities overlap, costs rise and management visibility can weaken.
            </p>
            <p>
              We help leadership teams identify the underlying issues, prioritise the right changes and develop
              practical ways to improve performance.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="sm:hidden">Tap or swipe the cards to see each challenge.</span>
            </p>
          </div>
          {/* Card stack of the six challenges; it scales itself to fit this box */}
          <div data-reveal style={delay(100)} className="h-[360px] sm:h-[460px] lg:h-[500px]">
            <ChallengeStack items={challenges} />
          </div>
        </div>
      </Section>

      {/* Heading on top (pinned under the header from md while the cards stack), service cards stacking below */}
      <Section>
        <div className="container-page">
          <ServicesShowcase
            eyebrow="Our services"
            title="Connected capabilities. One business objective."
            services={services}
          >
            <p>
              Business challenges rarely exist in isolation. A growth strategy may require a new operating model,
              stronger leadership, better financial controls and the right technology.
            </p>
            <p className="text-foreground">
              Our advisory capabilities bring these elements together to help businesses move from identifying problems
              to implementing meaningful improvements.
            </p>
          </ServicesShowcase>
        </div>
      </Section>

      <Section tone="inverse">
        {/* Compact: heading on top, the four audiences in one row from lg (2 × 2 from sm) */}
        <div className="container-page grid gap-10 md:gap-12">
          <div data-reveal className="grid gap-8">
            <div className="grid max-w-3xl gap-[18px]">
              <Eyebrow>Who we work with</Eyebrow>
              <h2 className="text-h2">Advisory for businesses at different stages of growth</h2>
            </div>
            {/* <div className="relative aspect-[460/360] overflow-hidden rounded-media">
              <Image
                src="/img/managed.webp"
                alt=""
                fill
                className="object-cover"
              />
            </div> */}
          </div>
          <div data-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
              <IconCard key={a.title} icon={a.icon} title={a.title} compact>
                {a.text}
              </IconCard>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="container-page">
          <div className="mb-10 grid items-end gap-5 md:mb-14 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
            <div data-reveal className="grid gap-[18px]">
              <Eyebrow>How we create value</Eyebrow>
              <h2 className="text-h2">From understanding the problem to making progress</h2>
            </div>
            <div data-reveal style={delay(100)} className="md:justify-self-end">
              <ButtonLink href="/how-we-work" variant="secondary">
                See how we work
              </ButtonLink>
            </div>
          </div>
          <MethodSteps icons={[Search, Compass, Workflow, ChartColumn]} />
        </div>
      </Section>

      {/* Compact on request: tighter padding, smaller gaps, denser principle list */}
      <Section tone="inverse" compact>
        <div className="container-page grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div data-reveal className="grid content-start gap-5">
            <Eyebrow>Why work with us?</Eyebrow>
            <h2 className="text-h2">Advice built to be applied, not simply presented.</h2>
            <p className="text-lead text-inverse-muted">
              We help businesses make the transition from ambition to structured, sustainable performance.
            </p>
            <div>
              <ButtonLink href="/about" variant="light">
                About our approach
              </ButtonLink>
            </div>
          </div>
          <div data-stagger className="grid gap-x-10 sm:grid-cols-2">
            {principles.map((p) => (
              <Feature key={p.title} title={p.title} compact>
                {p.text}
              </Feature>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
