export interface HistorySidebarItem {
  title: string;
  date: string;
  href: string;
}

export type GenerationStatus = 'READY' | 'PROCESSING' | 'FAILED';
