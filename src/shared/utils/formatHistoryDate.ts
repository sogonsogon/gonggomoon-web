export function formatHistoryDate(iso: string): string {
  return iso.slice(0, 10).replace(/-/g, '.');
}
