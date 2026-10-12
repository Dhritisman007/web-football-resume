// Content helpers. "TODO" marks text still waiting to be written.
export const TODO = "TODO";

export const isTodo = (value: string | undefined) => !value || value === TODO;

// Drops TODO entries so placeholder tags never show up as real tech.
export const realItems = (items: string[]) => items.filter((item) => !isTodo(item));
