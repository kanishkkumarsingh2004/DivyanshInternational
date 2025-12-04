import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function usePageFlip(totalPages: number) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial page from URL or default to 0
  const initialPage = parseInt(searchParams.get('page') || '0', 10);
  const [currentPage, setCurrentPage] = useState(Math.min(Math.max(0, initialPage), totalPages - 1));
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  // Update URL when page changes
  const updateURL = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setDirection("forward");
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      updateURL(newPage);
      setTimeout(() => setIsFlipping(false), 1200);
    }
  }, [currentPage, totalPages, isFlipping, updateURL]);

  const prevPage = useCallback(() => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setDirection("backward");
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updateURL(newPage);
      setTimeout(() => setIsFlipping(false), 1200);
    }
  }, [currentPage, isFlipping, updateURL]);

  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < totalPages && page !== currentPage && !isFlipping) {
      setIsFlipping(true);
      setDirection(page > currentPage ? "forward" : "backward");
      setCurrentPage(page);
      updateURL(page);
      setTimeout(() => setIsFlipping(false), 1200);
    }
  }, [currentPage, totalPages, isFlipping, updateURL]);

  // Sync with URL changes
  useEffect(() => {
    const pageFromURL = parseInt(searchParams.get('page') || '0', 10);
    const validPage = Math.min(Math.max(0, pageFromURL), totalPages - 1);
    if (validPage !== currentPage && !isFlipping) {
      setDirection(validPage > currentPage ? "forward" : "backward");
      setCurrentPage(validPage);
    }
  }, [searchParams, totalPages]);

  // Handle scroll-based page flip
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          nextPage();
        } else if (e.deltaY < 0) {
          prevPage();
        }
      }, 100);
    };

    const catalogueElement = document.getElementById('product-catalogue');
    if (catalogueElement) {
      catalogueElement.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (catalogueElement) {
        catalogueElement.removeEventListener('wheel', handleScroll);
      }
      clearTimeout(scrollTimeout);
    };
  }, [nextPage, prevPage]);

  return {
    currentPage,
    isFlipping,
    direction,
    nextPage,
    prevPage,
    goToPage,
    totalPages,
  };
}
