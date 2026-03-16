export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  const formatted =
    size < 10 ? size.toFixed(2) : size < 100 ? size.toFixed(1) : Math.round(size).toString();

  return `${formatted} ${units[unitIndex]}`;
}
