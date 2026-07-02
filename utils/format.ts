export function formatDate(
  date: string | Date,
  locale = "en-US",
  options?: Intl.DateTimeFormatOptions,
): string {
  const value = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  }).format(value);
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}
