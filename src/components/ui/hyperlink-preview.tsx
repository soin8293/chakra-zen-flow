import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ExternalLink, Eye, BookOpen } from 'lucide-react';
import { miniArticles } from '@/data/miniArticles';
import { cn } from '@/lib/utils';

interface HyperlinkPreviewProps {
  text: string;
  targetId: string;
  type: 'mini-article' | 'article';
  onNavigate: (targetId: string) => void;
  className?: string;
}

export function HyperlinkPreview({ 
  text, 
  targetId, 
  type, 
  onNavigate, 
  className 
}: HyperlinkPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const previewContent = miniArticles.find(article => article.id === targetId);
  
  if (!previewContent) {
    return (
      <Button
        variant="link"
        className={cn('h-auto p-0 text-primary underline-offset-4 hover:underline', className)}
        onClick={() => onNavigate(targetId)}
      >
        {text}
        <ExternalLink className="h-3 w-3 ml-1 inline" />
      </Button>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          className={cn(
            'h-auto p-0 text-primary underline-offset-4 hover:underline relative',
            'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5',
            'after:bg-gradient-to-r after:from-primary/30 after:to-primary/60 after:opacity-0',
            'hover:after:opacity-100 after:transition-opacity',
            className
          )}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {text}
          <Eye className="h-3 w-3 ml-1 inline opacity-60" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-80 p-0" 
        side="top" 
        align="start"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-sm font-medium line-clamp-2">
                {previewContent.title}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 shrink-0 ml-2"
                onClick={() => {
                  setIsOpen(false);
                  onNavigate(targetId);
                }}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground line-clamp-3 mb-2">
              {previewContent.content[0]?.content.slice(0, 150)}...
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{previewContent.readTime} min read</span>
                <span>•</span>
                <span className="capitalize">{previewContent.difficulty}</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => {
                  setIsOpen(false);
                  onNavigate(targetId);
                }}
              >
                <BookOpen className="h-3 w-3 mr-1" />
                Read
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}