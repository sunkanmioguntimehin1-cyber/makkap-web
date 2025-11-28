import React from "react";
import { Calendar, MapPin, Users, Edit2, Trash2, Plus } from "lucide-react";
import { Event } from "../hooks/useEventManagement";

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
  onCreateNew: () => void;
}

export default function EventList({
  events,
  onEdit,
  onDelete,
  onCreateNew,
}: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
          <Calendar className="text-emerald-600" size={32} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Events Yet
        </h3>
        <p className="text-gray-600 mb-6">
          Create your first event to get started
        </p>
        <button
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors"
        >
          <Plus size={20} />
          Create Event
        </button>
      </div>
    );
  }

  const upcomingEvents = events.filter((e) => e.status === "Upcoming");
  const completedEvents = events.filter((e) => e.status === "Completed");

  return (
    <div className="space-y-8">
      {upcomingEvents.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Events ({upcomingEvents.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {completedEvents.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Completed Events ({completedEvents.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const attendancePercentage = Math.round(
    (event.attendees / event.capacity) * 100
  );
  const isUpcoming = event.status === "Upcoming";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div
        className={`h-2 ${
          isUpcoming ? "bg-blue-500" : "bg-gray-400"
        }`}
      />

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-1">
              {event.title}
            </h4>
            <p className="text-sm text-gray-600">{event.description}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${
              isUpcoming
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {event.status}
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Calendar size={16} className="text-emerald-600 flex-shrink-0" />
            <span>
              {event.date} at {event.time}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin size={16} className="text-emerald-600 flex-shrink-0" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Users size={16} className="text-emerald-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm text-gray-600">
                {event.attendees} / {event.capacity} attendees
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all"
                  style={{ width: `${attendancePercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(event)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 font-medium transition-colors"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition-colors"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
