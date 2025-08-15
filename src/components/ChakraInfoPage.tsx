import { useState, useEffect } from 'react';
import { chakras, Chakra, ArticleCategory } from "@/types/chakra";
import { articles } from "@/data/articles";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { ArrowLeft, ChevronRight, Search, BookmarkIcon, Star, Clock, TrendingUp } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";

interface ChakraInfoPageProps {
  onBack: () => void;
  onChakraSelect: (chakra: Chakra) => void;
  onArticleSelect: (articleId: string) => void;
  onBookmarksClick: () => void;
  initialSearchTag?: string;
}

export function ChakraInfoPage({ onBack, onChakraSelect, onArticleSelect, onBookmarksClick, initialSearchTag }: ChakraInfoPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'all'>('all');
  const { totalBookmarks } = useBookmarks();

  // Set initial search tag when provided
  useEffect(() => {
    if (initialSearchTag) {
      setSearchQuery(initialSearchTag);
      setActiveCategory('all');
    }
  }, [initialSearchTag]);

  const featuredArticles = articles.filter(article => article.featured);
  
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categoryDisplayNames: Record<ArticleCategory | 'all', string> = {
    'all': 'All Topics',
    'core-concepts': 'Core Concepts',
    'practices': 'Practices',
    'science': 'Science',
    'healing': 'Healing',
    'history': 'History',
    'psychology': 'Psychology',
    'techniques': 'Techniques'
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-emerald-500/20 text-emerald-400';
      case 'intermediate': return 'bg-amber-500/20 text-amber-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering article click
    setSearchQuery(tag);
    setActiveCategory('all'); // Reset category to show all results
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
              <h1 className="text-xl font-bold text-foreground">Chakra Guide</h1>
              <p className="text-sm text-muted-foreground">Explore energy centers & wisdom</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onBookmarksClick}
            className="flex items-center gap-2"
          >
            <BookmarkIcon className="h-4 w-4" />
            {totalBookmarks > 0 && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-5">
                {totalBookmarks}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Individual Chakras */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Individual Chakras</h2>
          <div className="space-y-3">
            {chakras.map((chakra) => (
              <button
                key={chakra.id}
                onClick={() => onChakraSelect(chakra)}
                className="w-full bg-card rounded-2xl p-4 text-left hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  {/* Chakra circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      backgroundColor: `hsl(var(--${chakra.color}))`,
                      boxShadow: `0 0 20px hsl(var(--${chakra.color}) / 0.3)`
                    }}
                  >
                    <span className="text-white font-bold">{chakra.position}</span>
                  </div>

                  {/* Chakra info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {chakra.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{chakra.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                        {chakra.element}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {chakra.location}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles and topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Featured Articles */}
        {searchQuery === '' && featuredArticles.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-amber-400" />
              <h2 className="text-lg font-semibold text-foreground">Featured Topics</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {featuredArticles.map(article => (
                <Card 
                  key={article.id}
                  className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
                  onClick={() => onArticleSelect(article.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {categoryDisplayNames[article.category]}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Featured</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-card-foreground group-hover:text-primary transition-colors mb-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min
                    <Badge className={getDifficultyColor(article.difficulty)} variant="outline">
                      {article.difficulty}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as ArticleCategory | 'all')}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
            {Object.entries(categoryDisplayNames).map(([key, label]) => (
              <TabsTrigger key={key} value={key} className="text-xs">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Articles Grid */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map(article => (
                <Card 
                  key={article.id}
                  className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
                  onClick={() => onArticleSelect(article.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {categoryDisplayNames[article.category]}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-medium text-card-foreground group-hover:text-primary transition-colors mb-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min
                    <Badge className={getDifficultyColor(article.difficulty)} variant="outline">
                      {article.difficulty}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map(tag => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-colors"
                        onClick={(e) => handleTagClick(tag, e)}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

          </div>
        </Tabs>
      </div>
    </div>
  );
}