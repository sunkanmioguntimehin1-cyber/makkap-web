// types/event.ts
export enum EventType {
  PRAYER = "prayer",
  LECTURE = "lecture",
  COMMUNITY = "community",
  EDUCATION = "education",
  CHARITY = "charity",
}

export interface Event {
  id: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: string;
  createdAt: string;
}

export interface EventFormData {
  title: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: string;
}

export interface ValidationErrors {
  [key: string]: string;
}
