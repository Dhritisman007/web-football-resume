// Navigation registry. The ids match the `id` attributes on each section.

export interface NavItem {
  id: string;
  number: string;
  label: string;
  // Football name used in the menu. The plain label is shown as the subtitle.
  footballLabel: string;
}

export const navItems: NavItem[] = [
  { id: "home", number: "01", label: "Home", footballLabel: "HOME" },
  { id: "player-profile", number: "02", label: "About", footballLabel: "PLAYER PROFILE" },
  { id: "match-history", number: "03", label: "Projects", footballLabel: "MATCH HISTORY" },
  { id: "starting-xi", number: "04", label: "Skills", footballLabel: "STARTING XI" },
  { id: "transfer-history", number: "05", label: "Experience", footballLabel: "TRANSFER HISTORY" },
  { id: "academy", number: "06", label: "Education", footballLabel: "THE ACADEMY" },
  { id: "trophy-room", number: "07", label: "Achievements", footballLabel: "TROPHY ROOM" },
  { id: "current-form", number: "08", label: "GitHub", footballLabel: "CURRENT FORM" },
  { id: "final-whistle", number: "09", label: "Contact", footballLabel: "FINAL WHISTLE" },
];

// Reachable from the menu and the page, but not part of the main nine.
export const secondaryNavItems: NavItem[] = [
  { id: "scouting-report", number: "10", label: "Resume", footballLabel: "SCOUTING REPORT" },
  { id: "next-fixture", number: "11", label: "Career goals", footballLabel: "NEXT FIXTURE" },
];
