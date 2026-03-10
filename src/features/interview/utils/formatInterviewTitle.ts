export function formatInterviewTitle(isoDate: string): string {
  const d = new Date(isoDate);
  const y = String(d.getFullYear()).slice(2, 4);
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');

  return `면접질문_${y}${mo}${da}_${h}${mi}${s}`;
}
