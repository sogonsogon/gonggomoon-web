export function formatBookmarkDate(deadline: string | null): string {
  if (!deadline) return '상시 모집';

  const d = new Date(deadline);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${y}.${m}.${day}`;
}
