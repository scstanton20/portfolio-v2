'use client';

import { NextStudio } from 'next-sanity/studio';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Config } from 'sanity';

export function StudioWrapper({ config }: { config: Config }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Watch for Sanity Studio to be fully loaded
    const checkStudioLoaded = () => {
      // Check for Sanity Studio's main container elements
      const studioElements =
        document.querySelector('[data-ui="RootPortal"]') ||
        document.querySelector('[data-sanity]') ||
        document.querySelector('[class*="sanity"]');

      if (studioElements) {
        setIsLoading(false);
        return true;
      }
      return false;
    };

    // Start checking immediately
    if (!checkStudioLoaded()) {
      // If not loaded yet, observe DOM changes
      const studioObserver = new MutationObserver(() => {
        if (checkStudioLoaded()) {
          studioObserver.disconnect();
        }
      });

      studioObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // Fallback timeout in case detection fails
      const fallbackTimer = setTimeout(() => {
        setIsLoading(false);
        studioObserver.disconnect();
      }, 5000);

      return () => {
        studioObserver.disconnect();
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#0d131f]"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="w-12 h-12 border-4 border-black/20 dark:border-white/20 border-t-black dark:border-t-white rounded-full"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-black/60 dark:text-white/60 font-medium"
              >
                Loading Studio...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={
          isLoading
            ? 'opacity-0'
            : 'opacity-100 transition-opacity duration-300'
        }
      >
        <NextStudio config={config} />
      </div>
    </>
  );
}
