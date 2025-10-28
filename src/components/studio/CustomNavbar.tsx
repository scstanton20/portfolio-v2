'use client';

import { useRouter } from 'next/navigation';

export function CustomNavbar(props: any) {
  const router = useRouter();

  const handleBackToSite = () => {
    // Check for unsaved changes indicators in Sanity Studio
    const changeIndicators = document.querySelectorAll(
      '[data-ui="ChangeIndicator"]',
    );
    const hasChanges = changeIndicators.length > 0;

    if (hasChanges) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave? Any unsaved changes will be lost.',
      );
      if (!confirmLeave) {
        return;
      }
    }

    router.push('/');
  };

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/50 bg-white/60 dark:bg-[#12181d]/60 backdrop-blur-lg">
        <button
          onClick={handleBackToSite}
          className="text-sm font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
        >
          ← Back to Site
        </button>
      </div>
      {props.renderDefault(props)}
    </div>
  );
}
