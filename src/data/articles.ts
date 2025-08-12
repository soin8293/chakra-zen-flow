import { Article, MiniArticle } from "@/types/chakra";

export const articles: Article[] = [
  // Core Concepts
  {
    id: 'chakra-system-overview',
    title: 'The Complete Chakra System',
    category: 'core-concepts',
    content: [
      {
        id: 'intro',
        title: 'Introduction to Chakras',
        content: 'The chakra system represents seven main energy centers within the human body, each governing specific physical, emotional, and spiritual aspects of our being. The word "chakra" comes from Sanskrit, meaning "wheel" or "disk," referring to the spinning energy centers that regulate the flow of life force energy (prana) throughout our bodies.',
        hyperlinks: [
          { text: 'prana', targetId: 'prana-life-force', type: 'mini-article' },
          { text: 'Sanskrit', targetId: 'sanskrit-origins', type: 'mini-article' }
        ]
      },
      {
        id: 'seven-centers',
        title: 'The Seven Main Chakras',
        content: 'Each chakra corresponds to specific physical locations, colors, elements, and psychological themes. Starting from the base of the spine (Root Chakra) and moving upward to the crown of the head (Crown Chakra), these energy centers work together to maintain our overall well-being and spiritual development.',
        hyperlinks: [
          { text: 'energy centers', targetId: 'energy-anatomy', type: 'article' },
          { text: 'spiritual development', targetId: 'spiritual-evolution', type: 'mini-article' }
        ]
      },
      {
        id: 'balancing',
        title: 'Chakra Balancing',
        content: 'When chakras are balanced and aligned, energy flows freely, resulting in physical health, emotional stability, and spiritual clarity. Imbalances can manifest as physical symptoms, emotional blockages, or spiritual disconnection. Various practices including meditation, yoga, sound healing, and crystal therapy can help restore balance.',
        hyperlinks: [
          { text: 'meditation', targetId: 'chakra-meditation-guide', type: 'article' },
          { text: 'sound healing', targetId: 'sound-therapy', type: 'article' },
          { text: 'crystal therapy', targetId: 'crystal-healing', type: 'article' }
        ]
      }
    ],
    readTime: 8,
    difficulty: 'beginner',
    relatedTopics: ['energy-anatomy', 'aura-layers', 'kundalini-awakening'],
    tags: ['chakras', 'energy', 'spirituality', 'wellness'],
    lastUpdated: '2024-01-15',
    featured: true
  },
  {
    id: 'energy-anatomy',
    title: 'Understanding Energy Anatomy',
    category: 'core-concepts',
    content: [
      {
        id: 'subtle-body',
        title: 'The Subtle Body System',
        content: 'Beyond our physical body exists a complex energy anatomy consisting of chakras, nadis (energy channels), and the aura. This subtle body system governs the flow of life force energy and directly impacts our physical, emotional, and spiritual well-being.',
        hyperlinks: [
          { text: 'nadis', targetId: 'energy-channels', type: 'mini-article' },
          { text: 'aura', targetId: 'aura-layers', type: 'article' }
        ]
      },
      {
        id: 'energy-flow',
        title: 'How Energy Flows',
        content: 'Energy flows through our system in specific patterns and pathways. The main channel (sushumna nadi) runs along the spine, while two complementary channels (ida and pingala) spiral around it. Understanding these patterns helps us work more effectively with meditation and healing practices.',
        hyperlinks: [
          { text: 'sushumna nadi', targetId: 'central-channel', type: 'mini-article' },
          { text: 'ida and pingala', targetId: 'lunar-solar-channels', type: 'mini-article' }
        ]
      }
    ],
    readTime: 12,
    difficulty: 'intermediate',
    relatedTopics: ['chakra-system-overview', 'kundalini-awakening', 'pranayama-breathing'],
    tags: ['energy', 'anatomy', 'nadis', 'subtle body'],
    lastUpdated: '2024-01-10'
  },
  {
    id: 'kundalini-awakening',
    title: 'Kundalini: The Serpent Power',
    category: 'core-concepts',
    content: [
      {
        id: 'what-is-kundalini',
        title: 'Understanding Kundalini Energy',
        content: 'Kundalini is often described as a dormant spiritual energy that lies coiled at the base of the spine like a serpent. When awakened through specific practices, this powerful energy rises through the chakras, leading to profound spiritual transformation and heightened consciousness.',
        hyperlinks: [
          { text: 'spiritual transformation', targetId: 'consciousness-expansion', type: 'mini-article' },
          { text: 'heightened consciousness', targetId: 'altered-states', type: 'mini-article' }
        ]
      },
      {
        id: 'awakening-process',
        title: 'The Awakening Process',
        content: 'Kundalini awakening is a gradual process that involves the systematic opening and purification of each chakra. This journey requires patience, proper guidance, and regular practice. Signs of awakening may include increased intuition, energy sensations, and deeper spiritual insights.',
        hyperlinks: [
          { text: 'proper guidance', targetId: 'finding-teacher', type: 'mini-article' },
          { text: 'energy sensations', targetId: 'kriyas-movements', type: 'mini-article' }
        ]
      }
    ],
    readTime: 15,
    difficulty: 'advanced',
    relatedTopics: ['energy-anatomy', 'chakra-meditation-guide', 'spiritual-practices'],
    tags: ['kundalini', 'awakening', 'spiritual', 'transformation'],
    lastUpdated: '2024-01-05'
  },

  // Practices
  {
    id: 'chakra-meditation-guide',
    title: 'Chakra Meditation Techniques',
    category: 'practices',
    content: [
      {
        id: 'basic-technique',
        title: 'Basic Chakra Meditation',
        content: 'Begin by sitting comfortably with your spine straight. Starting with the Root Chakra, visualize a red spinning wheel of light at the base of your spine. Breathe deeply and imagine this energy center becoming brighter and more balanced with each breath.',
        hyperlinks: [
          { text: 'visualization', targetId: 'meditation-visualization', type: 'mini-article' },
          { text: 'breathing techniques', targetId: 'pranayama-breathing', type: 'article' }
        ]
      },
      {
        id: 'advanced-practices',
        title: 'Advanced Techniques',
        content: 'Advanced practitioners can work with mantras, mudras, and specific breathing patterns for each chakra. These techniques help to deepen the meditation experience and create more powerful energy shifts.',
        hyperlinks: [
          { text: 'mantras', targetId: 'chakra-mantras', type: 'article' },
          { text: 'mudras', targetId: 'hand-positions', type: 'mini-article' }
        ]
      }
    ],
    readTime: 10,
    difficulty: 'beginner',
    relatedTopics: ['chakra-system-overview', 'pranayama-breathing', 'chakra-mantras'],
    tags: ['meditation', 'practice', 'techniques', 'visualization'],
    lastUpdated: '2024-01-12',
    featured: true
  },
  {
    id: 'chakra-mantras',
    title: 'Sacred Sounds for Each Chakra',
    category: 'practices',
    content: [
      {
        id: 'mantra-basics',
        title: 'Understanding Chakra Mantras',
        content: 'Each chakra resonates with specific sound vibrations. Chanting these sacred sounds helps to activate, balance, and harmonize the energy centers. The traditional bija (seed) mantras are: LAM (Root), VAM (Sacral), RAM (Solar Plexus), YAM (Heart), HAM (Throat), OM (Third Eye), and OM or Silence (Crown).',
        hyperlinks: [
          { text: 'sound vibrations', targetId: 'vibrational-healing', type: 'mini-article' },
          { text: 'bija mantras', targetId: 'seed-sounds', type: 'mini-article' }
        ]
      },
      {
        id: 'practice-guide',
        title: 'How to Practice Mantra Meditation',
        content: 'Sit quietly and focus on one chakra at a time. Chant the corresponding mantra either aloud or mentally, feeling the vibration in the chakra location. Continue for 5-10 minutes per chakra, or spend an entire session on a single energy center that needs attention.',
        hyperlinks: [
          { text: 'meditation postures', targetId: 'sitting-positions', type: 'mini-article' }
        ]
      }
    ],
    readTime: 8,
    difficulty: 'beginner',
    relatedTopics: ['chakra-meditation-guide', 'sound-therapy', 'vocal-techniques'],
    tags: ['mantras', 'sound', 'chanting', 'vibration'],
    lastUpdated: '2024-01-08'
  },

  // Science
  {
    id: 'meditation-neuroscience',
    title: 'The Neuroscience of Chakra Meditation',
    category: 'science',
    content: [
      {
        id: 'brain-research',
        title: 'What Brain Research Shows',
        content: 'Modern neuroscience research has revealed fascinating correlations between traditional chakra meditation practices and measurable changes in brain structure and function. Studies using fMRI and EEG technology show that focused meditation on specific body regions can increase neural activity in corresponding brain areas.',
        hyperlinks: [
          { text: 'fMRI studies', targetId: 'brain-imaging', type: 'mini-article' },
          { text: 'EEG patterns', targetId: 'brainwave-states', type: 'mini-article' }
        ]
      },
      {
        id: 'neuroplasticity',
        title: 'Meditation and Neuroplasticity',
        content: 'Regular chakra meditation practice has been shown to promote neuroplasticity - the brain\'s ability to reorganize and form new neural connections. This leads to improved emotional regulation, enhanced focus, and increased overall well-being.',
        hyperlinks: [
          { text: 'neuroplasticity', targetId: 'brain-plasticity', type: 'mini-article' },
          { text: 'emotional regulation', targetId: 'limbic-system', type: 'mini-article' }
        ]
      }
    ],
    readTime: 12,
    difficulty: 'intermediate',
    relatedTopics: ['energy-medicine-research', 'biofield-science', 'consciousness-studies'],
    tags: ['neuroscience', 'research', 'brain', 'meditation'],
    lastUpdated: '2024-01-03'
  },

  // Healing
  {
    id: 'crystal-healing',
    title: 'Crystal Therapy for Chakra Healing',
    category: 'healing',
    content: [
      {
        id: 'crystal-basics',
        title: 'Understanding Crystal Energy',
        content: 'Crystals and gemstones have been used for healing purposes across cultures for thousands of years. Each crystal has a unique vibrational frequency that can help balance and align specific chakras. The key is matching the crystal\'s properties with the chakra\'s needs.',
        hyperlinks: [
          { text: 'vibrational frequency', targetId: 'crystal-vibrations', type: 'mini-article' },
          { text: 'healing properties', targetId: 'mineral-therapy', type: 'mini-article' }
        ]
      },
      {
        id: 'chakra-stones',
        title: 'Crystals for Each Chakra',
        content: 'Root Chakra: Red Jasper, Hematite, Garnet. Sacral Chakra: Carnelian, Orange Calcite, Moonstone. Solar Plexus: Citrine, Tiger\'s Eye, Yellow Jasper. Heart Chakra: Rose Quartz, Green Aventurine, Emerald. Throat Chakra: Blue Lace Agate, Sodalite, Turquoise. Third Eye: Amethyst, Lapis Lazuli, Fluorite. Crown Chakra: Clear Quartz, Selenite, Diamond.',
        hyperlinks: [
          { text: 'crystal properties', targetId: 'gemstone-guide', type: 'article' }
        ]
      }
    ],
    readTime: 10,
    difficulty: 'beginner',
    relatedTopics: ['color-therapy', 'sound-therapy', 'energy-healing-methods'],
    tags: ['crystals', 'healing', 'gemstones', 'therapy'],
    lastUpdated: '2024-01-07'
  }
];

export const miniArticles: MiniArticle[] = [
  {
    id: 'prana-life-force',
    title: 'Prana: Universal Life Force',
    content: 'Prana is the Sanskrit term for the universal life force energy that flows through all living beings. It is the vital energy that sustains life, governs all biological functions, and connects us to the cosmic energy field. Prana can be increased through proper breathing, meditation, yoga, and spending time in nature.',
    relatedArticles: ['energy-anatomy', 'pranayama-breathing']
  },
  {
    id: 'sanskrit-origins',
    title: 'Sanskrit: The Sacred Language',
    content: 'Sanskrit is an ancient Indo-European language that serves as the liturgical language of Hinduism, Buddhism, and Jainism. Many chakra and yoga terms originate from Sanskrit, as it was the language in which these spiritual concepts were first codified in sacred texts like the Vedas and Upanishads.',
    relatedArticles: ['ancient-wisdom', 'vedic-traditions']
  },
  {
    id: 'energy-channels',
    title: 'Nadis: Energy Pathways',
    content: 'Nadis are subtle energy channels that carry prana throughout the body. Traditional texts describe 72,000 nadis, with three main channels being most important: Sushumna (central channel), Ida (lunar channel), and Pingala (solar channel). These pathways connect all chakras and energy centers.',
    relatedArticles: ['energy-anatomy', 'pranayama-breathing']
  },
  {
    id: 'central-channel',
    title: 'Sushumna: The Central Channel',
    content: 'Sushumna nadi is the primary energy channel that runs along the spine from the base to the crown. It is through this channel that Kundalini energy rises, activating each chakra in sequence. When Sushumna is clear and active, one experiences deep states of meditation and spiritual awareness.',
    relatedArticles: ['kundalini-awakening', 'energy-anatomy']
  },
  {
    id: 'lunar-solar-channels',
    title: 'Ida and Pingala: Complementary Forces',
    content: 'Ida nadi (left channel) carries lunar, cooling, feminine energy, while Pingala nadi (right channel) carries solar, heating, masculine energy. These two channels spiral around Sushumna, creating a balanced flow of energy when harmonized through breathing practices and meditation.',
    relatedArticles: ['pranayama-breathing', 'energy-anatomy']
  },
  {
    id: 'meditation-visualization',
    title: 'Visualization in Meditation',
    content: 'Visualization is a powerful meditation technique that uses mental imagery to direct energy and consciousness. In chakra work, practitioners visualize light, colors, symbols, or geometric shapes at each energy center to activate and balance them. The key is maintaining clear, focused intention.',
    relatedArticles: ['chakra-meditation-guide', 'advanced-techniques']
  },
  {
    id: 'vibrational-healing',
    title: 'Sound and Vibration Therapy',
    content: 'Everything in the universe vibrates at specific frequencies, including our cells, organs, and energy centers. Sound therapy uses specific frequencies, tones, and mantras to restore healthy vibrational patterns, clear energetic blockages, and promote healing on all levels.',
    relatedArticles: ['sound-therapy', 'chakra-mantras']
  },
  {
    id: 'seed-sounds',
    title: 'Bija Mantras: Seed Sounds',
    content: 'Bija mantras are single-syllable sounds that contain the essence of each chakra\'s energy. These "seed sounds" create specific vibrations that resonate with and activate the corresponding energy center. Each mantra is considered a sonic key that unlocks the chakra\'s potential.',
    relatedArticles: ['chakra-mantras', 'sound-therapy']
  }
];