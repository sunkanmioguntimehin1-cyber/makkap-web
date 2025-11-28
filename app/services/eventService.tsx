// services/eventService.ts
import {
  Event,
  EventFormData,
  EventType,
  ValidationErrors,
} from "../types/event";

export const EventService = {
  createEvent: (data: EventFormData): Event => ({
    id: Date.now().toString(),
    ...data,
    createdAt: new Date().toISOString(),
  }),

  validate: (
    event: Partial<EventFormData>
  ): { isValid: boolean; errors: ValidationErrors } => {
    const errors: ValidationErrors = {};

    if (!event.title?.trim()) {
      errors.title = "Title is required";
    }

    if (!event.date) {
      errors.date = "Date is required";
    }

    if (!event.time) {
      errors.time = "Time is required";
    }

    if (!event.location?.trim()) {
      errors.location = "Location is required";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  formatDate: (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },

  formatTime: (timeString: string): string => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  },

  getTypeColor: (type: EventType): string => {
    const colors: Record<EventType, string> = {
      [EventType.PRAYER]: "bg-green-100 text-green-800",
      [EventType.LECTURE]: "bg-blue-100 text-blue-800",
      [EventType.COMMUNITY]: "bg-purple-100 text-purple-800",
      [EventType.EDUCATION]: "bg-yellow-100 text-yellow-800",
      [EventType.CHARITY]: "bg-pink-100 text-pink-800",
    };
    return colors[type];
  },
};
