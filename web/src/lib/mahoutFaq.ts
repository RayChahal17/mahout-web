export type MahoutFaqItem = {
  id: string;
  question: string;
  answer: string;
  featured?: boolean;
};

export type MahoutFaqCategory = {
  id: string;
  title: string;
  description?: string;
  items: MahoutFaqItem[];
};

/** Homepage spotlight — also listed in full FAQ under their categories. */
export const FEATURED_FAQ_IDS = [
  "replace-notes-calendar",
  "north-star-chatbot",
  "silent-commits",
  "path-vs-task-list",
] as const;

export const MAHOUT_FAQ_CATEGORIES: MahoutFaqCategory[] = [
  {
    id: "what-mahout-is",
    title: "What Mahout is",
    description:
      "Mahout connects future vision, goals, actions, emotions, reflection, memory, and guidance into one calm life system.",
    items: [
      {
        id: "replace-notes-calendar",
        question: "Does Mahout replace my notes or calendar?",
        answer:
          "No. Mahout is the alignment layer above them: direction, action design, reflection, pattern awareness, and AI guidance.",
        featured: true,
      },
      {
        id: "one-sentence",
        question: "What is Mahout, in one sentence?",
        answer:
          "Mahout is an AI life operating system that turns your future vision into daily direction by connecting Mountain (goals), Path (actions), Elephant (mood), Mahout (reflection), Brain (memory), and North Star (guidance) into one living loop.",
      },
      {
        id: "not-just-productivity",
        question: "Is Mahout just another productivity app?",
        answer:
          "No. A task app tracks actions. A habit app tracks streaks. A journal stores reflections. A mood app tracks emotions. A chatbot answers questions. Mahout connects those pieces so direction, execution, emotional weather, meaning, memory, and guidance reinforce each other instead of living in separate tabs.",
      },
    ],
  },
  {
    id: "north-star-trust",
    title: "North Star and trust",
    description: "How guidance works, what North Star is, and what it will never do behind your back.",
    items: [
      {
        id: "north-star-chatbot",
        question: "Is North Star just a chatbot?",
        answer:
          "No. North Star is your ideal future self formed from future vision, then grounded by goals, actions, moods, reflection, memory, patterns, and receipts.",
        featured: true,
      },
      {
        id: "silent-commits",
        question: "Does North Star silently commit actions for me?",
        answer:
          "No. Mahout stays trust-first. No silent commits, no hidden action changes, and no slipping things into your day behind your back.",
        featured: true,
      },
      {
        id: "future-vision-origin",
        question: "How does North Star form from future vision?",
        answer:
          "You begin by naming the life you are building — work, health, relationships, freedom, identity, peace, and impact. Mahout helps shape that into North Star: the ideal future version of you that can remind you what matters and guide present-day choices with more context over time.",
      },
      {
        id: "know-everything",
        question: "Does North Star automatically know everything about me?",
        answer:
          "No. North Star becomes more useful as it connects to goals, actions, moods, reflection, memory, and patterns — but it should not feel magical or omniscient. Learned reads can stay provisional until evidence or your confirmation makes them durable.",
      },
      {
        id: "mentor-impersonation",
        question: "Does Mentor mode impersonate real people?",
        answer:
          "No. Mentor mode uses chosen influences as lenses — standards, questions, and perspectives — not impersonation. It should feel like guidance through admired frames, not a fake version of someone real.",
      },
      {
        id: "therapy-claims",
        question: "Is Mahout therapy or mental health treatment?",
        answer:
          "No. Mahout is not therapy, medical care, mental health treatment, or crisis support. Reflective modes can help you slow down and understand a moment, but Mahout should never be positioned as a clinical substitute.",
      },
    ],
  },
  {
    id: "five-elements",
    title: "Five elements and Path",
    description: "How direction, execution, emotion, reflection, and memory fit together.",
    items: [
      {
        id: "path-vs-task-list",
        question: "How is Path different from a normal task list?",
        answer:
          "Path is built for execution clarity. It separates sessions from checkoffs, keeps the day legible, and helps turn motion into consistency.",
        featured: true,
      },
      {
        id: "mountain-role",
        question: "What is Mountain for?",
        answer:
          "Mountain holds direction: Future Goals, Today Goals, deadlines, reviews, and the few lanes that deserve attention today. It keeps the day connected to the life you named instead of becoming an endless backlog.",
      },
      {
        id: "elephant-role",
        question: "What is Elephant for?",
        answer:
          "Elephant helps you notice emotional weather — mood logs, check-ins, and trends — so North Star can read the tone behind action. Your emotions are part of the map, not background noise.",
      },
      {
        id: "mahout-role",
        question: "What is Mahout reflection for?",
        answer:
          "Mahout is the reflective space where you slow down and tell the truth. Journaling and reflection turn the day into meaning, not just completion, and useful insights can carry into memory for future guidance.",
      },
      {
        id: "brain-role",
        question: "What is the Brain?",
        answer:
          "The Brain is North Star's memory and intelligence layer: voice and boundaries, identity and vision, mentors and influences, memories, learned signals, patterns, and trends. Owned sections stay user-owned; derived intelligence stays evidence-aware.",
      },
      {
        id: "connected-loop",
        question: "How do the five elements connect?",
        answer:
          "Vision becomes North Star. Mountain turns direction into goals. Path turns goals into action. Repeated proof can become habits and longer arcs can reveal behaviors. Elephant adds mood context. Mahout adds reflection. Brain stores memory and patterns. North Star uses the loop for letters, reviews, and guidance.",
      },
    ],
  },
  {
    id: "habits-letters-modes",
    title: "Habits, letters, and modes",
    items: [
      {
        id: "habits-21-66",
        question: "What do 21 days and 66 days mean in Mahout?",
        answer:
          "After consistent Path-backed repetition, action can begin to read as a habit around 21 days. Longer consistency can help deeper behavior patterns emerge around 66 days. Mahout presents these as progression signals grounded in receipts — not as guaranteed science or instant identity change.",
      },
      {
        id: "letters-reviews",
        question: "What are morning letters, evening letters, and weekly reviews?",
        answer:
          "They are ritual reads written from receipts: goals, actions, moods, reflections, habits, behaviors, trends, and patterns. Morning can open with direction. Evening can close the loop honestly. Weekly review can connect the week into a story you can act on.",
      },
      {
        id: "conversation-modes",
        question: "What are North Star conversation modes?",
        answer:
          "Modes are lenses, not separate bots: Auto, Work Focus, Analytic, Reflective, Motivator, and Mentor change how North Star meets a moment while staying grounded in the same future-self direction and the same trust rules.",
      },
    ],
  },
  {
    id: "free-pro-credits",
    title: "Free, Pro, and North Star Credits",
    items: [
      {
        id: "free-vs-pro",
        question: "What is the difference between Free and Pro?",
        answer:
          "Free keeps a useful daily foundation: Mountain, Path, Elephant, and Mahout basics, starter North Star Credits, and focused previews where the product allows. Pro deepens the intelligence layer: more monthly credits, fuller Brain continuity, trends and patterns, habits and behaviors depth, and richer letters and reviews.",
      },
      {
        id: "north-star-credits",
        question: "What are North Star Credits?",
        answer:
          "North Star Credits are used for live North Star replies and deeper on-demand intelligence. They are not used for Path actions, Mountain goals, Elephant mood logs, Mahout journaling, reading saved memories, or existing letters. Pro refills monthly; Free includes a one-time starter balance.",
      },
      {
        id: "cancel-subscription",
        question: "Can I cancel Pro anytime?",
        answer:
          "Yes. Subscriptions should stay straightforward: you can cancel through the normal Play Store subscription controls. Mahout should not hide cancellation or make leaving feel like a fight.",
      },
    ],
  },
  {
    id: "privacy-launch",
    title: "Privacy, memory, and launch",
    items: [
      {
        id: "memory-control",
        question: "Can I control what Mahout remembers?",
        answer:
          "Yes. Memory should stay visible and controllable. You should be able to understand what is owned, what is derived, and what should not return if you delete or hide it. Premium intelligence should feel legible, not mysterious.",
      },
      {
        id: "privacy-posture",
        question: "How does Mahout approach privacy?",
        answer:
          "Mahout is built trust-first: calm intelligence with user control, receipts instead of vague motivation, and privacy that feels engineered rather than bolted on. See the Privacy page for the current policy details as launch approaches.",
      },
      {
        id: "android-launch",
        question: "When is Mahout available on Android?",
        answer:
          "Mahout is preparing for Android launch. Join the waitlist on the homepage for early access updates. Availability, pricing, and store details may evolve during beta — the site will stay aligned with what the app actually ships.",
      },
      {
        id: "get-help",
        question: "Where do I go for support?",
        answer:
          "Email hello@mahout.app for access questions, account help, or launch support. The Support page uses the same calm channel.",
      },
    ],
  },
];

export const ALL_FAQ_ITEMS: MahoutFaqItem[] = MAHOUT_FAQ_CATEGORIES.flatMap(
  (category) => category.items
);

export const FEATURED_FAQ_ITEMS: MahoutFaqItem[] = FEATURED_FAQ_IDS.flatMap((id) => {
  const item = ALL_FAQ_ITEMS.find((faq) => faq.id === id);
  return item ? [item] : [];
});
