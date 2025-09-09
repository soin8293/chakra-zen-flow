import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Target, Bookmark, BookmarkCheck } from 'lucide-react';
import { Article } from '@/types/chakra';
import { cn } from '@/lib/utils';

interface MiniArticleCardProps {
  article: Article;
  isBookmarked?: boolean;
  onRead: (articleId: string) => void;
  onBookmark?: (articleId: string) => void;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950 dark:border-emerald-800';
    case 'intermediate':
      return 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950 dark:border-amber-800';
    case 'advanced':
      return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800';
    default:
      return 'text-muted-foreground bg-muted border-border';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'techniques':
      return 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950 dark:border-blue-800';
    case 'practices':
      return 'text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950 dark:border-purple-800';
    case 'core-concepts':
      return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800';
    case 'science':
      return 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-800';
    default:
      return 'text-muted-foreground bg-muted border-border';
  }
};

export function MiniArticleCard({
  article,
  isBookmarked = false,
  onRead,
  onBookmark,
  variant = 'default',
  className
}: MiniArticleCardProps) {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';
  
  return (
    <Card 
      className={cn(
        'group hover:shadow-md transition-all duration-200 hover:border-primary/20',
        isFeatured && 'ring-2 ring-primary/10 bg-gradient-to-br from-background to-muted/20',
        className
      )}
    >
      <CardHeader className={cn('pb-2', isCompact && 'p-4 pb-2')}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              'font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2',
              isCompact ? 'text-sm' : 'text-base'
            )}>
              {article.title}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge 
                variant="outline" 
                className={cn('text-xs', getCategoryColor(article.category))}
              >
                {article.category.replace('-', ' ')}
              </Badge>
              <Badge 
                variant="outline" 
                className={cn('text-xs', getDifficultyColor(article.difficulty))}
              >
                {article.difficulty}
              </Badge>
            </div>
          </div>
          {onBookmark && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onBookmark(article.id);
              }}
              className={cn(
                'shrink-0 h-8 w-8 p-0 hover:bg-primary/10',
                isBookmarked && 'text-primary bg-primary/10'
              )}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-3.5 w-3.5" />
              ) : (
                <Bookmark className="h-3.5 w-3.5" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className={cn('pt-0', isCompact && 'p-4 pt-0')}>
        {!isCompact && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {article.content[0]?.content.slice(0, 120)}...
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{article.readTime} min</span>
            </div>
            {isFeatured && (
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                <span>Featured</span>
              </div>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRead(article.id)}
            className="h-7 px-3 text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <BookOpen className="h-3 w-3 mr-1" />
            Read
          </Button>
        </div>

        {!isCompact && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}