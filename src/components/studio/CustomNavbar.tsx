'use client';

import { useRouter } from 'next/navigation';

export function CustomNavbar(props: any) {
  const router = useRouter();

  const handleBackToSite = () => {
    // Check for unsaved changes indicators in Sanity Studio
    const changeIndicators = document.querySelectorAll('[data-ui="ChangeIndicator"]');
    const hasChanges = changeIndicators.length > 0;

    if (hasChanges) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave? Any unsaved changes will be lost.'
      );
      if (!confirmLeave) {
        return;
      }
    }

    router.push('/');
  };

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <button
          onClick={handleBackToSite}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          ← Back to Site
        </button>
      </div>
      {props.renderDefault(props)}
    </div>
  );
}
