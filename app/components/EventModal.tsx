import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Event } from "../hooks/useEventManagement";
import EventForm from "./EventForm";

interface EventModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  event?: Event;
  onClose: () => void;
  onSubmit: (eventData: Omit<Event, "id">) => void;
}

export default function EventModal({
  isOpen,
  mode,
  event,
  onClose,
  onSubmit,
}: EventModalProps) {
  const [formData, setFormData] = useState<Omit<Event, "id">>({
    title: "",
    date: "",
    time: "",
    description: "",
    capacity: 100,
    location: "",
    attendees: 0,
    status: "Upcoming",
  });

  useEffect(() => {
    if (event && mode === "edit") {
      setFormData({
        title: event.title,
        date: event.date,
        time: event.time,
        description: event.description,
        capacity: event.capacity,
        location: event.location,
        attendees: event.attendees,
        status: event.status,
      });
    } else if (mode === "create") {
      setFormData({
        title: "",
        date: "",
        time: "",
        description: "",
        capacity: 100,
        location: "",
        attendees: 0,
        status: "Upcoming",
      });
    }
  }, [event, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === "create" ? "Create New Event" : "Edit Event"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <EventForm
            formData={formData}
            onChange={setFormData}
          />

          <div className="mt-8 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors"
            >
              {mode === "create" ? "Create Event" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


