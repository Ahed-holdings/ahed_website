# Services content and image brief

Current content of the six services on the website (copied from `src/lib/site.js`, Nov 2026), with a brief for
generating a matching photo for each. Edit the text in `src/lib/site.js`, not here: this file is a snapshot.

---

## Image requirements (all six services)

**Where each service photo appears.** One photo per service is reused in all of these places, so it has to crop well:

| Place | Shape on screen |
|---|---|
| Home page, "Our services" card stack (photo on the right, desktop) | about 4:3 to 1:1 |
| Home page, same card on phones (photo across the top) | wide band, about 2.4:1 |
| Services page grid card | 5:3 (384 × 232) |
| Service page hero (beside the heading) | about 5:4, taller on large screens |
| Service page "Desired outcome" panel | wide, about 16:9 |
| Insights page article cards (reused for now) | 5:3 |

**Deliver:** one landscape master per service, **at least 2400 × 1600 px (3:2)**, JPG or WebP. Keep the main subject
in the **centre third** with calm space around it, so every crop above still shows it. Same file name as now
(e.g. `strategy.jpg`) to swap it in without code changes; the files live in `public/img/`.

**Style (all six together, so they read as one set):**
- Real-looking business photography, editorial, natural light. Not illustration, not 3D, not stock-cliché
  (no handshakes in front of white backgrounds, no thumbs up, no staged laughing).
- Modern offices and workplaces; professionals of mixed ages and backgrounds, business or smart-casual dress.
- Colour: cool neutrals with **navy** tones and touches of **warm gold / brass** (lamps, wood, metal fittings) to suit the
  site's navy & gold palette. **No green-dominant scenes** and nothing vibrant or neon (client's request).
- No readable text, logos, brand names or real company screens; anything on screens should be abstract charts.
- Calm, confident, practical mood: people working, not posing.

**Prompt template:** `[subject from the brief below], editorial business photography, natural window light, modern
office, navy and warm brass colour accents, shallow depth of field, realistic, no text, no logos, 3:2 landscape`

---

## 1. Strategy Advisory
**File:** `public/img/strategy.jpg` · **Page:** `/services/strategy-advisory`

**Card tags:** Business strategy · Growth planning · Market expansion · Operating models

**Summary:** Define the direction, identify growth opportunities and translate business ambitions into clear
priorities and executable plans.

**Page heading:** Set a Clear Direction for Sustainable Growth.

**What we offer:**
- Corporate and business strategy
- Business model development
- Market entry and geographic expansion
- Growth and commercial strategy
- Product and channel strategy
- Strategic planning and prioritisation
- Organisation and operating model alignment
- Business establishment and re-engineering
- Family business professionalisation and governance support

**Questions we help answer:**
- Where should we focus our growth?
- Which products, markets or customers deserve priority?
- Are our resources aligned with our objectives?
- How do we turn a strategic plan into accountable action?

**Desired outcome:** A clear direction, prioritised initiatives, defined responsibilities and a practical roadmap.

**Image brief:** A small leadership team (3–4 people) around a table in a boardroom with a city view, one person
mapping priorities on a whiteboard or glass wall (abstract boxes and arrows, no readable words). Focused, decisive.
*Alt idea:* senior adviser and business owner reviewing a roadmap together by a large window.

---

## 2. Performance Improvement
**File:** `public/img/performance.jpg` · **Page:** `/services/performance-improvement`

**Card tags:** Process redesign · Cost optimisation · Productivity · Performance management

**Summary:** Improve the way the business operates by addressing inefficiencies, strengthening processes and making
performance more measurable.

**Page heading:** Make Your Business Work Better.

**What we offer:**
- Business process review and redesign
- Operational efficiency
- Cost and productivity improvement
- Sales process improvement
- Supply chain and procurement review
- KPI and performance management
- SOP development
- Management reporting and MIS
- Business re-engineering
- Continuous improvement programmes

**Desired outcome:** Better visibility, less process friction, stronger controls and improved use of resources.

**Image brief:** A manager and team leader reviewing a process-flow board or KPI dashboard on a large screen in an
operations office (abstract charts only), with a tidy warehouse or production floor softly visible through glass.
*Alt idea:* two people walking a production line with a tablet, discussing improvements.

---

## 3. People & Change
**File:** `public/img/people.jpg` · **Page:** `/services/people-and-change`

**Card tags:** Organisation design · HR strategy · Leadership · Change management

**Summary:** Align organisational structure, leadership, talent and workplace practices with the needs of the
business.

**Page heading:** Build the Organisation Your Strategy Needs.

**What we offer:**
- Organisation structure and role clarity
- HR strategy and policy development
- Manpower planning
- Performance management
- Leadership development
- Talent acquisition process design
- Compensation and incentive frameworks
- Employee engagement and retention
- Learning and development
- Change management and culture
- HR process improvement

**Desired outcome:** Clear accountability, capable teams, stronger leadership practices and better alignment between
people and business goals.

**Image brief:** A leadership workshop: a facilitator at a flip chart with sticky notes (no readable text) and a
diverse group of managers engaged in discussion around a table. Warm, collaborative, purposeful.
*Alt idea:* a one-to-one coaching conversation between two professionals in a quiet meeting room.

---

## 4. Digital & Innovation
**File:** `public/img/digital.jpg` · **Page:** `/services/digital-and-innovation`

**Card tags:** Digital strategy · ERP/CRM advisory · Automation · Innovation

**Summary:** Identify where technology, automation and new ways of working can solve business problems and unlock new
opportunities.

**Page heading:** Make Technology Work for Your Business.

**What we offer:**
- Digital maturity assessment
- Digital transformation roadmap
- ERP/CRM requirements and selection advisory
- Business process automation
- MIS and dashboard design
- Workflow digitisation
- AI opportunity assessment
- Technology implementation coordination
- Digital adoption and change support
- Innovation and new business model development

**Desired outcome:** Better-connected processes, improved information flow, reduced manual effort and more effective
use of technology.

**Image brief:** A business owner and a digital adviser at a desk with two monitors showing abstract dashboards and a
workflow diagram, in a modern office; the feel is practical business technology, not sci-fi (no glowing brains,
holograms or neon). *Alt idea:* a small team testing a new system together on a large screen.

---

## 5. Finance & Accounting
**File:** `public/img/finance.jpg` · **Page:** `/services/finance-and-accounting`

**Card tags:** Financial planning · Management reporting · Cost control · Accounting processes

**Summary:** Strengthen financial discipline, reporting and management information to support informed decisions and
business control.

**Page heading:** Turn Financial Information into Better Decisions.

**What we offer:**
- Budgeting and forecasting
- Management accounts and MIS
- Cost and profitability analysis
- Cash-flow planning
- Working capital management
- Financial controls
- Finance process redesign
- Accounts receivable and payable processes
- Management reporting
- Finance system and ERP requirements
- Virtual finance management support

**Desired outcome:** Better financial visibility, disciplined cash management, clearer profitability and more reliable
decision support.

**Important note on the page:** Our advisory, management accounting and operational finance support is distinct from
statutory audit, reserved professional work and regulated tax or legal services. Any such services are delivered
through appropriately qualified professionals.

**Image brief:** A finance manager and a business owner reviewing a printed management report and a laptop with
abstract charts at a desk, calculator and pen nearby; calm, detail-focused. Avoid anything that suggests auditing or
tax forms (see the note above). *Alt idea:* close-up of hands annotating a cash-flow chart, faces softly out of focus.

---

## 6. Managed Services
**File:** `public/img/managed.jpg` · **Page:** `/services/managed-services`

**Card tags:** Finance operations · HR administration · MIS support · Process coordination

**Summary:** Help businesses organise and operate selected support functions through defined processes, appropriate
expertise and clear service standards.

**Page heading:** Reliable Business Support, Built Around Your Needs.

**Intro on the page:**
- *Title:* Managed services can mean different things. Here is what it means with us.
- *Statement:* The ongoing management or coordination of agreed business-support processes, using defined
  deliverables, reporting and service standards.
- *Text:* Offerings depend on the delivery capability in place. We only list services we can genuinely deliver,
  either directly or through a reliable professional network.

**Potential offerings:**
- Management reporting and MIS preparation
- Finance operations coordination
- Accounting process support
- HR administration and payroll coordination
- SOP and compliance-calendar administration
- CRM and sales-reporting support
- Vendor and procurement coordination
- Management review and action tracking
- Business process monitoring
- Outsourced functional coordination

**How each service is defined:**
- *What the service covers:* The agreed scope of the process or function we manage or coordinate.
- *What you provide:* The information, access and inputs needed from your team.
- *What we perform:* The activities carried out by us or our delivery team.
- *How often it is delivered:* A defined frequency — weekly, monthly or as agreed.
- *Reports and outputs:* The reports, dashboards or outputs you receive.
- *What remains with you:* Responsibilities that stay with the client or its statutory professionals.

**Desired outcome:** Dependable support functions without requiring the client to build every capability internally.

**Image brief:** A calm, organised business-support team at workstations in a bright open office, one coordinator
reviewing a weekly report with a colleague; steady, reliable, routine done well. (Not a call centre with headsets.)
*Alt idea:* a team lead and client checking a monthly reporting pack together.

---

## After generating
1. Save each image over the current file in `public/img/` with the same name (or keep the old ones and change the
   `image` paths in `src/lib/site.js`).
2. Check each on the home page card stack, the Services page, its service page hero and "Desired outcome" panel, at
   desktop and phone widths, to be sure the subject survives every crop.
3. Update `docs/images.md` with where the new images came from (and their licence).
