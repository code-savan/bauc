"use client";

import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import PageLoader from './PageLoader';

// Create a context to share loader state across components
const LoaderContext = createContext({
  isLoading: false,
  setManualLoading: (value: boolean) => {}
});

export const useLoader = () => useContext(LoaderContext);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [manualLoading, setManualLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigationStartTime = useRef<number>(0);
  const resourceTrackingActive = useRef<boolean>(false);
  const isLoadingRef = useRef<boolean>(false);
  const storedPathWithSearch = useRef<string>('');

  // Combined loading state - either from route change or manual trigger
  const isLoading = isRouteChanging || manualLoading;

  // Update ref when loading state changes to avoid stale closures
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  // Initial page load - show loader only during actual document loading
  useEffect(() => {
    // Check if document is still loading
    if (document.readyState !== 'complete') {
      navigationStartTime.current = performance.now();
      setIsRouteChanging(true);

      // Listen for when the page actually finishes loading
      const handleLoad = () => {
        setIsRouteChanging(false);
      };

      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Listen for subsequent route changes
  useEffect(() => {
    // Skip first render
    const isFirstRender = document.readyState !== 'complete';
    if (isFirstRender) return;

    // Skip if the same URL is clicked again
    const currentPathWithSearch = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    if (storedPathWithSearch.current === currentPathWithSearch) {
      return;
    }

    storedPathWithSearch.current = currentPathWithSearch;
    navigationStartTime.current = performance.now();
    setIsRouteChanging(true);

    // Set up a "maximum" timeout as fallback
    const maxTimeout = setTimeout(() => {
      if (isLoadingRef.current) {
        setIsRouteChanging(false);
      }
    }, 5000); // Fallback maximum timeout

    // Use simple MutationObserver to detect when content changes
    const observer = new MutationObserver((mutations) => {
      // If we detect significant DOM changes, consider the page loaded
      if (mutations.length > 5 && isLoadingRef.current) {
        // Add a small delay to allow for final renders
        setTimeout(() => {
          setIsRouteChanging(false);
        }, 150);

        observer.disconnect();
      }
    });

    // Start observing after a small delay to avoid initial DOM setup
    setTimeout(() => {
      if (isLoadingRef.current) {
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: false,
          characterData: false
        });
      }
    }, 300);

    return () => {
      observer.disconnect();
      clearTimeout(maxTimeout);
    };
  }, [pathname, searchParams]); // Remove isRouteChanging from dependencies

  // Simple detection for when page has loaded
  useEffect(() => {
    if (!isLoading) return;

    const loadDetectTimeout = setTimeout(() => {
      // If still loading after some time, check for DOM stability
      if (isLoadingRef.current) {
        const checkDomStability = () => {
          // Take a snapshot of DOM size
          const initialBodySize = document.body.innerHTML.length;

          // Check again after a short interval
          setTimeout(() => {
            // If DOM hasn't changed much, consider it stable and loaded
            const currentBodySize = document.body.innerHTML.length;
            const changePercentage = Math.abs(currentBodySize - initialBodySize) / initialBodySize;

            if (changePercentage < 0.05 && isLoadingRef.current) {
              setIsRouteChanging(false);
            }
          }, 300);
        };

        checkDomStability();
      }
    }, 800);

    return () => clearTimeout(loadDetectTimeout);
  }, [isLoading]);

  // Expose context values for other components to access loader state
  const contextValue = {
    isLoading,
    setManualLoading
  };

  return (
    <LoaderContext.Provider value={contextValue}>
      <PageLoader isRouteChanging={isLoading} />
      <div className={isLoading ? 'invisible' : 'visible'}>
        {children}
      </div>
    </LoaderContext.Provider>
  );
}

export default LoaderProvider;
