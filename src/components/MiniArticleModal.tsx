import { MiniArticle } from '@/types/chakra';
import { articles } from '@/data/articles';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { BookOpen, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';

interface MiniArticleModalProps {
  miniArticle: MiniArticle;
  onClose: () => void;
  onNavigateToArticle: (articleId: string) => void;
}

export function MiniArticleModal({ miniArticle, onClose, onNavigateToArticle }: MiniArticleModalProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(miniArticle.id);
  
  const relatedArticles = articles.filter(article => 
    miniArticle.relatedArticles.includes(article.id)
  );

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      removeBookmark(miniArticle.id);
    } else {
      addBookmark(miniArticle.id, 'to-read');
    }
  };

  const handleContinueReading = (articleId: string) => {
    onClose();
    onNavigateToArticle(articleId);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-xl font-semibold pr-4">
              {miniArticle.title}
            </DialogTitle>
            <Button
              variant={bookmarked ? "default" : "outline"}
              size="sm"
              onClick={handleBookmarkToggle}
              className="flex items-center gap-2 shrink-0"
            >
              {bookmarked ? (
                <BookmarkCheck className="h-3 w-3" />
              ) : (
                <Bookmark className="h-3 w-3" />
              )}
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {miniArticle.content}
            </p>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Continue Reading
              </h4>
              <div className="space-y-2">
                {relatedArticles.map(article => (
                  <button
                    key={article.id}
                    onClick={() => handleContinueReading(article.id)}
                    className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                        {article.title}
                      </h5>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {article.category.replace('-', ' ')}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {article.readTime} min read
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          article.difficulty === 'beginner' ? 'text-emerald-400' :
                          article.difficulty === 'intermediate' ? 'text-amber-400' :
                          'text-red-400'
                        }`}
                      >
                        {article.difficulty}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}