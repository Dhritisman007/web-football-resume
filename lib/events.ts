// Window events used to connect components that do not share a tree.
export const MANAGER_MODE_EVENT = "dhritisman:manager-mode";
export const openManagerMode = () => window.dispatchEvent(new Event(MANAGER_MODE_EVENT));
