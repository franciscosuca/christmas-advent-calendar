export enum ContentType {
  LINKEDIN = 'LINKEDIN',
  CUSTOM = 'CUSTOM'
}

export interface DayContent {
  day: number;
  type: ContentType;
  imageUrl: string;
  text: string;
  sourceUrl?: string; // Optional URL for LinkedIn post or external source
  title?: string;
}

export interface CalendarState {
  currentDate: Date;
  openDayId: number | null;
}
