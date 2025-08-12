import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { ArrowLeft, Search, Clock, BookOpen, Trash2, ExternalLink } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { articles, miniArticles } from '@/data/articles';
import { Bookmark } from '@/types/chakra';

interface BookmarksPageProps {
  onBack: () => void;
  onNavigateToArticle: (articleId: string) => void;
}

export function BookmarksPage({ onBack, onNavigateToArticle }: BookmarksPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<Bookmark['category']>('to-read');
  
  const { 
    bookmarks, 
    removeBookmark, 
    updateBookmarkCategory,
    getBookmarksByCategory,
    totalBookmarks 
  } = useBookmarks();

  const filteredBookmarks = getBookmarksByCategory(activeTab).filter(bookmark => {
    const article = articles.find(a => a.id === bookmark.articleId) || 
                   miniArticles.find(m => m.id === bookmark.articleId);
    
    if (!article) return false;
    
    const searchLower = searchQuery.toLowerCase();
    return article.title.toLowerCase().includes(searchLower) ||
           ('tags' in article && article.tags?.some(tag => tag.toLowerCase().includes(searchLower)));
  });

  const getArticleDetails = (articleId: string) => {
    return articles.find(a => a.id === articleId) || 
           miniArticles.find(m => m.id === articleId);
  };

  const moveBookmark = (articleId: string, newCategory: Bookmark['category']) => {
    updateBookmarkCategory(articleId, newCategory);
  };

  const getCategoryCount = (category: Bookmark['category']) => {
    return getBookmarksByCategory(category).length;
  };

  return (
    <div className="min-h-screen bg-gradient-meditation">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-foreground hover:bg-muted"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">My Bookmarks</h1>
            <p className="text-sm text-muted-foreground">
              {totalBookmarks} saved articles
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Bookmark['category'])}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="to-read" className="flex items-center gap-2">
              To Read
              <Badge variant="secondary" className="text-xs">
                {getCategoryCount('to-read')}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              Favorites
              <Badge variant="secondary" className="text-xs">
                {getCategoryCount('favorites')}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="recently-viewed" className="flex items-center gap-2">
              Recent
              <Badge variant="secondary" className="text-xs">
                {getCategoryCount('recently-viewed')}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {['to-read', 'favorites', 'recently-viewed'].map(category => (
            <TabsContent key={category} value={category}>
              {filteredBookmarks.length === 0 ? (
                <Card className="p-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-card-foreground mb-2">
                    {searchQuery ? 'No matching bookmarks' : `No ${category.replace('-', ' ')} yet`}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? 'Try adjusting your search terms'
                      : `Start exploring articles to add them to your ${category.replace('-', ' ')} list`
                    }
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredBookmarks.map(bookmark => {
                    const article = getArticleDetails(bookmark.articleId);
                    if (!article) return null;

                    const isFullArticle = 'category' in article;

                    return (
                      <Card key={bookmark.articleId} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              {isFullArticle && (
                                <Badge variant="outline" className="text-xs">
                                  {(article as any).category.replace('-', ' ')}
                                </Badge>
                              )}
                              <Badge 
                                variant="secondary" 
                                className="text-xs"
                              >
                                {isFullArticle ? 'Article' : 'Quick Read'}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Saved {new Date(bookmark.dateBookmarked).toLocaleDateString()}
                              </span>
                            </div>

                            <button
                              onClick={() => onNavigateToArticle(bookmark.articleId)}
                              className="text-left group block w-full"
                            >
                              <h4 className="font-medium text-card-foreground group-hover:text-primary transition-colors mb-2 truncate">
                                {article.title}
                              </h4>
                              
                              {isFullArticle && (
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {(article as any).readTime} min
                                  </div>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      (article as any).difficulty === 'beginner' ? 'text-emerald-400' :
                                      (article as any).difficulty === 'intermediate' ? 'text-amber-400' :
                                      'text-red-400'
                                    }`}
                                  >
                                    {(article as any).difficulty}
                                  </Badge>
                                </div>
                              )}

                              {'content' in article && !Array.isArray(article.content) && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {article.content.substring(0, 150)}...
                                </p>
                              )}
                            </button>

                            {bookmark.notes && (
                              <div className="mt-2 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
                                <strong>Notes:</strong> {bookmark.notes}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onNavigateToArticle(bookmark.articleId)}
                              className="h-8 w-8"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>

                            {/* Category move buttons */}
                            {activeTab !== 'favorites' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => moveBookmark(bookmark.articleId, 'favorites')}
                                className="text-xs"
                              >
                                ❤️
                              </Button>
                            )}
                            
                            {activeTab !== 'to-read' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => moveBookmark(bookmark.articleId, 'to-read')}
                                className="text-xs"
                              >
                                📚
                              </Button>
                            )}

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeBookmark(bookmark.articleId)}
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}