// src/utils/dateUtils.js
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short", // Abbreviated month name (e.g., Jan)
    day: "2-digit",
  }).format(new Date(date));
}
