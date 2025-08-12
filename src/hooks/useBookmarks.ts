import { useState, useEffect } from 'react';
import { Bookmark } from '@/types/chakra';

const BOOKMARKS_KEY = 'chakra-guide-bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(BOOKMARKS_KEY);
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (articleId: string, category: Bookmark['category'] = 'to-read') => {
    const newBookmark: Bookmark = {
      articleId,
      dateBookmarked: new Date().toISOString(),
      category
    };
    
    setBookmarks(prev => {
      // Check if already bookmarked
      if (prev.some(b => b.articleId === articleId)) {
        return prev;
      }
      return [...prev, newBookmark];
    });
  };

  const removeBookmark = (articleId: string) => {
    setBookmarks(prev => prev.filter(b => b.articleId !== articleId));
  };

  const updateBookmarkCategory = (articleId: string, category: Bookmark['category']) => {
    setBookmarks(prev => prev.map(b => 
      b.articleId === articleId ? { ...b, category } : b
    ));
  };

  const updateBookmarkNotes = (articleId: string, notes: string) => {
    setBookmarks(prev => prev.map(b => 
      b.articleId === articleId ? { ...b, notes } : b
    ));
  };

  const isBookmarked = (articleId: string) => {
    return bookmarks.some(b => b.articleId === articleId);
  };

  const getBookmarksByCategory = (category: Bookmark['category']) => {
    return bookmarks.filter(b => b.category === category);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    updateBookmarkCategory,
    updateBookmarkNotes,
    isBookmarked,
    getBookmarksByCategory,
    totalBookmarks: bookmarks.length
  };
}