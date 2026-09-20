import type { Localized } from "@/i18n/localized";

export interface CurriculumTopic {
  num: string;
  title: Localized;
}

export const curriculumTopics: CurriculumTopic[] = [
  {
    num: "01",
    title: {
      de: "Einführung – Psychedelika = Wundermittel?",
      en: "Introduction – are psychedelics a miracle cure?",
    },
  },
  {
    num: "02",
    title: {
      de: "Geschichte: Von der Urzeit bis zur Psychedelischen Renaissance",
      en: "History: from prehistory to the psychedelic renaissance",
    },
  },
  {
    num: "03",
    title: {
      de: "Stoffgruppen & Indikationen",
      en: "Substance classes & indications",
    },
  },
  {
    num: "04",
    title: {
      de: "Wirkmechanismen: Neuroplastizität, Default Mode Network, BDNF",
      en: "Mechanisms of action: neuroplasticity, default mode network, BDNF",
    },
  },
  {
    num: "05",
    title: {
      de: "Serotonin & der 5-HT2A-Rezeptor – Vergleich zu klassischen Psychopharmaka",
      en: "Serotonin & the 5-HT2A receptor – compared with conventional psychiatric drugs",
    },
  },
  {
    num: "06",
    title: {
      de: "Macrodosing: Aufbau einer Therapiesitzung – Set, Setting, Integration",
      en: "Macrodosing: how a therapy session is built – set, setting, integration",
    },
  },
  {
    num: "07",
    title: {
      de: "Microdosing: Hype der Leistungsgesellschaft – oder ist da was dran?",
      en: "Microdosing: hype of a performance culture – or is there something to it?",
    },
  },
  {
    num: "08",
    title: {
      de: "Phänomenologie: Mystical Experience und Ego-Tod",
      en: "Phenomenology: mystical experience and ego death",
    },
  },
  {
    num: "09",
    title: {
      de: "Integration – Wie macht man das genau?",
      en: "Integration – how does it actually work?",
    },
  },
  {
    num: "10",
    title: { de: "Risiken & Nebenwirkungen", en: "Risks & side effects" },
  },
  {
    num: "11",
    title: { de: "Methodische Schwierigkeiten", en: "Methodological difficulties" },
  },
  {
    num: "12",
    title: { de: "Ethische Herausforderungen", en: "Ethical challenges" },
  },
  {
    num: "13",
    title: {
      de: "Ayahuasca: Kulturelle Aneignung & indigene Perspektive",
      en: "Ayahuasca: cultural appropriation & indigenous perspectives",
    },
  },
  {
    num: "14",
    title: {
      de: "Psychedelika & Naturverbundenheit – Rettung in der Klimakrise?",
      en: "Psychedelics & connectedness to nature – a hope in the climate crisis?",
    },
  },
  {
    num: "15",
    title: {
      de: "Breathwork & andere substanzfreie bewusstseinsverändernde Erfahrungen",
      en: "Breathwork & other substance-free altered states",
    },
  },
];

export const nicheTopics: Localized[] = [
  {
    de: "Psychedelika & Empfänglichkeit für Manipulation",
    en: "Psychedelics & susceptibility to manipulation",
  },
  { de: "Psychedelika & Bindungsstile", en: "Psychedelics & attachment styles" },
  {
    de: "Einfluss von Musik auf die psychedelische Erfahrung",
    en: "How music shapes the psychedelic experience",
  },
  { de: "DMT & Alien-Erfahrungen", en: "DMT & entity encounters" },
  {
    de: "Mystical Experience / Ego-Tod & narzisstische Tendenzen",
    en: "Mystical experience / ego death & narcissistic tendencies",
  },
  {
    de: "Psychedelika & Kreativität bei Ingenieur*innen (Studie aus den 60ern)",
    en: "Psychedelics & creativity in engineers (a study from the 1960s)",
  },
  {
    de: "Psychedelika & Internal Family Systems",
    en: "Psychedelics & Internal Family Systems",
  },
  {
    de: "Kommt die Wirkung auch im nahen Umfeld an?",
    en: "Do the effects reach the people around you?",
  },
  { de: "KI als Integrationstool", en: "AI as a tool for integration" },
  {
    de: "Erfüllt der Trend sein Ziel – Verbindung in der Gesellschaft wiederherstellen?",
    en: "Is the trend achieving its aim – restoring connection in society?",
  },
];
