'use client';

import type { NavbarProps } from 'sanity';

export function CustomNavbar(props: NavbarProps) {
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

    window.location.href = '/';
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          background: '#12181d',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <button
          onClick={handleBackToSite}
          style={{
            color: '#ffffff',
            background: 'none',
            border: 'none',
            padding: 0,
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          ← Back to Site
        </button>
      </div>
      {props.renderDefault(props)}
    </div>
  );
}
