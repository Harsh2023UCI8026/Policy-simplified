import React from 'react';

/**
 * ThemeSelect
 *
 * A thin, accessible wrapper around the native <select> element.
 * Purpose: provide a single place to centralize theme-aware styling and
 * future accessibility improvements while preserving native browser
 * behaviors (touch, keyboard, and screen-reader support).
 *
 * IMPORTANT: This intentionally renders a native <select> (not a custom
 * combo/popover) so it remains a drop-in replacement for existing code
 * that relies on native events, keyboard behavior, and platform UIs.
 */

export type ThemeSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  children?: React.ReactNode;
};

const ThemeSelect = React.forwardRef<HTMLSelectElement, ThemeSelectProps>((props, ref) => {
  const { children, className, ...rest } = props;

  // Keep this component intentionally minimal — forward all native select
  // attributes so existing pages can swap <select> -> <ThemeSelect> without
  // changes to event handlers, ids, or classNames.
  return (
    <select ref={ref} className={className} {...rest}>
      {children}
    </select>
  );
});

ThemeSelect.displayName = 'ThemeSelect';

export default ThemeSelect;
