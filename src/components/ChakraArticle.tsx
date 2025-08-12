import { Chakra } from "@/types/chakra";
import { articles, miniArticles } from "@/data/articles";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ArrowLeft, ExternalLink, BookmarkIcon, Clock, Star, Lightbulb, Heart, Brain } from "lucide-react";
import { useState } from "react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { MiniArticleModal } from "./MiniArticleModal";

interface ChakraArticleProps {
  chakra: Chakra;
  onBack: () => void;
  onArticleSelect: (articleId: string) => void;
}

const chakraDetails = {
  root: {
    keywords: ['grounding', 'survival', 'stability', 'security', 'foundation'],
    practices: ['walking meditation', 'gardening', 'yoga poses', 'grounding exercises'],
    crystals: ['Red Jasper', 'Hematite', 'Black Tourmaline', 'Garnet', 'Smoky Quartz'],
    foods: ['Red foods', 'Root vegetables', 'Protein-rich foods', 'Beets', 'Tomatoes'],
    symptoms: ['Anxiety', 'Fear', 'Restlessness', 'Financial insecurity', 'Eating disorders'],
    physicalIssues: ['Lower back pain', 'Leg problems', 'Immune disorders', 'Fatigue'],
    emotionalSigns: ['Feeling ungrounded', 'Lack of focus', 'Insecurity', 'Survival fears'],
    balancedSigns: ['Feeling secure', 'Grounded presence', 'Financial stability', 'Physical vitality']
  },
  sacral: {
    keywords: ['creativity', 'sexuality', 'emotions', 'pleasure', 'relationships'],
    practices: ['hip-opening yoga', 'creative arts', 'dance', 'emotional expression'],
    crystals: ['Carnelian', 'Orange Calcite', 'Sunstone', 'Tiger\'s Eye'],
    foods: ['Orange foods', 'Nuts', 'Seeds', 'Sweet fruits', 'Oranges'],
    symptoms: ['Creative blocks', 'Relationship issues', 'Sexual dysfunction', 'Emotional numbness'],
    physicalIssues: ['Reproductive issues', 'Lower back pain', 'Hip problems', 'Bladder issues'],
    emotionalSigns: ['Lack of creativity', 'Emotional instability', 'Guilt', 'Sexual shame'],
    balancedSigns: ['Creative flow', 'Healthy relationships', 'Emotional balance', 'Sexual vitality']
  },
  solar: {
    keywords: ['confidence', 'personal power', 'self-esteem', 'willpower', 'transformation'],
    practices: ['core strengthening', 'sun meditation', 'affirmations', 'goal setting'],
    crystals: ['Citrine', 'Yellow Jasper', 'Tiger\'s Eye', 'Pyrite'],
    foods: ['Yellow foods', 'Whole grains', 'Bananas', 'Corn', 'Lemon'],
    symptoms: ['Low self-esteem', 'Lack of direction', 'Digestive issues', 'Control issues'],
    physicalIssues: ['Digestive problems', 'Stomach issues', 'Liver problems', 'Diabetes'],
    emotionalSigns: ['Low confidence', 'Victim mentality', 'Perfectionism', 'Anger issues'],
    balancedSigns: ['Strong confidence', 'Clear direction', 'Healthy boundaries', 'Personal power']
  },
  heart: {
    keywords: ['love', 'compassion', 'forgiveness', 'connection', 'healing'],
    practices: ['loving-kindness meditation', 'heart opening yoga', 'gratitude practice', 'self-compassion'],
    crystals: ['Rose Quartz', 'Green Aventurine', 'Emerald', 'Malachite'],
    foods: ['Green foods', 'Leafy vegetables', 'Green tea', 'Broccoli', 'Spinach'],
    symptoms: ['Difficulty loving', 'Isolation', 'Jealousy', 'Codependency'],
    physicalIssues: ['Heart problems', 'Lung issues', 'Circulation problems', 'Arm pain'],
    emotionalSigns: ['Closed off emotionally', 'Fear of intimacy', 'Resentment', 'Lack of empathy'],
    balancedSigns: ['Unconditional love', 'Compassion', 'Healthy relationships', 'Emotional healing']
  },
  throat: {
    keywords: ['communication', 'truth', 'expression', 'authenticity', 'creativity'],
    practices: ['chanting', 'singing', 'journaling', 'public speaking', 'neck stretches'],
    crystals: ['Blue Lace Agate', 'Sodalite', 'Lapis Lazuli', 'Aquamarine'],
    foods: ['Blue foods', 'Herbal teas', 'Blueberries', 'Water', 'Throat-soothing foods'],
    symptoms: ['Communication issues', 'Fear of speaking', 'Lying', 'Gossip'],
    physicalIssues: ['Throat problems', 'Thyroid issues', 'Neck pain', 'Mouth problems'],
    emotionalSigns: ['Inability to express', 'Fear of judgment', 'Lack of authenticity', 'Shyness'],
    balancedSigns: ['Clear communication', 'Authentic expression', 'Good listening', 'Creative voice']
  },
  thirdEye: {
    keywords: ['intuition', 'wisdom', 'insight', 'imagination', 'psychic abilities'],
    practices: ['meditation', 'visualization', 'dream work', 'third eye activation'],
    crystals: ['Amethyst', 'Lapis Lazuli', 'Fluorite', 'Clear Quartz'],
    foods: ['Purple foods', 'Dark berries', 'Grapes', 'Eggplant', 'Purple cabbage'],
    symptoms: ['Lack of intuition', 'Confusion', 'Poor memory', 'Lack of imagination'],
    physicalIssues: ['Headaches', 'Eye problems', 'Sinus issues', 'Mental fog'],
    emotionalSigns: ['Lack of clarity', 'Overthinking', 'Denial', 'Disconnection from intuition'],
    balancedSigns: ['Clear intuition', 'Wisdom', 'Psychic abilities', 'Mental clarity']
  },
  crown: {
    keywords: ['spirituality', 'consciousness', 'enlightenment', 'divine connection', 'unity'],
    practices: ['meditation', 'prayer', 'mindfulness', 'spiritual study', 'silence'],
    crystals: ['Clear Quartz', 'Amethyst', 'Selenite', 'Diamond'],
    foods: ['Fasting', 'Light foods', 'Pure water', 'Violet foods', 'Spiritual nourishment'],
    symptoms: ['Spiritual disconnection', 'Materialism', 'Cynicism', 'Lack of purpose'],
    physicalIssues: ['Neurological disorders', 'Depression', 'Chronic fatigue', 'Sensitivity'],
    emotionalSigns: ['Spiritual emptiness', 'Lack of purpose', 'Disconnection', 'Confusion'],
    balancedSigns: ['Spiritual connection', 'Higher consciousness', 'Divine wisdom', 'Unity awareness']
  }
};

export function ChakraArticle({ chakra, onBack, onArticleSelect }: ChakraArticleProps) {
  const [selectedMiniArticle, setSelectedMiniArticle] = useState<string | null>(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const details = chakraDetails[chakra.id as keyof typeof chakraDetails];
  
  // Safety check to prevent undefined errors
  if (!details) {
    console.error(`Chakra details not found for chakra ID: ${chakra.id}`);
    return <div>Error: Chakra details not found</div>;
  }
  
  // Get related articles for this chakra
  const relatedArticles = articles.filter(article => 
    article.relatedTopics.includes(chakra.name.toLowerCase()) ||
    article.tags.some(tag => details.keywords.includes(tag.toLowerCase()))
  ).slice(0, 6);

  const renderHyperlinkedText = (text: string) => {
    const hyperlinkedTerms = miniArticles.map(mini => mini.title.toLowerCase());
    const words = text.split(' ');
    
    return words.map((word, index) => {
      const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
      const miniArticle = miniArticles.find(mini => 
        mini.title.toLowerCase() === cleanWord ||
        mini.title.toLowerCase().includes(cleanWord)
      );
      
      if (miniArticle) {
        return (
          <span key={index}>
            <HoverCard>
              <HoverCardTrigger asChild>
                <button
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                  onClick={() => {
                    if (window.innerWidth <= 768) {
                      setSelectedMiniArticle(miniArticle.id);
                      setIsMobileModalOpen(true);
                    }
                  }}
                >
                  {word}
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">{miniArticle.title}</h4>
                  <p className="text-sm text-muted-foreground">{miniArticle.content}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const fullArticle = articles.find(a => a.id === miniArticle.relatedArticles[0]);
                      if (fullArticle) onArticleSelect(fullArticle.id);
                    }}
                    className="w-full"
                  >
                    Read Full Article
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>
            {index < words.length - 1 ? ' ' : ''}
          </span>
        );
      }
      
      return <span key={index}>{word}{index < words.length - 1 ? ' ' : ''}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-meditation">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-muted"
              onClick={onBack}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">{chakra.name} Chakra</h1>
              <p className="text-sm text-muted-foreground">Complete guide & insights</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Chakra Header */}
        <div className="text-center">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-elevation"
            style={{
              backgroundColor: `hsl(var(--${chakra.color}))`,
              boxShadow: `0 0 60px hsl(var(--${chakra.color}) / 0.5)`
            }}
          >
            <span className="text-6xl">{chakra.symbol}</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">{chakra.name} Chakra</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {renderHyperlinkedText(chakra.description)}
          </p>
        </div>

        {/* Basic Information */}
        <div className="bg-card rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-6 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Essential Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Sanskrit Name</span>
              <div className="font-medium text-card-foreground text-lg">{chakra.sanskritName}</div>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Element</span>
              <div className="font-medium text-card-foreground">{chakra.element}</div>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Location</span>
              <div className="font-medium text-card-foreground">{chakra.location}</div>
            </div>
          </div>
        </div>

        {/* Associated Traits */}
        <div className="bg-card rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Star className="h-5 w-5" />
            Core Qualities & Traits
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {chakra.traits.map((trait, index) => (
              <Badge
                key={index}
                variant="outline"
                className="justify-center py-2 text-sm"
                style={{
                  backgroundColor: `hsl(var(--${chakra.color}) / 0.1)`,
                  borderColor: `hsl(var(--${chakra.color}) / 0.3)`,
                  color: `hsl(var(--${chakra.color}))`
                }}
              >
                {trait}
              </Badge>
            ))}
          </div>
        </div>

        {/* Physical & Emotional Associations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Physical Associations
            </h3>
            <div className="space-y-3">
              {chakra.physicalAssociations.map((association, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0" 
                    style={{ backgroundColor: `hsl(var(--${chakra.color}))` }} 
                  />
                  <span className="text-card-foreground text-sm">{association}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              When Balanced vs. Imbalanced
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-emerald-400 mb-2">✓ When Balanced:</h4>
                <div className="space-y-1">
                  {details.balancedSigns.map((sign, index) => (
                    <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-emerald-400" />
                      {sign}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-red-400 mb-2">⚠ When Imbalanced:</h4>
                <div className="space-y-1">
                  {details.emotionalSigns.map((sign, index) => (
                    <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-red-400" />
                      {sign}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Healing & Balancing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">💎 Healing Crystals</h3>
            <div className="flex flex-wrap gap-2">
              {details.crystals.map((crystal, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {crystal}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">🍎 Nourishing Foods</h3>
            <div className="flex flex-wrap gap-2">
              {details.foods.map((food, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {food}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Healing Practices */}
        <div className="bg-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">🧘‍♀️ Recommended Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {details.practices.map((practice, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: `hsl(var(--${chakra.color}))` }} 
                />
                <span className="text-card-foreground capitalize">{practice}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Affirmations */}
        <div className="bg-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">✨ Healing Affirmations</h3>
          <div className="space-y-4">
            {chakra.affirmations.map((affirmation, index) => (
              <div 
                key={index} 
                className="p-4 rounded-xl border-l-4 bg-muted/30" 
                style={{ borderColor: `hsl(var(--${chakra.color}))` }}
              >
                <p className="text-card-foreground italic">"{affirmation}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Deepen Your Understanding
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedArticles.map(article => (
                <div
                  key={article.id}
                  className="p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
                  onClick={() => onArticleSelect(article.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {article.category.replace('-', ' ')}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{article.readTime}m</span>
                    </div>
                  </div>
                  <h4 className="font-medium text-card-foreground group-hover:text-primary transition-colors mb-2">
                    {article.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        article.difficulty === 'beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                        article.difficulty === 'intermediate' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {article.difficulty}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isBookmarked(article.id)) {
                          removeBookmark(article.id);
                        } else {
                          addBookmark(article.id);
                        }
                      }}
                    >
                      <BookmarkIcon 
                        className={`h-4 w-4 ${isBookmarked(article.id) ? 'fill-current' : ''}`} 
                      />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Mini-Article Modal */}
      {selectedMiniArticle && (
        <MiniArticleModal
          miniArticle={miniArticles.find(m => m.id === selectedMiniArticle)!}
          onClose={() => {
            setSelectedMiniArticle(null);
            setIsMobileModalOpen(false);
          }}
          onNavigateToArticle={onArticleSelect}
        />
      )}
    </div>
  );
}