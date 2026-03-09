export function formatFileSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb < 0.1 ? mb.toFixed(2) : mb.toFixed(1)} MB`;
}
