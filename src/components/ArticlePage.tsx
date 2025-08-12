import { useState } from 'react';
import { Article, MiniArticle } from '@/types/chakra';
import { articles, miniArticles } from '@/data/articles';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ArrowLeft, Clock, BookOpen, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { MiniArticleModal } from './MiniArticleModal';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface ArticlePageProps {
  articleId: string;
  onBack: () => void;
  onNavigateToArticle: (articleId: string) => void;
}

export function ArticlePage({ articleId, onBack, onNavigateToArticle }: ArticlePageProps) {
  const [selectedMiniArticle, setSelectedMiniArticle] = useState<MiniArticle | null>(null);
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  
  const article = articles.find(a => a.id === articleId);
  
  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-meditation flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const bookmarked = isBookmarked(article.id);
  const relatedArticles = articles.filter(a => article.relatedTopics.includes(a.id));

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      removeBookmark(article.id);
    } else {
      addBookmark(article.id);
    }
  };

  const handleHyperlinkClick = (targetId: string, type: 'article' | 'mini-article') => {
    if (type === 'mini-article') {
      const miniArticle = miniArticles.find(m => m.id === targetId);
      if (miniArticle) {
        setSelectedMiniArticle(miniArticle);
      }
    } else {
      onNavigateToArticle(targetId);
    }
  };

  const renderContentWithHyperlinks = (content: string, hyperlinks?: Array<{text: string; targetId: string; type: 'article' | 'mini-article'}>) => {
    if (!hyperlinks || hyperlinks.length === 0) {
      return content;
    }

    let processedContent = content;
    
    hyperlinks.forEach(link => {
      const linkElement = `<button class="hyperlink-button" data-target="${link.targetId}" data-type="${link.type}">${link.text}</button>`;
      processedContent = processedContent.replace(
        new RegExp(`\\b${link.text}\\b`, 'gi'),
        linkElement
      );
    });

    return processedContent;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-emerald-500/20 text-emerald-400';
      case 'intermediate': return 'bg-amber-500/20 text-amber-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryDisplayName = (category: string) => {
    return category.replace('-', ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
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
              onClick={onBack}
              className="text-foreground hover:bg-muted"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={onBack} className="cursor-pointer">
                    Chakra Guide
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{article.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <Button
            variant={bookmarked ? "default" : "outline"}
            size="sm"
            onClick={handleBookmarkToggle}
            className="flex items-center gap-2"
          >
            {bookmarked ? (
              <>
                <BookmarkCheck className="h-4 w-4" />
                Bookmarked
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" />
                Bookmark
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="secondary">
              {getCategoryDisplayName(article.category)}
            </Badge>
            <Badge className={getDifficultyColor(article.difficulty)}>
              {article.difficulty}
            </Badge>
            {article.featured && (
              <Badge className="bg-gradient-to-r from-primary to-primary-foreground text-white">
                Featured
              </Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">{article.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {article.readTime} min read
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {article.content.length} sections
            </div>
            <div>
              Updated {new Date(article.lastUpdated).toLocaleDateString()}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Article Content */}
        <div className="space-y-8">
          {article.content.map((section, index) => (
            <Card key={section.id} className="p-6">
              <h2 className="text-xl font-semibold text-card-foreground mb-4">
                {section.title}
              </h2>
              <div 
                className="prose prose-gray dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: renderContentWithHyperlinks(section.content, section.hyperlinks)
                }}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.classList.contains('hyperlink-button')) {
                    const targetId = target.getAttribute('data-target');
                    const type = target.getAttribute('data-type') as 'article' | 'mini-article';
                    if (targetId) {
                      handleHyperlinkClick(targetId, type);
                    }
                  }
                }}
              />
            </Card>
          ))}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">Related Articles</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map(relatedArticle => (
                <Card 
                  key={relatedArticle.id}
                  className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
                  onClick={() => onNavigateToArticle(relatedArticle.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {getCategoryDisplayName(relatedArticle.category)}
                    </Badge>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h4 className="font-medium text-card-foreground group-hover:text-primary transition-colors mb-2">
                    {relatedArticle.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {relatedArticle.readTime} min
                    <Badge className={getDifficultyColor(relatedArticle.difficulty)} variant="outline">
                      {relatedArticle.difficulty}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mini Article Modal */}
      {selectedMiniArticle && (
        <MiniArticleModal
          miniArticle={selectedMiniArticle}
          onClose={() => setSelectedMiniArticle(null)}
          onNavigateToArticle={onNavigateToArticle}
        />
      )}

      <style>{`
        .hyperlink-button {
          color: hsl(var(--primary));
          text-decoration: underline;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          font: inherit;
        }
        .hyperlink-button:hover {
          color: hsl(var(--primary-foreground));
        }
      `}</style>
    </div>
  );
}