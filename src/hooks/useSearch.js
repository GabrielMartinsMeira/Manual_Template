import { useState, useEffect, useRef, useCallback } from 'react';
import Mark from 'mark.js';

const useSearch = (contentSelector = '#content') => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLiteralSearch, setIsLiteralSearch] = useState(false);
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const markInstanceRef = useRef(null);
  const resultsRef = useRef([]);

  const jumpTo = useCallback((index, results = resultsRef.current) => {
    if (!results || results.length === 0) return;
    
    results.forEach(el => el.classList.remove('current'));
    
    const current = results[index];
    if (!current) return;

    current.classList.add('current');
    current.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
      inline: 'start',
    });
  }, []);

  useEffect(() => {
    const contentElement = document.querySelector(contentSelector);
    if (!contentElement) return;

    if (!markInstanceRef.current) {
      markInstanceRef.current = new Mark(contentElement);
    }

    const markInstance = markInstanceRef.current;
    
    // Clear previous marks
    markInstance.unmark({
      done: () => {
        resultsRef.current = [];
        setTotalResults(0);
        setCurrentIndex(0);

        const searchVal = searchTerm.trim();
        if (!searchVal) return;

        // Apply new marks
        markInstance.mark(searchVal, {
          separateWordSearch: !isLiteralSearch,
          accuracy: isLiteralSearch ? "exactly" : "partially",
          caseSensitive: isCaseSensitive,
          done: () => {
            const results = Array.from(contentElement.querySelectorAll('mark'));
            resultsRef.current = results;
            setTotalResults(results.length);
            
            if (results.length > 0) {
              setCurrentIndex(0);
              jumpTo(0, results);
            }
          }
        });
      }
    });

    return () => {
      // Cleanup unmark on unmount
      if (markInstanceRef.current) {
        markInstanceRef.current.unmark();
      }
    };
  }, [searchTerm, isLiteralSearch, isCaseSensitive, contentSelector, jumpTo]);

  const handleNext = useCallback(() => {
    if (totalResults === 0) return;
    let nextIndex = currentIndex + 1;
    if (nextIndex >= totalResults) {
      nextIndex = 0;
    }
    setCurrentIndex(nextIndex);
    jumpTo(nextIndex);
  }, [currentIndex, totalResults, jumpTo]);

  const handlePrev = useCallback(() => {
    if (totalResults === 0) return;
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = totalResults - 1;
    }
    setCurrentIndex(prevIndex);
    jumpTo(prevIndex);
  }, [currentIndex, totalResults, jumpTo]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    isLiteralSearch,
    setIsLiteralSearch,
    isCaseSensitive,
    setIsCaseSensitive,
    handleNext,
    handlePrev,
    handleClear,
    currentIndex,
    totalResults
  };
};

export default useSearch;
