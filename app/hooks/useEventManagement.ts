import { useState, useCallback } from "react";

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  capacity: number;
  location: string;
  attendees: number;
  status: "Upcoming" | "Completed";
}

export function useEventManagement() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Friday Khutbah",
      date: "Dec 1, 2024",
      time: "1:30 PM",
      description: "Weekly Friday sermon and prayer",
      capacity: 500,
      location: "Main Hall",
      attendees: 450,
      status: "Upcoming",
    },
    {
      id: "2",
      title: "Youth Program",
      date: "Dec 3, 2024",
      time: "6:00 PM",
      description: "Islamic education for youth",
      capacity: 100,
      location: "Community Center",
      attendees: 85,
      status: "Upcoming",
    },
    {
      id: "3",
      title: "Quran Study Circle",
      date: "Nov 29, 2024",
      time: "8:00 PM",
      description: "Tajweed and Quran memorization session",
      capacity: 50,
      location: "Study Room",
      attendees: 32,
      status: "Completed",
    },
  ]);

  const createEvent = useCallback((eventData: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
    };
    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  }, []);

  const updateEvent = useCallback((id: string, eventData: Omit<Event, "id">) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...eventData, id } : event
      )
    );
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }, []);

  return {
    events,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}
