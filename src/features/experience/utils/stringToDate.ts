export function stringToDate(value: string): Date | null {
  if (!value) return null;
  const match = value.match(/^(\d{4})\.(\d{2})$/);
  if (!match) return null;
  return new Date(parseInt(match[1]), parseInt(match[2]) - 1, 1);
}
