"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { loaderVariants, logoVariants, progressVariants } from './animations';

interface PageLoaderProps {
  isRouteChanging: boolean;
}

const PageLoader = ({ isRouteChanging }: PageLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const isFirstRender = useRef(true);

  // Handle showing and hiding the loader
  useEffect(() => {
    // First render - don't do anything
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Clear any existing timers to prevent conflicts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (isRouteChanging) {
      // Start a new load session
      startTimeRef.current = Date.now();
      setProgress(0);

      // Only show loader if loading takes more than 300ms
      timeoutRef.current = setTimeout(() => {
        setShow(true);
      }, 300);
    } else {
      // Finish the progress animation before hiding
      setProgress(100);

      // Hide the loader after a small delay
      timeoutRef.current = setTimeout(() => {
        setShow(false);
      }, 600);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isRouteChanging]);

  // Handle progress animation
  useEffect(() => {
    // Clean up any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    // Only animate progress when showing and not at 100%
    if (show && progress < 100) {
      // Calculate a dynamic speed based on how long we've been loading
      const updateProgress = () => {
        const elapsed = Date.now() - startTimeRef.current;

        setProgress(prev => {
          // Accelerate progress based on time elapsed:
          // - Start slow (0-30%)
          // - Mid-speed (30-75%)
          // - Slow down as we approach 95%
          if (prev < 30) return prev + 0.5;
          if (prev < 75) return prev + 0.3;
          if (prev < 95) return prev + 0.1;
          return prev;
        });
      };

      // Update at a reasonable interval
      progressIntervalRef.current = setInterval(updateProgress, 50);
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [show, progress]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          variants={loaderVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            className="mb-12 relative"
          >
            <div className="relative">
              <Image
                src="/logo.png"
                alt="BAUC Logo"
                width={200}
                height={90}
                priority
                className="object-contain"
              />
              {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 2,
                    repeatType: "loop"
                  }
                }}
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400"
              >
                Loading experience...
              </motion.div> */}
            </div>
          </motion.div>

          <div className="w-72 md:w-80 h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-green-600"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-sm text-gray-500 font-light tracking-wider"
          >
            {progress < 100 ? `${Math.floor(progress)}%` : "Ready"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
