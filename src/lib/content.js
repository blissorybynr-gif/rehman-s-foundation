// All Rehman's Foundation copy lives here so you can edit text
// without touching layout code.

export const org = {
  name: "Rehman's Foundation",
  tagline: "Care. Empower. Transform.",
  email: "info@rehmansfoundation.org",
  altEmail: "rehmansfoundation@gmail.com",
  phone: "+92 300 1234567",
  address: "123 Community Road, Lahore, Pakistan",
  handle: "@rehmansfoundation",
  site: "www.rehmansfoundation.org",
};

export const mission =
  "Rehman's Foundation exists to restore what circumstance has taken away — a home for the orphaned, dignity for the aging, breath for a suffering planet, and hope for those pushed to the margins of survival. We work at the intersection of human compassion and environmental responsibility, delivering direct, tangible support to orphans and the elderly while championing grassroots environmental action — from reforestation to clean water access to cleaner streets — because we believe a society's true measure lies in how it treats its most vulnerable members and the earth that sustains them all.";

export const vision =
  "We envision a future where vulnerability is met with dignity, not indifference — where every orphaned child inherits opportunity instead of hardship, every elder ages in comfort surrounded by care, every neighborhood breathes cleaner air beneath trees we planted together, and every family struggling in silence finds a hand extended rather than turned away. Rehman's Foundation aspires to be the bridge between what is broken and what can be rebuilt — one life, one tree, one community at a time.";

export const values = [
  {
    title: "Compassion in Action",
    body: "We do not simply feel for those in need — we move. Every program we run is compassion translated into measurable, on-the-ground impact.",
  },
  {
    title: "Unwavering Integrity",
    body: "Trust is our currency. We operate with complete transparency in how resources are raised, allocated, and used, because those who give and those who receive both deserve honesty.",
  },
  {
    title: "Stewardship of the Earth",
    body: "We treat environmental care not as a side initiative but as a core obligation — recognizing that human dignity and ecological health are inseparable.",
  },
  {
    title: "Dignity Over Charity",
    body: "We reject the notion of helping from above. Our work is rooted in respect — empowering the people we serve rather than reducing them to recipients of pity.",
  },
  {
    title: "Radical Inclusivity",
    body: "Need has no religion, ethnicity, or background. Our doors, and our support, remain open to anyone who is struggling — without exception or prejudice.",
  },
  {
    title: "Sustainable Impact",
    body: "We design programs built to outlast a single donation cycle — favoring long-term community resilience over short-term relief.",
  },
  {
    title: "Selfless Service",
    body: "Our team and volunteers are bound by a shared conviction: that meaningful service asks for nothing in return but the chance to make a difference.",
  },
];

export const founders = [
  {
    name: "Noor ul Ain Usmani",
    role: "Founder & Chair",
    bio: "Leads the foundation's direction and the orphan sponsorship programs, and signs off on every quarterly transparency report.",
  },
  {
    name: "Humna Asif",
    role: "Co-founder, Programs",
    bio: "Runs elder care and poverty relief on the ground, from the Sunday visits to the monthly ration routes.",
  },
  {
    name: "Shiza Asif",
    role: "Co-founder, Environment & Outreach",
    bio: "Built the tree-planting and water cooler drives, and manages the volunteer community that keeps them running.",
  },
];

// The four causes the foundation is organised around.
export const causes = [
  {
    slug: "orphan-support",
    name: "Orphan Support",
    lead: "A roof, a reason, and someone who remembers your name.",
    blurb:
      "Direct sponsorship of education, food and healthcare for orphaned children, with updates sent back to the people funding it.",
  },
  {
    slug: "elder-care",
    name: "Old Age Home Support",
    lead: "Ageing should not mean being forgotten.",
    blurb:
      "Companionship, medical comfort and legacy work with elderly residents — because loneliness needs answering as much as expenses do.",
  },
  {
    slug: "environment",
    name: "Environmental Action",
    lead: "The earth is a vulnerable member too.",
    blurb:
      "Reforestation, clean drinking water in public places, and neighbourhood clean-ups run by volunteers month after month.",
  },
  {
    slug: "poverty-relief",
    name: "Poverty Relief",
    lead: "From aid to self-sufficiency.",
    blurb:
      "Monthly rations, winter warmth, and vocational training that moves families off assistance rather than onto it.",
  },
];

// Every campaign, grouped by cause.
export const campaigns = [
  {
    slug: "a-roof-a-reason",
    cause: "orphan-support",
    name: "A Roof, A Reason",
    summary:
      "Sponsor one child's education, food and healthcare every month, and receive periodic updates on how they are doing.",
    detail:
      "Donors are matched with a specific child rather than a general pool. Each sponsorship covers school fees and supplies, three meals a day, and routine healthcare. Every quarter we send the sponsor a progress note written with the child's guardian — report cards, health checks, and a short letter where the child is old enough to write one.",
    ask: "PKR 4,500 / month",
    recurring: true,
  },
  {
    slug: "festival-joy-drives",
    cause: "orphan-support",
    name: "Eid & Festival Joy Drives",
    summary:
      "New clothes, gifts and festive meals delivered to orphanages during the major holidays.",
    detail:
      "Twice a year, around Eid, we run a delivery drive across partner orphanages. Every child receives a new outfit, a wrapped gift chosen for their age, and a proper festival meal. Volunteers do the wrapping and the handover in person — the point is that a child opens a present that was meant for them specifically.",
    ask: "PKR 3,000 per child",
    recurring: false,
  },
  {
    slug: "dreams-on-paper",
    cause: "orphan-support",
    name: "Dreams on Paper",
    summary:
      "Children write about what they want to be when they grow up. We keep the letters, and we act on them.",
    detail:
      "Each year the children in our programs write a letter about the future they imagine. The letters guide where we direct scholarship funding — a child who writes about being a nurse gets pointed toward the science stream and the fees that come with it. With permission, some letters are shared publicly so donors understand exactly what they are funding.",
    ask: "Support a stream",
    recurring: false,
  },
  {
    slug: "adopt-a-grandparent",
    cause: "elder-care",
    name: "Adopt a Grandparent",
    summary:
      "A standing connection with one elderly resident — regular visits, calls, or letters.",
    detail:
      "Loneliness is the thing residents mention first, well ahead of money. We pair a volunteer or donor with one resident for at least six months. That means a visit or a phone call on a fixed schedule so it is something to count on. Volunteers are briefed beforehand on the resident's health, history and what they like to talk about.",
    ask: "Two hours a month",
    recurring: true,
  },
  {
    slug: "health-and-comfort-fund",
    cause: "elder-care",
    name: "Health & Comfort Fund",
    summary:
      "Medicines, wheelchairs, mattresses and the small comforts that decide whether ageing is bearable.",
    detail:
      "A pooled fund the partner homes can draw on directly for anything from a month of blood pressure medication to a replacement wheelchair cushion. Requests are logged and the spend is published in our quarterly report line by line.",
    ask: "PKR 2,000 and up",
    recurring: true,
  },
  {
    slug: "stories-worth-saving",
    cause: "elder-care",
    name: "Stories Worth Saving",
    summary:
      "We record elders telling their own life stories, and keep them.",
    detail:
      "Every Sunday, volunteers sit with residents and record what they want to pass on — the migration stories, the trades they learned, the jokes. Recordings are edited into a short series and a copy goes to the resident's family. Nobody is recorded without asking, and anyone can stop at any point.",
    ask: "Volunteer on Sundays",
    recurring: true,
  },
  {
    slug: "one-tree-one-name",
    cause: "environment",
    name: "One Tree, One Name",
    summary:
      "Plant a tree in someone's name — a birthday, an anniversary, a memorial.",
    detail:
      "You choose the name, we plant and tag the tree, and you get the location and a photo once it is in the ground. Saplings are native species chosen for the site, and they are watered and checked for the first two years rather than planted and abandoned.",
    ask: "PKR 1,200 per tree",
    recurring: false,
  },
  {
    slug: "cool-streets",
    cause: "environment",
    name: "Cool Streets Water Coolers",
    summary:
      "Public drinking water installed before summer, and maintained through it.",
    detail:
      "Each unit is installed with a local shopkeeper or mosque who agrees to look after it, with a filter change schedule we fund for the full season. Donors can have the unit plated with a name. Placement is decided by where people actually walk and wait, not by visibility.",
    ask: "PKR 25,000 per cooler",
    recurring: false,
  },
  {
    slug: "clean-up-days",
    cause: "environment",
    name: "Neighbourhood Clean-Up Days",
    summary:
      "A monthly volunteer clean-up in one neighbourhood, photographed before and after.",
    detail:
      "One Saturday a month, in a neighbourhood chosen by request from residents. We bring the bags, gloves and disposal arrangement. The before and after photos are published, partly to be honest about how much is left to do.",
    ask: "Half a Saturday",
    recurring: true,
  },
  {
    slug: "ration-for-a-family",
    cause: "poverty-relief",
    name: "Ration for a Family",
    summary:
      "A month of groceries for one household, delivered on a fixed date.",
    detail:
      "A standard package covering flour, rice, pulses, oil, tea and basics for a family of five. Households are enrolled for a defined period rather than indefinitely, and are reviewed with them at the end of it. Delivery is at a set date each month so families can plan around it.",
    ask: "PKR 6,000 / month",
    recurring: true,
  },
  {
    slug: "winter-warmth",
    cause: "poverty-relief",
    name: "Winter Warmth Drive",
    summary:
      "Blankets and warm clothing distributed before the cold arrives, not during it.",
    detail:
      "Collection runs through October and distribution happens in the first half of November. Donated clothing is sorted and anything unusable is recycled rather than passed on. New blankets are bought in bulk with cash donations.",
    ask: "PKR 1,800 per kit",
    recurring: false,
  },
  {
    slug: "skill-to-livelihood",
    cause: "poverty-relief",
    name: "Skill to Livelihood",
    summary:
      "Funded vocational training, followed until the person is actually earning.",
    detail:
      "We cover course fees and the tools or kit needed to start working — a sewing machine, a phone repair set, a driving licence. Participants stay in touch for a year afterwards so we can report honestly on how many reached steady income and how many did not.",
    ask: "PKR 35,000 per placement",
    recurring: false,
  },
  {
    slug: "40-days-of-rehman",
    cause: "all",
    name: "40 Days of Rehman",
    summary:
      "One small act of giving a day, for forty days, rotating across all four causes.",
    detail:
      "A daily giving challenge designed to be small enough to actually finish. Each day names one specific thing — a tree, a meal, an hour, a blanket — and you can give money or time. Participants get a daily prompt and a running total of what the group has done together.",
    ask: "From PKR 100 a day",
    recurring: false,
  },
  {
    slug: "volunteer-fridays",
    cause: "all",
    name: "Volunteer Fridays",
    summary:
      "A standing weekly volunteer day that rotates between the four causes.",
    detail:
      "Every Friday the volunteer community meets to review what happened that week, plan the next one, and take on assignments. It is the entry point for new volunteers — you can turn up to one without committing to anything further.",
    ask: "Every Friday",
    recurring: true,
  },
];

// The four recurring events that have their own brochure.
export const events = [
  {
    slug: "do-a-favour-to-yourself",
    name: "Do a Favour to Yourself",
    days: ["Mon", "Thu"],
    when: "Every Monday and Thursday",
    line: "Collect, prepare, distribute — a cooked meal handed over in person.",
    body: "Volunteers collect cooked food, groceries and essentials, sort and pack them, and distribute them to people who need a meal that day. The name is deliberate: the person serving gets as much out of it as the person served.",
    image: "/events/favour.jpg",
    cause: "poverty-relief",
  },
  {
    slug: "stories-worth-saving-event",
    name: "Stories Worth Saving",
    days: ["Sun"],
    when: "Every Sunday",
    line: "Sit with an elder. Listen properly. Keep what they tell you.",
    body: "A weekly visit to partner old age homes to talk, play a game, share activities, and record the life stories residents want preserved. The best way to preserve a story is to give it a listener.",
    image: "/events/stories.jpg",
    cause: "elder-care",
  },
  {
    slug: "volunteer-friday",
    name: "Volunteer Friday",
    days: ["Fri"],
    when: "Every Friday",
    line: "Meet, discuss, plan, act — the week gets decided here.",
    body: "The weekly gathering where volunteers review running projects, raise community needs, propose new ideas and agree an action plan. One day a week, a lifetime of impact.",
    image: "/events/volunteer.jpg",
    cause: "all",
  },
  {
    slug: "eids-joy",
    name: "Eid's Joy",
    days: [],
    when: "Both Eids, every year",
    line: "A wrapped gift, a new outfit, and a proper meal for children who expect neither.",
    body: "A seasonal campaign of love and kindness. Volunteers distribute gifts and festive clothing at partner orphanages, and stay for the meal. Small acts, big happiness.",
    image: "/events/eid.jpg",
    cause: "orphan-support",
  },
];

// Placeholder impact figures — replace with real numbers when you have them.
export const impact = [
  { figure: "412", label: "children sponsored through school" },
  { figure: "1,860", label: "trees planted and watered past year two" },
  { figure: "9,240", label: "meals served on Mondays and Thursdays" },
  { figure: "37", label: "public water coolers running" },
  { figure: "268", label: "elders visited every Sunday" },
  { figure: "94", label: "families moved to steady income" },
];

export const faqs = [
  {
    q: "Where does my donation actually go?",
    a: "Every donation is tagged to the campaign you chose and appears as a line in our quarterly report. Administrative costs are capped and published alongside program spending.",
  },
  {
    q: "Can I volunteer without donating?",
    a: "Yes. Volunteer Friday is the easiest starting point — turn up once and decide afterwards. Most of our programs need hours more than they need money.",
  },
  {
    q: "Do you only help people of one faith or background?",
    a: "No. Need has no religion, ethnicity or background, and our support is open to anyone struggling, without exception.",
  },
  {
    q: "Can I sponsor a specific child or elder?",
    a: "Yes — A Roof, A Reason pairs you with one child, and Adopt a Grandparent pairs you with one resident. Both involve a real commitment over time rather than a one-off gift.",
  },
  {
    q: "Is my donation tax deductible?",
    a: "Rehman's Foundation is a registered non-profit and issues a receipt for every donation. Speak to your own tax advisor about how it applies to you.",
  },
];

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/campaigns", label: "Campaigns" },
  { href: "/events", label: "Events" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function campaignsByCause(causeSlug) {
  return campaigns.filter((c) => c.cause === causeSlug);
}

export function getCampaign(slug) {
  return campaigns.find((c) => c.slug === slug);
}

export function getCause(slug) {
  return causes.find((c) => c.slug === slug);
}
