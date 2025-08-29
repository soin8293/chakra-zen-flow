import { Article } from "@/types/chakra";

// Simple Learning Cards - Beginner-friendly mini-articles for easy understanding
export const simpleLearningCards: Article[] = [
  // ========== EVERYDAY WELLNESS TOPICS ==========
  {
    id: 'morning-energy-routine',
    title: '5-Minute Morning Energy Boost',
    category: 'practices',
    content: [
      {
        id: 'simple-morning',
        title: 'Start Your Day with Energy',
        content: 'Take 5 deep breaths as soon as you wake up. Stretch your arms overhead and imagine golden light filling your body. Set one positive intention for your day. This simple routine helps activate your natural energy and creates a positive foundation for everything that follows.',
        hyperlinks: [
          { text: 'deep breathing', targetId: 'breath-basics', type: 'mini-article' },
          { text: 'positive intentions', targetId: 'daily-intentions', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['morning-routine', 'energy-activation', 'daily-practices'],
    tags: ['morning', 'energy', 'simple', 'routine'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'evening-wind-down',
    title: 'Peaceful Evening Routine',
    category: 'practices',
    content: [
      {
        id: 'simple-evening',
        title: 'End Your Day Peacefully',
        content: 'Before bed, place your hand on your heart and take three slow breaths. Think of one thing you\'re grateful for from your day. Imagine any stress leaving your body with each exhale. This helps your mind and body prepare for restful sleep.',
        hyperlinks: [
          { text: 'gratitude practice', targetId: 'simple-gratitude', type: 'mini-article' },
          { text: 'stress release', targetId: 'letting-go-basics', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['evening-routine', 'sleep-preparation', 'stress-relief'],
    tags: ['evening', 'sleep', 'gratitude', 'peaceful'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'water-energy-connection',
    title: 'Drinking Water Mindfully',
    category: 'practices',
    content: [
      {
        id: 'mindful-hydration',
        title: 'Turn Drinking Water into Energy Practice',
        content: 'Before drinking water, hold the glass and imagine the water filling you with clean, pure energy. Take slow, mindful sips and feel the water nourishing every cell in your body. This simple practice transforms daily hydration into an energy-boosting ritual.',
        hyperlinks: [
          { text: 'mindful drinking', targetId: 'conscious-consumption', type: 'mini-article' },
          { text: 'water energy', targetId: 'hydration-wellness', type: 'mini-article' }
        ]
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['mindfulness', 'hydration', 'daily-rituals'],
    tags: ['water', 'mindfulness', 'energy', 'hydration'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'posture-energy-flow',
    title: 'Good Posture for Better Energy',
    category: 'practices',
    content: [
      {
        id: 'energy-posture',
        title: 'Sit and Stand for Energy Flow',
        content: 'Imagine a string pulling the top of your head toward the sky. Relax your shoulders and breathe naturally. Good posture helps energy flow freely through your body, reducing fatigue and improving mood. Check your posture several times throughout the day.',
        hyperlinks: [
          { text: 'spinal alignment', targetId: 'spine-energy-flow', type: 'mini-article' },
          { text: 'energy channels', targetId: 'simple-energy-paths', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['posture', 'energy-flow', 'body-awareness'],
    tags: ['posture', 'alignment', 'energy', 'body'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'nature-quick-connect',
    title: 'Quick Nature Connection',
    category: 'practices',
    content: [
      {
        id: 'nature-moments',
        title: 'Connect with Nature in 2 Minutes',
        content: 'Step outside and take five deep breaths of fresh air. Look at the sky, trees, or any plants nearby. Feel your feet on the ground. Even two minutes in nature can reset your energy and calm your mind. Do this whenever you feel stressed or tired.',
        hyperlinks: [
          { text: 'grounding outdoors', targetId: 'earth-connection-basics', type: 'mini-article' },
          { text: 'fresh air benefits', targetId: 'outdoor-breathing', type: 'mini-article' }
        ]
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['nature', 'grounding', 'stress-relief'],
    tags: ['nature', 'grounding', 'outdoors', 'quick'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'simple-stretching',
    title: 'Energy-Boosting Stretches',
    category: 'practices',
    content: [
      {
        id: 'desk-stretches',
        title: 'Simple Stretches for Energy',
        content: 'Roll your shoulders backward five times. Gently turn your head left and right. Reach your arms overhead and stretch toward the sky. These simple movements help energy flow and reduce tension, especially when sitting for long periods.',
        hyperlinks: [
          { text: 'shoulder tension', targetId: 'neck-shoulder-release', type: 'mini-article' },
          { text: 'movement benefits', targetId: 'gentle-movement-energy', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['stretching', 'movement', 'tension-relief'],
    tags: ['stretching', 'movement', 'desk', 'tension'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'screen-time-balance',
    title: 'Healthy Screen Time Habits',
    category: 'practices',
    content: [
      {
        id: 'digital-wellness',
        title: 'Balance Your Screen Energy',
        content: 'Every hour, look away from screens for 30 seconds and focus on something far away. Blink slowly several times to rest your eyes. Take three deep breaths. This helps prevent digital eye strain and maintains your natural energy rhythm.',
        hyperlinks: [
          { text: 'eye rest', targetId: 'vision-wellness', type: 'mini-article' },
          { text: 'digital detox', targetId: 'screen-break-benefits', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['digital-wellness', 'eye-health', 'breaks'],
    tags: ['screens', 'digital', 'eyes', 'breaks'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'walking-meditation-simple',
    title: 'Walking as Meditation',
    category: 'practices',
    content: [
      {
        id: 'mindful-walking',
        title: 'Turn Walking into Meditation',
        content: 'When walking anywhere, focus on the feeling of your feet touching the ground. Match your breathing to your steps - inhale for two steps, exhale for two steps. This turns everyday walking into a calming, energizing practice.',
        hyperlinks: [
          { text: 'walking benefits', targetId: 'movement-meditation', type: 'mini-article' },
          { text: 'breath walking', targetId: 'rhythmic-breathing', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['walking', 'meditation', 'mindfulness'],
    tags: ['walking', 'meditation', 'movement', 'mindful'],
    lastUpdated: '2024-01-15'
  },

  // ========== BASIC CONCEPTS MADE SIMPLE ==========
  {
    id: 'what-is-meditation-simple',
    title: 'Meditation in 2 Minutes',
    category: 'core-concepts',
    content: [
      {
        id: 'meditation-basics',
        title: 'What is Meditation Really?',
        content: 'Meditation is simply paying attention to the present moment. You can focus on your breathing, the sounds around you, or how your body feels. It\'s like giving your mind a rest. Even 2-3 minutes can help you feel calmer and more focused.',
        hyperlinks: [
          { text: 'present moment', targetId: 'mindfulness-basics', type: 'mini-article' },
          { text: 'breathing focus', targetId: 'breath-awareness', type: 'mini-article' }
        ]
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['meditation', 'mindfulness', 'basics'],
    tags: ['meditation', 'basics', 'simple', 'beginner'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'energy-vs-mood',
    title: 'Energy vs. Mood - What\'s the Difference?',
    category: 'core-concepts',
    content: [
      {
        id: 'energy-mood-difference',
        title: 'Understanding Energy and Mood',
        content: 'Your mood is how you feel emotionally - happy, sad, angry, or calm. Your energy is how much physical and mental vitality you have. You can have high energy but feel sad, or low energy but feel happy. Both affect each other, but they\'re different things.',
        hyperlinks: [
          { text: 'emotional awareness', targetId: 'feeling-recognition', type: 'mini-article' },
          { text: 'vitality levels', targetId: 'energy-awareness', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['energy', 'emotions', 'awareness'],
    tags: ['energy', 'mood', 'emotions', 'awareness'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'chakras-simple-explanation',
    title: 'Chakras Made Simple',
    category: 'core-concepts',
    content: [
      {
        id: 'chakras-basic',
        title: 'What Are Chakras?',
        content: 'Think of chakras as energy centers in your body, like wheels that spin. There are seven main ones from the base of your spine to the top of your head. When they\'re balanced, you feel good physically, emotionally, and mentally. Each one relates to different aspects of life.',
        hyperlinks: [
          { text: 'seven chakras', targetId: 'chakra-locations', type: 'mini-article' },
          { text: 'energy balance', targetId: 'balanced-feeling', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['chakras', 'energy-centers', 'balance'],
    tags: ['chakras', 'energy', 'centers', 'simple'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'grounding-simple',
    title: 'What is Grounding?',
    category: 'core-concepts',
    content: [
      {
        id: 'grounding-basics',
        title: 'Grounding Explained Simply',
        content: 'Grounding means connecting with the earth\'s energy to feel more stable and calm. It\'s like plugging yourself into nature\'s power source. You can do this by walking barefoot on grass, sitting under a tree, or even just imagining roots growing from your feet into the earth.',
        hyperlinks: [
          { text: 'earth connection', targetId: 'nature-grounding', type: 'mini-article' },
          { text: 'stability feeling', targetId: 'centered-feeling', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['grounding', 'earth-connection', 'stability'],
    tags: ['grounding', 'earth', 'stability', 'calm'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'colors-and-feelings',
    title: 'How Colors Affect Your Feelings',
    category: 'core-concepts',
    content: [
      {
        id: 'color-emotions',
        title: 'Colors and Your Emotions',
        content: 'Different colors can change how you feel. Red gives energy and strength. Blue brings calm and peace. Green is healing and balancing. Yellow makes you feel happy and confident. Orange sparks creativity. You can use colors around you or visualize them to shift your mood.',
        hyperlinks: [
          { text: 'color visualization', targetId: 'imagining-colors', type: 'mini-article' },
          { text: 'mood shifting', targetId: 'changing-feelings', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['colors', 'emotions', 'visualization'],
    tags: ['colors', 'emotions', 'feelings', 'mood'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'visualization-simple',
    title: 'Simple Visualization',
    category: 'core-concepts',
    content: [
      {
        id: 'visualization-basics',
        title: 'Using Your Imagination for Wellness',
        content: 'Visualization means using your imagination to create helpful mental pictures. You might imagine golden light filling your body, or picture yourself in a peaceful place. Your brain responds to these images almost like they\'re real, helping you feel better.',
        hyperlinks: [
          { text: 'mental pictures', targetId: 'imagination-healing', type: 'mini-article' },
          { text: 'peaceful places', targetId: 'safe-space-visualization', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['visualization', 'imagination', 'mental-imagery'],
    tags: ['visualization', 'imagination', 'mental', 'imagery'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'breathing-for-calm',
    title: 'Breathing for Instant Calm',
    category: 'core-concepts',
    content: [
      {
        id: 'calm-breathing',
        title: 'Use Your Breath to Feel Calm',
        content: 'When you\'re stressed or anxious, try this: breathe in slowly for 4 counts, hold for 4 counts, then breathe out slowly for 6 counts. The longer exhale tells your nervous system to relax. Do this 3-5 times whenever you need to calm down quickly.',
        hyperlinks: [
          { text: 'nervous system', targetId: 'relaxation-response', type: 'mini-article' },
          { text: 'breath counting', targetId: 'rhythmic-breathing-simple', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['breathing', 'stress-relief', 'calm'],
    tags: ['breathing', 'calm', 'stress', 'anxiety'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'stress-relief-quick',
    title: 'Quick Stress Relief',
    category: 'core-concepts',
    content: [
      {
        id: 'instant-stress-relief',
        title: '30-Second Stress Relief',
        content: 'When stress hits, try this quick technique: Place both hands on your heart. Take three slow, deep breaths. Say to yourself "I am safe and calm." Feel your heart beating under your hands. This activates your body\'s natural calming response in just 30 seconds.',
        hyperlinks: [
          { text: 'heart connection', targetId: 'heart-calming', type: 'mini-article' },
          { text: 'calming response', targetId: 'self-soothing', type: 'mini-article' }
        ]
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['stress-relief', 'calming', 'quick-techniques'],
    tags: ['stress', 'relief', 'quick', 'calming'],
    lastUpdated: '2024-01-15'
  },

  // ========== PRACTICAL DAILY APPLICATIONS ==========
  {
    id: 'morning-chakra-check',
    title: '5-Minute Morning Chakra Check',
    category: 'practices',
    content: [
      {
        id: 'quick-chakra-scan',
        title: 'Check Your Energy Centers',
        content: 'Start at your feet and slowly move your attention up your body. Notice how each area feels - tense, relaxed, warm, or cool. Breathe into any areas that feel tight or uncomfortable. This quick body scan helps you start the day aware of your energy.',
        hyperlinks: [
          { text: 'body awareness', targetId: 'physical-sensation-awareness', type: 'mini-article' },
          { text: 'energy scanning', targetId: 'feeling-energy-flow', type: 'mini-article' }
        ]
      }
    ],
    readTime: 3,
    difficulty: 'beginner',
    relatedTopics: ['morning-routine', 'body-awareness', 'energy-check'],
    tags: ['morning', 'chakras', 'body-scan', 'awareness'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'color-breathing-moods',
    title: 'Color Breathing for Different Moods',
    category: 'practices',
    content: [
      {
        id: 'mood-color-breathing',
        title: 'Breathe Colors to Change Your Mood',
        content: 'Need energy? Breathe in red light. Want to feel calm? Breathe in blue light. Need confidence? Try yellow light. Creative block? Breathe orange light. Simply imagine breathing in your chosen color and feel it filling your whole body.',
        hyperlinks: [
          { text: 'red energy', targetId: 'energizing-visualization', type: 'mini-article' },
          { text: 'blue calm', targetId: 'calming-visualization', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['color-breathing', 'mood-regulation', 'visualization'],
    tags: ['colors', 'breathing', 'mood', 'visualization'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'hand-positions-simple',
    title: 'Simple Hand Positions for Energy',
    category: 'practices',
    content: [
      {
        id: 'basic-mudras',
        title: 'Easy Hand Positions for Different Feelings',
        content: 'Place your hands on your heart for self-love. Touch your thumb to your index finger for focus. Rest your hands palms-up on your knees for openness. Cup your hands over your belly for grounding. These simple hand positions can shift your energy in moments.',
        hyperlinks: [
          { text: 'hand energy', targetId: 'palm-power', type: 'mini-article' },
          { text: 'heart connection', targetId: 'self-love-touch', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['hand-positions', 'mudras', 'energy-work'],
    tags: ['hands', 'positions', 'energy', 'simple'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sound-healing-basics',
    title: 'Simple Sound Healing',
    category: 'practices',
    content: [
      {
        id: 'basic-sound-work',
        title: 'Use Sound to Feel Better',
        content: 'Humming creates gentle vibrations that calm your nervous system. Saying "Ahh" opens your heart. Making an "Om" sound balances your whole body. Try humming your favorite tune or making these sounds for 30 seconds to feel more peaceful.',
        hyperlinks: [
          { text: 'humming benefits', targetId: 'vibration-healing', type: 'mini-article' },
          { text: 'vocal toning', targetId: 'sound-therapy-simple', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['sound-healing', 'humming', 'vocal-toning'],
    tags: ['sound', 'humming', 'vibration', 'healing'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'crystals-introduction',
    title: 'Crystals for Beginners',
    category: 'practices',
    content: [
      {
        id: 'crystal-basics',
        title: 'Starting with Crystals',
        content: 'Crystals are just beautiful stones that many people find calming to hold or look at. You don\'t need to believe anything special - just notice how holding a smooth stone makes you feel. Clear quartz, amethyst, and rose quartz are gentle stones to start with.',
        hyperlinks: [
          { text: 'crystal selection', targetId: 'choosing-first-crystal', type: 'mini-article' },
          { text: 'stone energy', targetId: 'mineral-connection', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['crystals', 'stones', 'beginner-crystals'],
    tags: ['crystals', 'stones', 'beginner', 'gentle'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'essential-oils-simple',
    title: 'Essential Oils Made Simple',
    category: 'practices',
    content: [
      {
        id: 'oils-basics',
        title: 'Using Scents for Wellness',
        content: 'Essential oils are concentrated plant scents that can affect your mood. Lavender helps you relax. Peppermint gives energy. Lemon lifts your spirits. You can smell them directly from the bottle or put a drop on a tissue. Always dilute before putting on skin.',
        hyperlinks: [
          { text: 'scent and mood', targetId: 'aromatherapy-basics', type: 'mini-article' },
          { text: 'oil safety', targetId: 'essential-oil-safety', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['essential-oils', 'aromatherapy', 'scents'],
    tags: ['oils', 'scents', 'aromatherapy', 'mood'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'energy-cleansing-quick',
    title: 'Quick Energy Cleansing',
    category: 'practices',
    content: [
      {
        id: 'simple-cleansing',
        title: 'Clear Your Energy in 1 Minute',
        content: 'Imagine a shower of bright white light washing over you from head to toe. See it washing away any tiredness, stress, or negative feelings. End by imagining yourself surrounded by a bubble of golden light. This mental shower cleanses your energy field.',
        hyperlinks: [
          { text: 'light visualization', targetId: 'protective-light', type: 'mini-article' },
          { text: 'energy clearing', targetId: 'cleansing-visualization', type: 'mini-article' }
        ]
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['energy-cleansing', 'visualization', 'protection'],
    tags: ['cleansing', 'energy', 'visualization', 'quick'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'simple-protection',
    title: 'Simple Energy Protection',
    category: 'practices',
    content: [
      {
        id: 'basic-protection',
        title: 'Protect Your Energy',
        content: 'Before entering stressful situations, imagine yourself inside a bubble of your favorite color. This bubble lets good energy in and keeps negative energy out. You can also cross your arms over your chest or hold something that makes you feel safe and strong.',
        hyperlinks: [
          { text: 'protective bubble', targetId: 'energy-shield-basics', type: 'mini-article' },
          { text: 'comfort objects', targetId: 'talismans-simple', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['protection', 'boundaries', 'visualization'],
    tags: ['protection', 'boundaries', 'bubble', 'safety'],
    lastUpdated: '2024-01-15'
  },

  // ========== BEGINNER-FRIENDLY SCIENCE ==========
  {
    id: 'heart-brain-connection',
    title: 'Your Heart Has Intelligence',
    category: 'science',
    content: [
      {
        id: 'heart-brain-basics',
        title: 'The Heart-Brain Connection',
        content: 'Your heart has its own nervous system with over 40,000 neurons - that\'s like a little brain in your chest! Your heart sends more signals to your brain than your brain sends to your heart. This is why paying attention to your heart can help you feel calmer and make better decisions.',
        hyperlinks: [
          { text: 'heart neurons', targetId: 'cardiac-intelligence', type: 'mini-article' },
          { text: 'heart wisdom', targetId: 'intuitive-heart', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['heart-intelligence', 'neuroscience', 'intuition'],
    tags: ['heart', 'brain', 'intelligence', 'science'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'breath-science-simple',
    title: 'How Breathing Affects Your Body',
    category: 'science',
    content: [
      {
        id: 'breathing-effects',
        title: 'The Science of Breathing',
        content: 'When you breathe slowly and deeply, you activate your parasympathetic nervous system - your body\'s "rest and digest" mode. This lowers your heart rate, reduces stress hormones, and helps you feel calm. Fast, shallow breathing does the opposite.',
        hyperlinks: [
          { text: 'nervous system', targetId: 'autonomic-nervous-system-simple', type: 'mini-article' },
          { text: 'stress hormones', targetId: 'cortisol-simple', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['breathing', 'nervous-system', 'stress-response'],
    tags: ['breathing', 'science', 'nervous-system', 'calm'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'color-psychology-simple',
    title: 'Why Colors Affect You',
    category: 'science',
    content: [
      {
        id: 'color-brain-effects',
        title: 'Color Psychology Basics',
        content: 'Colors affect your brain through your eyes and nervous system. Red increases alertness and energy because it was associated with fire and blood in evolution. Blue reminds your brain of clear skies and calm water, triggering relaxation. Green connects to nature and healing.',
        hyperlinks: [
          { text: 'color perception', targetId: 'how-eyes-see-color', type: 'mini-article' },
          { text: 'evolutionary responses', targetId: 'ancient-color-meanings', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['color-psychology', 'brain-science', 'evolution'],
    tags: ['colors', 'psychology', 'brain', 'evolution'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sound-wave-basics',
    title: 'How Sound Heals',
    category: 'science',
    content: [
      {
        id: 'sound-healing-science',
        title: 'Sound Waves and Your Body',
        content: 'Sound creates vibrations that travel through your body, which is mostly water. These vibrations can help relax tense muscles, slow your heart rate, and calm your mind. Low sounds are grounding, while higher sounds are energizing. Your body is like a musical instrument.',
        hyperlinks: [
          { text: 'body vibrations', targetId: 'resonance-healing', type: 'mini-article' },
          { text: 'water and sound', targetId: 'acoustic-body-effects', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['sound-healing', 'vibration', 'body-science'],
    tags: ['sound', 'vibration', 'healing', 'science'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'stress-response-simple',
    title: 'What Happens When You\'re Stressed',
    category: 'science',
    content: [
      {
        id: 'stress-body-effects',
        title: 'Your Body\'s Stress Response',
        content: 'When you\'re stressed, your body releases chemicals like adrenaline and cortisol to help you deal with danger. This was helpful for our ancestors facing real physical threats, but today most stress is mental. These chemicals build up and can make you feel anxious or tired.',
        hyperlinks: [
          { text: 'stress chemicals', targetId: 'stress-hormones-explained', type: 'mini-article' },
          { text: 'modern stress', targetId: 'chronic-stress-effects', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['stress', 'hormones', 'fight-or-flight'],
    tags: ['stress', 'hormones', 'body', 'science'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'relaxation-response-simple',
    title: 'Your Body\'s Natural Calm Mode',
    category: 'science',
    content: [
      {
        id: 'relaxation-science',
        title: 'The Relaxation Response',
        content: 'Your body has a built-in relaxation response that\'s the opposite of stress. When activated, it slows your heart rate, lowers blood pressure, and releases feel-good chemicals. Deep breathing, meditation, and gentle movement can turn on this natural healing mode.',
        hyperlinks: [
          { text: 'feel-good chemicals', targetId: 'endorphins-simple', type: 'mini-article' },
          { text: 'activating relaxation', targetId: 'triggering-calm', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['relaxation', 'healing', 'nervous-system'],
    tags: ['relaxation', 'healing', 'calm', 'science'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'energy-anatomy-simple',
    title: 'Your Body\'s Energy System',
    category: 'science',
    content: [
      {
        id: 'simple-energy-anatomy',
        title: 'Understanding Your Energy Body',
        content: 'Your body creates electrical energy through every heartbeat and brainwave. This creates an energy field around you that can be measured with special equipment. When you feel good, this field is coherent and strong. When stressed, it becomes chaotic and weak.',
        hyperlinks: [
          { text: 'bioelectric field', targetId: 'electromagnetic-body', type: 'mini-article' },
          { text: 'energy coherence', targetId: 'field-harmony', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['biofield', 'energy-anatomy', 'coherence'],
    tags: ['energy', 'anatomy', 'biofield', 'science'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'basic-energy-concepts',
    title: 'Energy Basics Everyone Can Understand',
    category: 'science',
    content: [
      {
        id: 'energy-fundamentals',
        title: 'Simple Energy Concepts',
        content: 'Everything in the universe is energy vibrating at different speeds. Your thoughts, emotions, and physical body all have their own vibration. When you feel good, you vibrate higher. When you feel bad, you vibrate lower. Like attracts like - your vibration affects what you experience.',
        hyperlinks: [
          { text: 'vibration levels', targetId: 'frequency-feelings', type: 'mini-article' },
          { text: 'like attracts like', targetId: 'resonance-attraction', type: 'mini-article' }
        ]
      }
    ],
    readTime: 2,
    difficulty: 'beginner',
    relatedTopics: ['vibration', 'energy-concepts', 'attraction'],
    tags: ['energy', 'vibration', 'attraction', 'concepts'],
    lastUpdated: '2024-01-15'
  }
];