export const IGNORED_CONSOLE_MESSAGES = [
  // Threw by the time picker when user types in a value, before the value is a valid time.
  "Note: Not match any format. Please help to fire a issue about this.",
  // @tippyjs/react 4.2.6 reads children.ref to merge refs. It still works on
  // React 19; remove this once Tooltip and Dropdown move off tippy, which
  // React 20 requires.
  "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.",
];
