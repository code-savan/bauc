"use client";

import { useRouter } from 'next/navigation';
import { useLoader } from '../components/LoaderProvider';

/**
 * Hook for managing page transitions and loader visibility
 */
export function usePageTransition() {
  const { setManualLoading, isLoading } = useLoader();
  const router = useRouter();

  /**
   * Navigate to a new route with the loader shown during transition
   * @param href The URL to navigate to
   */
  const navigateWithLoader = (href: string) => {
    // Simple approach - just show loader and navigate
    setManualLoading(true);
    router.push(href);
  };

  /**
   * Manually show the loader for a specific duration
   * @param durationMs How long to show the loader (in milliseconds)
   */
  const showLoader = (durationMs: number = 1000) => {
    setManualLoading(true);

    const timer = setTimeout(() => {
      setManualLoading(false);
    }, durationMs);

    return () => clearTimeout(timer);
  };

  /**
   * Manually hide the loader
   */
  const hideLoader = () => {
    setManualLoading(false);
  };

  return {
    navigateWithLoader,
    showLoader,
    hideLoader,
    isLoading
  };
}

export default usePageTransition;
