export function toDisplayDate(date: string): string {
  if (!date) return '';
  return date.slice(0, 7).replace('-', '.');
}
