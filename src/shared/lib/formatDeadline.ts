export function formatDeadline(dueDate: string | null): string {
  if (!dueDate) return '상시 모집';
  const d = new Date(dueDate);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `마감일 ${y}. ${m}. ${day}`;
}
