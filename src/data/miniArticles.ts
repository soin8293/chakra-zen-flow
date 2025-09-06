import { Article } from "@/types/chakra";

// Mini-articles that are referenced throughout the app but need implementation
// These are short, focused pieces that can be displayed as modal content or quick reads
export const miniArticles: Article[] = [
  // ========== BREATHING & BREATH WORK ==========
  {
    id: 'breath-basics',
    title: 'Deep Breathing Fundamentals',
    category: 'techniques',
    content: [
      {
        id: 'deep-breathing-simple',
        title: 'How to Breathe Deeply',
        content: 'Place one hand on your chest, one on your belly. Breathe in slowly through your nose, letting your belly rise more than your chest. This activates your diaphragm and triggers your body\'s relaxation response. Practice this for just 2-3 minutes daily.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['breathing', 'relaxation'],
    tags: ['breathing', 'basics', 'simple'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'breath-awareness',
    title: 'Breathing Awareness Practice',
    category: 'techniques',
    content: [
      {
        id: 'mindful-breathing',
        title: 'Watching Your Breath',
        content: 'Simply notice your breathing without changing it. Feel the air entering and leaving your nostrils. Notice if your breath is shallow or deep, fast or slow. This gentle awareness naturally deepens and slows your breathing.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['mindfulness', 'breathing'],
    tags: ['breath', 'awareness', 'mindfulness'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'rhythmic-breathing',
    title: 'Breathing with Rhythm',
    category: 'techniques',
    content: [
      {
        id: 'counted-breathing',
        title: 'Counting Your Breaths',
        content: 'Try breathing in for 4 counts, holding for 4, then out for 6. The longer exhale activates your parasympathetic nervous system. Start with whatever count feels comfortable - even 2-2-3 works great.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['breathing', 'rhythm'],
    tags: ['breathing', 'counting', 'rhythm'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'rhythmic-breathing-simple',
    title: 'Simple Rhythmic Breathing',
    category: 'techniques',
    content: [
      {
        id: 'easy-breath-rhythm',
        title: 'Easy Breath Patterns',
        content: 'Start with breathing in for 3 counts and out for 3 counts. Once comfortable, try in for 4, out for 6. The key is finding a rhythm that feels natural and calming for you.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['breathing', 'patterns'],
    tags: ['breathing', 'simple', 'patterns'],
    lastUpdated: '2024-01-15'
  },

  // ========== INTENTIONS & MINDFULNESS ==========
  {
    id: 'daily-intentions',
    title: 'Setting Daily Intentions',
    category: 'practices',
    content: [
      {
        id: 'morning-intentions',
        title: 'How to Set Daily Intentions',
        content: 'Each morning, take a moment to think about how you want to feel or what quality you want to embody today. Maybe it\'s patience, joy, or kindness. Keep it simple and positive. Let this intention guide your choices throughout the day.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['intentions', 'mindfulness'],
    tags: ['intentions', 'daily', 'mindfulness'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mindfulness-basics',
    title: 'What is Mindfulness?',
    category: 'core-concepts',
    content: [
      {
        id: 'present-moment-awareness',
        title: 'Being Present',
        content: 'Mindfulness is simply paying attention to what\'s happening right now without judging it. Notice your thoughts, feelings, and surroundings with kind curiosity. When your mind wanders (which is normal), gently bring attention back to the present.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['mindfulness', 'awareness'],
    tags: ['mindfulness', 'present', 'awareness'],
    lastUpdated: '2024-01-15'
  },

  // ========== GRATITUDE & POSITIVE PRACTICES ==========
  {
    id: 'simple-gratitude',
    title: 'Simple Gratitude Practice',
    category: 'practices',
    content: [
      {
        id: 'daily-gratitude',
        title: 'Finding Things to Appreciate',
        content: 'Each day, notice three things you appreciate - they can be big or small. Maybe it\'s your morning coffee, a text from a friend, or simply that you\'re breathing. Gratitude shifts your focus to what\'s good in your life.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['gratitude', 'positivity'],
    tags: ['gratitude', 'appreciation', 'positive'],
    lastUpdated: '2024-01-15'
  },

  // ========== STRESS & LETTING GO ==========
  {
    id: 'letting-go-basics',
    title: 'Simple Stress Release',
    category: 'techniques',
    content: [
      {
        id: 'stress-release-technique',
        title: 'Letting Go of Stress',
        content: 'Imagine stress as a heavy backpack you can set down. Take a deep breath and imagine placing all your worries in this imaginary pack. Gently set it aside, knowing you can pick it up later if needed. Feel the lightness.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['stress-relief', 'letting-go'],
    tags: ['stress', 'release', 'letting-go'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'relaxation-response',
    title: 'Your Body\'s Calm Mode',
    category: 'science',
    content: [
      {
        id: 'nervous-system-calm',
        title: 'Activating Calm',
        content: 'Your nervous system has two modes: stress (fight-or-flight) and calm (rest-and-digest). Deep breathing, gentle movement, and positive thoughts activate calm mode. Even 30 seconds of slow breathing can shift your system.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['nervous-system', 'relaxation'],
    tags: ['relaxation', 'nervous-system', 'calm'],
    lastUpdated: '2024-01-15'
  },

  // ========== MOVEMENT & BODY ==========
  {
    id: 'gentle-movement-energy',
    title: 'Movement for Energy',
    category: 'practices',
    content: [
      {
        id: 'energizing-movement',
        title: 'Simple Movements for Energy',
        content: 'Gentle stretching, arm circles, or even wiggling your fingers and toes can boost energy. Movement helps blood flow and releases feel-good chemicals in your brain. Listen to your body and move in ways that feel good.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['movement', 'energy'],
    tags: ['movement', 'energy', 'gentle'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'neck-shoulder-release',
    title: 'Releasing Neck & Shoulder Tension',
    category: 'practices',
    content: [
      {
        id: 'shoulder-relief',
        title: 'Quick Tension Relief',
        content: 'Slowly roll your shoulders backwards 5 times. Gently turn your head left and right. Drop your right ear toward your right shoulder, hold for 10 seconds, then switch sides. These simple moves release common tension spots.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['tension-relief', 'stretching'],
    tags: ['neck', 'shoulders', 'tension', 'relief'],
    lastUpdated: '2024-01-15'
  },

  // ========== WATER & CONSUMPTION ==========
  {
    id: 'conscious-consumption',
    title: 'Mindful Eating & Drinking',
    category: 'practices',
    content: [
      {
        id: 'mindful-consumption',
        title: 'Eating and Drinking with Awareness',
        content: 'Before eating or drinking, pause for a moment. Notice the colors, smells, and textures. Take your first bite or sip slowly, really tasting it. This simple awareness transforms daily consumption into nourishing practice.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['mindfulness', 'nutrition'],
    tags: ['mindful', 'eating', 'drinking', 'awareness'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'hydration-wellness',
    title: 'Water for Wellness',
    category: 'practices',
    content: [
      {
        id: 'water-energy-boost',
        title: 'Energizing with Water',
        content: 'Water helps every cell in your body function properly. When you\'re dehydrated, you feel tired and foggy. Start your day with water, drink before you feel thirsty, and notice how proper hydration naturally boosts your energy and mood.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['hydration', 'energy'],
    tags: ['water', 'hydration', 'energy', 'wellness'],
    lastUpdated: '2024-01-15'
  },

  // ========== POSTURE & ALIGNMENT ==========
  {
    id: 'spine-energy-flow',
    title: 'Spine and Energy Flow',
    category: 'core-concepts',
    content: [
      {
        id: 'spinal-alignment',
        title: 'Your Spine and Energy',
        content: 'Your spine is like a highway for energy in your body. When you slouch, energy gets stuck. When you sit or stand tall, energy flows freely. Good posture isn\'t rigid - it\'s relaxed alignment that allows natural flow.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['posture', 'energy-flow'],
    tags: ['spine', 'posture', 'energy', 'alignment'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'simple-energy-paths',
    title: 'Energy Channels in Your Body',
    category: 'core-concepts',
    content: [
      {
        id: 'energy-pathways',
        title: 'How Energy Moves in Your Body',
        content: 'Imagine energy flowing like rivers through your body. Your spine is the main channel, with smaller streams flowing to your arms, legs, and head. When these pathways are clear, you feel energized and balanced.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['energy-flow', 'pathways'],
    tags: ['energy', 'channels', 'flow', 'pathways'],
    lastUpdated: '2024-01-15'
  },

  // ========== NATURE CONNECTION ==========
  {
    id: 'earth-connection-basics',
    title: 'Connecting with Earth Energy',
    category: 'practices',
    content: [
      {
        id: 'grounding-outdoors',
        title: 'Earth Connection Practice',
        content: 'Stand barefoot on grass, sand, or soil if possible. Feel your feet connecting with the earth. Imagine any stress or negative energy flowing down through your feet into the ground, where it can be transformed into something useful.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['grounding', 'nature'],
    tags: ['earth', 'grounding', 'connection', 'nature'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'outdoor-breathing',
    title: 'Fresh Air Benefits',
    category: 'science',
    content: [
      {
        id: 'fresh-air-wellness',
        title: 'Why Fresh Air Feels Good',
        content: 'Outdoor air has different qualities than indoor air - it\'s often richer in oxygen and negative ions, which can boost mood and energy. Even a few minutes of breathing fresh air can help clear your mind and energize your body.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['air-quality', 'nature'],
    tags: ['fresh-air', 'outdoors', 'breathing', 'wellness'],
    lastUpdated: '2024-01-15'
  },

  // ========== DIGITAL WELLNESS ==========
  {
    id: 'vision-wellness',
    title: 'Caring for Your Eyes',
    category: 'practices',
    content: [
      {
        id: 'eye-rest-practices',
        title: 'Resting Your Eyes',
        content: 'Every 20 minutes, look at something 20 feet away for 20 seconds (the 20-20-20 rule). Blink slowly several times to moisten your eyes. Cup your palms over closed eyes for 30 seconds to give them complete rest.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['eye-health', 'digital-wellness'],
    tags: ['eyes', 'vision', 'rest', 'digital'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'screen-break-benefits',
    title: 'Why Screen Breaks Matter',
    category: 'science',
    content: [
      {
        id: 'digital-break-science',
        title: 'The Science of Screen Breaks',
        content: 'Screens make your eyes work harder and can disrupt your natural blink rate. Regular breaks help prevent eye strain, reduce mental fatigue, and maintain your natural energy rhythms. Your brain and eyes need these micro-recoveries.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['digital-wellness', 'eye-health'],
    tags: ['screens', 'breaks', 'digital', 'wellness'],
    lastUpdated: '2024-01-15'
  },

  // ========== WALKING & MOVEMENT ==========
  {
    id: 'movement-meditation',
    title: 'Walking as Meditation',
    category: 'practices',
    content: [
      {
        id: 'mindful-walking-practice',
        title: 'Meditative Walking',
        content: 'Walking can be meditation in motion. Focus on the feeling of your feet touching the ground, the rhythm of your steps, or your breathing. This turns everyday walking into a mindfulness practice that calms your mind.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['walking', 'meditation'],
    tags: ['walking', 'meditation', 'movement', 'mindfulness'],
    lastUpdated: '2024-01-15'
  },

  // ========== CHAKRA BASICS ==========
  {
    id: 'chakra-locations',
    title: 'Where Are the Seven Chakras?',
    category: 'core-concepts',
    content: [
      {
        id: 'seven-chakra-positions',
        title: 'The Seven Energy Centers',
        content: 'Starting from the bottom: Root chakra at the base of your spine, Sacral below your navel, Solar Plexus at your stomach, Heart in your chest, Throat at your throat, Third Eye between your eyebrows, and Crown at the top of your head.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['chakras', 'anatomy'],
    tags: ['chakras', 'locations', 'seven', 'energy-centers'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'balanced-feeling',
    title: 'What Does Energy Balance Feel Like?',
    category: 'core-concepts',
    content: [
      {
        id: 'energy-balance-sensations',
        title: 'Recognizing Energy Balance',
        content: 'When your energy is balanced, you feel grounded yet energized, calm yet alert. You can handle stress without being overwhelmed, express yourself clearly, and feel connected to yourself and others. It\'s a state of natural well-being.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['energy-balance', 'well-being'],
    tags: ['balance', 'energy', 'well-being', 'feelings'],
    lastUpdated: '2024-01-15'
  },

  // ========== GROUNDING & STABILITY ==========
  {
    id: 'nature-grounding',
    title: 'Grounding Through Nature',
    category: 'practices',
    content: [
      {
        id: 'natural-grounding-methods',
        title: 'Using Nature to Ground',
        content: 'Touch a tree and feel its stability. Sit on the ground and sense the earth supporting you. Watch flowing water to feel calm and centered. Nature naturally helps you feel more grounded and stable.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['grounding', 'nature'],
    tags: ['grounding', 'nature', 'stability', 'earth'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'centered-feeling',
    title: 'What Does Being Centered Feel Like?',
    category: 'core-concepts',
    content: [
      {
        id: 'centeredness-experience',
        title: 'The Experience of Being Centered',
        content: 'Being centered feels like having your feet firmly on the ground while your mind is calm and clear. You feel stable, present, and able to respond thoughtfully rather than react impulsively. It\'s like being a mountain - unmoved by external storms.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['centeredness', 'stability'],
    tags: ['centered', 'stability', 'presence', 'calm'],
    lastUpdated: '2024-01-15'
  },

  // ========== COLORS & VISUALIZATION ==========
  {
    id: 'imagining-colors',
    title: 'How to Visualize Colors',
    category: 'techniques',
    content: [
      {
        id: 'color-visualization-tips',
        title: 'Visualizing Colors Effectively',
        content: 'Start by remembering a color you\'ve seen - like a red rose or blue sky. Don\'t worry if you can\'t "see" it clearly in your mind. Some people feel colors, sense them, or just think about them. Any way that works for you is perfect.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['visualization', 'colors'],
    tags: ['colors', 'visualization', 'imagination', 'technique'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'changing-feelings',
    title: 'Using Colors to Shift Your Mood',
    category: 'techniques',
    content: [
      {
        id: 'mood-color-shifting',
        title: 'Colors for Mood Changes',
        content: 'Different colors can shift how you feel. Blue tends to calm, red energizes, green balances, yellow uplifts. Try surrounding yourself with a color or imagining breathing it in. Notice how different colors affect your mood.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['colors', 'mood'],
    tags: ['colors', 'mood', 'emotions', 'shifting'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'imagination-healing',
    title: 'Your Imagination as a Healing Tool',
    category: 'core-concepts',
    content: [
      {
        id: 'imagination-power',
        title: 'The Power of Mental Images',
        content: 'Your brain responds to imagined experiences almost like real ones. When you imagine feeling peaceful, your body begins to relax. This is why visualization works - your imagination is a powerful tool for creating positive changes in how you feel.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['imagination', 'healing'],
    tags: ['imagination', 'visualization', 'healing', 'mental-images'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'safe-space-visualization',
    title: 'Creating Your Safe Space',
    category: 'techniques',
    content: [
      {
        id: 'mental-safe-space',
        title: 'Imagining Your Perfect Peaceful Place',
        content: 'Close your eyes and imagine a place where you feel completely safe and peaceful. It might be a beach, forest, cozy room, or fantasy location. Add details that make it special for you. You can visit this place in your mind anytime you need comfort.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['visualization', 'safety'],
    tags: ['safe-space', 'visualization', 'comfort', 'peace'],
    lastUpdated: '2024-01-15'
  },

  // ========== HEART & SELF-SOOTHING ==========
  {
    id: 'heart-calming',
    title: 'Heart-Centered Calming',
    category: 'techniques',
    content: [
      {
        id: 'heart-soothing-practice',
        title: 'Using Your Heart to Self-Soothe',
        content: 'Place both hands on your heart and breathe slowly. Feel your heartbeat under your hands. This activates your heart\'s intelligence and triggers your body\'s natural calming response. Your heart has its own nervous system that can help regulate your entire body.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['heart', 'calming'],
    tags: ['heart', 'calming', 'self-soothing', 'regulation'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'self-soothing',
    title: 'Self-Soothing Techniques',
    category: 'techniques',
    content: [
      {
        id: 'calming-yourself',
        title: 'How to Calm Yourself',
        content: 'Self-soothing means being your own source of comfort. Try gentle self-touch, slow breathing, saying kind words to yourself, or imagining being held by someone who loves you. These techniques activate your innate ability to self-regulate.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['self-soothing', 'regulation'],
    tags: ['self-soothing', 'calming', 'comfort', 'regulation'],
    lastUpdated: '2024-01-15'
  },

  // ========== BODY AWARENESS ==========
  {
    id: 'physical-sensation-awareness',
    title: 'Noticing Body Sensations',
    category: 'practices',
    content: [
      {
        id: 'body-awareness-practice',
        title: 'Developing Body Awareness',
        content: 'Take a moment to scan your body from head to toe. Notice areas that feel tense, relaxed, warm, cool, heavy, or light. Don\'t try to change anything - just observe with curiosity. This awareness helps you understand your body\'s messages.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['body-awareness', 'sensations'],
    tags: ['body', 'awareness', 'sensations', 'mindfulness'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'feeling-energy-flow',
    title: 'Sensing Energy in Your Body',
    category: 'techniques',
    content: [
      {
        id: 'energy-sensing-practice',
        title: 'How to Feel Energy',
        content: 'Rub your hands together vigorously for 10 seconds, then slowly pull them apart. You might feel warmth, tingling, or a sense of connection between your palms. This is your energy field. With practice, you can sense this energy throughout your body.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['energy-sensing', 'awareness'],
    tags: ['energy', 'sensing', 'body', 'awareness'],
    lastUpdated: '2024-01-15'
  },

  // ========== COLOR BREATHING ==========
  {
    id: 'energizing-visualization',
    title: 'Red Light for Energy',
    category: 'techniques',
    content: [
      {
        id: 'red-energy-breathing',
        title: 'Breathing Red Light for Energy',
        content: 'Imagine breathing in warm, vibrant red light. See or feel this energizing red light filling your body, especially your lower torso. Red light represents vitality, strength, and grounding energy. Use this when you need more physical energy or motivation.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['color-breathing', 'energy'],
    tags: ['red', 'energy', 'visualization', 'breathing'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'calming-visualization',
    title: 'Blue Light for Calm',
    category: 'techniques',
    content: [
      {
        id: 'blue-calm-breathing',
        title: 'Breathing Blue Light for Peace',
        content: 'Imagine breathing in cool, peaceful blue light. Let this calming blue light fill your body, especially around your throat and head. Blue light represents peace, truth, and communication. Use this when you need to feel more calm or centered.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['color-breathing', 'calm'],
    tags: ['blue', 'calm', 'visualization', 'breathing'],
    lastUpdated: '2024-01-15'
  },

  // ========== HANDS & TOUCH ==========
  {
    id: 'palm-power',
    title: 'Energy in Your Hands',
    category: 'core-concepts',
    content: [
      {
        id: 'hand-energy-centers',
        title: 'Your Hands as Energy Tools',
        content: 'Your hands have energy centers in the palms and fingertips. Many healing traditions use hands to direct healing energy. You can feel this by rubbing your palms together and sensing the warmth or tingling. Your hands naturally know how to comfort and heal.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['hands', 'energy'],
    tags: ['hands', 'palms', 'energy', 'healing'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'self-love-touch',
    title: 'Self-Love Through Touch',
    category: 'practices',
    content: [
      {
        id: 'heart-hand-practice',
        title: 'Comforting Yourself with Touch',
        content: 'Place your hands on your heart and breathe slowly. This simple gesture sends your nervous system a message of safety and love. You can also try gentle self-hugs, stroking your arms, or placing a hand on your belly. Loving touch is healing.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['self-love', 'touch'],
    tags: ['self-love', 'touch', 'heart', 'comfort'],
    lastUpdated: '2024-01-15'
  },

  // ========== SOUND & VOICE ==========
  {
    id: 'simple-sound-healing',
    title: 'Healing with Simple Sounds',
    category: 'techniques',
    content: [
      {
        id: 'easy-vocal-healing',
        title: 'Using Your Voice for Healing',
        content: 'Try humming, sighing "ahhh," or making any sound that feels good. Vibration from your voice massages your body from the inside. Don\'t worry about how it sounds - focus on how it feels. Even a gentle "mmm" can be wonderfully soothing.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['sound-healing', 'voice'],
    tags: ['sound', 'voice', 'healing', 'vibration'],
    lastUpdated: '2024-01-15'
  },

  // ========== EMOTIONAL AWARENESS ==========
  {
    id: 'feeling-recognition',
    title: 'Recognizing Your Emotions',
    category: 'core-concepts',
    content: [
      {
        id: 'emotion-awareness-practice',
        title: 'How to Identify Feelings',
        content: 'Pause and ask yourself "What am I feeling right now?" Notice if you feel happy, sad, angry, excited, worried, or peaceful. You might feel multiple emotions at once. Just naming your feelings helps you understand and process them better.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['emotions', 'awareness'],
    tags: ['emotions', 'feelings', 'awareness', 'recognition'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'energy-awareness',
    title: 'Noticing Your Energy Levels',
    category: 'core-concepts',
    content: [
      {
        id: 'vitality-awareness-practice',
        title: 'Checking Your Energy',
        content: 'Throughout the day, pause and notice your energy level. Do you feel energized, tired, restless, or calm? Where do you feel this in your body? This awareness helps you understand what activities, foods, or thoughts affect your vitality.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['energy', 'awareness'],
    tags: ['energy', 'vitality', 'awareness', 'body'],
    lastUpdated: '2024-01-15'
  },

  // ========== SCIENCE CONCEPTS ==========
  {
    id: 'stress-hormones-explained',
    title: 'Stress Chemicals in Your Body',
    category: 'science',
    content: [
      {
        id: 'stress-chemistry-simple',
        title: 'Understanding Stress Hormones',
        content: 'When stressed, your body releases cortisol and adrenaline - chemicals that give you energy to handle danger. In small amounts, they\'re helpful. But chronic stress keeps these chemicals high, which can make you feel anxious, tired, or overwhelmed.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['stress', 'hormones'],
    tags: ['stress', 'hormones', 'cortisol', 'adrenaline'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'chronic-stress-effects',
    title: 'What Chronic Stress Does to Your Body',
    category: 'science',
    content: [
      {
        id: 'long-term-stress-impact',
        title: 'Effects of Long-term Stress',
        content: 'Chronic stress keeps your body in constant alert mode, which can lead to fatigue, anxiety, digestive issues, and weakened immunity. The good news is that relaxation practices can help reset your system and restore natural balance.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['stress', 'health'],
    tags: ['chronic-stress', 'health', 'effects', 'body'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'endorphins-simple',
    title: 'Your Body\'s Natural Feel-Good Chemicals',
    category: 'science',
    content: [
      {
        id: 'natural-happiness-chemicals',
        title: 'Endorphins and Feel-Good Hormones',
        content: 'Your body makes natural "happiness chemicals" like endorphins, serotonin, and dopamine. Exercise, laughter, music, and acts of kindness can increase these feel-good chemicals. This is why certain activities naturally boost your mood.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['endorphins', 'happiness'],
    tags: ['endorphins', 'happiness', 'serotonin', 'dopamine'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'triggering-calm',
    title: 'How to Activate Your Relaxation Response',
    category: 'techniques',
    content: [
      {
        id: 'relaxation-activation',
        title: 'Switching on Calm Mode',
        content: 'Deep breathing, gentle movement, positive visualization, and gratitude practices all activate your relaxation response. Even 30 seconds of slow, deep breathing signals your nervous system to shift from stress mode to calm mode.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['relaxation', 'nervous-system'],
    tags: ['relaxation', 'calm', 'activation', 'nervous-system'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'electromagnetic-body',
    title: 'Your Body\'s Electrical Field',
    category: 'science',
    content: [
      {
        id: 'bioelectric-field-simple',
        title: 'The Electricity in Your Body',
        content: 'Your heart, brain, and nervous system all run on electrical signals. This creates a measurable energy field around your body. When you\'re healthy and relaxed, this field is strong and coherent. Stress and illness can make it weak or chaotic.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['biofield', 'electricity'],
    tags: ['biofield', 'electromagnetic', 'energy', 'electrical'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'field-harmony',
    title: 'Energy Field Coherence',
    category: 'science',
    content: [
      {
        id: 'coherent-energy-field',
        title: 'What Makes an Energy Field Coherent',
        content: 'Coherence means your energy field is organized and harmonious rather than chaotic. Positive emotions, meditation, and gratitude create coherence. When your field is coherent, you feel better physically and emotionally, and you have a positive effect on others.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['coherence', 'energy-field'],
    tags: ['coherence', 'harmony', 'energy-field', 'organization'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'frequency-feelings',
    title: 'How Vibration Affects Your Feelings',
    category: 'core-concepts',
    content: [
      {
        id: 'vibration-emotion-connection',
        title: 'The Connection Between Vibration and Emotions',
        content: 'Everything vibrates at different frequencies, including your thoughts and emotions. Love and joy vibrate at higher frequencies than fear and anger. By choosing higher-vibrating thoughts and activities, you can naturally shift how you feel.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['vibration', 'emotions'],
    tags: ['vibration', 'frequency', 'emotions', 'feelings'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'resonance-attraction',
    title: 'Like Attracts Like',
    category: 'core-concepts',
    content: [
      {
        id: 'energy-attraction-principle',
        title: 'How Your Energy Attracts Similar Energy',
        content: 'Your emotional and energetic state tends to attract similar energies. When you\'re grateful and positive, you notice more good things. When you\'re worried and negative, problems seem to multiply. This is why working on your inner state is so powerful.',
        hyperlinks: []
      }
    ],
    readTime: 1,
    difficulty: 'beginner',
    relatedTopics: ['attraction', 'resonance'],
    tags: ['attraction', 'resonance', 'like-attracts-like', 'energy'],
    lastUpdated: '2024-01-15'
  }
];