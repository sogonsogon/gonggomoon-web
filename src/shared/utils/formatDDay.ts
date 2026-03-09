export function formatDDay(dueDate: string | null | undefined) {
  const TODAY = new Date();

  if (!dueDate) return { label: '상시', variant: 'blue' as const };

  const due = new Date(dueDate);
  const diffDays = Math.ceil((due.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: '마감', variant: 'closed' as const };
  if (diffDays === 0) return { label: 'D-Day', variant: 'red' as const };

  const label = `D-${diffDays}`;
  return { label, variant: diffDays <= 7 ? ('red' as const) : ('blue' as const) };
}
