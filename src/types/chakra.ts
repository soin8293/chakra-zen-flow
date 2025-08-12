export interface Chakra {
  id: string;
  name: string;
  sanskritName: string;
  color: string;
  position: number;
  symbol: string;
  description: string;
  traits: string[];
  physicalAssociations: string[];
  affirmations: string[];
  element: string;
  location: string;
}

export const chakras: Chakra[] = [
  {
    id: 'root',
    name: 'Root Chakra',
    sanskritName: 'Muladhara',
    color: 'chakra-root',
    position: 1,
    symbol: '🔴',
    description: 'Grounding, security, and survival',
    traits: ['Stability', 'Security', 'Grounding', 'Physical Needs'],
    physicalAssociations: ['Base of spine', 'Legs', 'Feet', 'Bones'],
    affirmations: ['I am safe', 'I belong', 'I am grounded'],
    element: 'Earth',
    location: 'Base of spine'
  },
  {
    id: 'sacral',
    name: 'Sacral Chakra',
    sanskritName: 'Svadhisthana',
    color: 'chakra-sacral',
    position: 2,
    symbol: '🟠',
    description: 'Creativity, sexuality, and emotions',
    traits: ['Creativity', 'Sexuality', 'Emotions', 'Pleasure'],
    physicalAssociations: ['Lower abdomen', 'Reproductive organs', 'Kidneys'],
    affirmations: ['I embrace my creativity', 'I honor my emotions', 'I am passionate'],
    element: 'Water',
    location: 'Lower abdomen'
  },
  {
    id: 'solar',
    name: 'Solar Plexus Chakra',
    sanskritName: 'Manipura',
    color: 'chakra-solar',
    position: 3,
    symbol: '🟡',
    description: 'Personal power, confidence, and control',
    traits: ['Confidence', 'Personal Power', 'Control', 'Self-esteem'],
    physicalAssociations: ['Upper abdomen', 'Stomach', 'Liver', 'Digestive system'],
    affirmations: ['I am confident', 'I have personal power', 'I am in control'],
    element: 'Fire',
    location: 'Upper abdomen'
  },
  {
    id: 'heart',
    name: 'Heart Chakra',
    sanskritName: 'Anahata',
    color: 'chakra-heart',
    position: 4,
    symbol: '💚',
    description: 'Love, compassion, and connection',
    traits: ['Love', 'Compassion', 'Connection', 'Empathy'],
    physicalAssociations: ['Heart', 'Lungs', 'Arms', 'Circulatory system'],
    affirmations: ['I love and am loved', 'My heart is open', 'I forgive'],
    element: 'Air',
    location: 'Center of chest'
  },
  {
    id: 'throat',
    name: 'Throat Chakra',
    sanskritName: 'Vishuddha',
    color: 'chakra-throat',
    position: 5,
    symbol: '🔵',
    description: 'Communication, truth, and expression',
    traits: ['Communication', 'Truth', 'Expression', 'Authenticity'],
    physicalAssociations: ['Throat', 'Neck', 'Thyroid', 'Mouth'],
    affirmations: ['I speak my truth', 'I express myself clearly', 'I am heard'],
    element: 'Sound',
    location: 'Throat'
  },
  {
    id: 'thirdEye',
    name: 'Third Eye Chakra',
    sanskritName: 'Ajna',
    color: 'chakra-third-eye',
    position: 6,
    symbol: '🟣',
    description: 'Intuition, wisdom, and spiritual insight',
    traits: ['Intuition', 'Wisdom', 'Insight', 'Psychic abilities'],
    physicalAssociations: ['Forehead', 'Eyes', 'Brain', 'Pineal gland'],
    affirmations: ['I trust my intuition', 'I see clearly', 'I am wise'],
    element: 'Light',
    location: 'Between eyebrows'
  },
  {
    id: 'crown',
    name: 'Crown Chakra',
    sanskritName: 'Sahasrara',
    color: 'chakra-crown',
    position: 7,
    symbol: '🟣',
    description: 'Spirituality, enlightenment, and cosmic connection',
    traits: ['Spirituality', 'Enlightenment', 'Unity', 'Higher consciousness'],
    physicalAssociations: ['Top of head', 'Brain', 'Nervous system'],
    affirmations: ['I am connected to the divine', 'I am one with the universe', 'I am enlightened'],
    element: 'Thought',
    location: 'Top of head'
  }
];

export interface MeditationSession {
  chakraId: string;
  duration: number; // in minutes
  isActive: boolean;
  timeRemaining: number; // in seconds
  phase: 'inhale' | 'exhale';
}

export interface UserProfile {
  totalMinutesMeditated: number;
  currentStreak: number;
  longestStreak: number;
  favoritChakra: string;
  sessionsCompleted: number;
  bookmarks: string[]; // Array of article IDs
  readingHistory: string[]; // Array of article IDs
}

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  content: ArticleSection[];
  readTime: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  relatedTopics: string[]; // Array of article IDs
  tags: string[];
  lastUpdated: string;
  featured?: boolean;
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string;
  hyperlinks?: HyperLink[];
}

export interface HyperLink {
  text: string;
  targetId: string; // Article ID for mini-article
  type: 'article' | 'mini-article';
}

export interface MiniArticle {
  id: string;
  title: string;
  content: string;
  relatedArticles: string[]; // Full article IDs
}

export type ArticleCategory = 
  | 'core-concepts'
  | 'practices' 
  | 'science'
  | 'healing'
  | 'history'
  | 'psychology'
  | 'techniques';

export interface Bookmark {
  articleId: string;
  dateBookmarked: string;
  category: 'to-read' | 'favorites' | 'recently-viewed';
  notes?: string;
}