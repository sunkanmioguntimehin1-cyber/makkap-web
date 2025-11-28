import React from "react";
import { Clock, Edit2, Trash2, Plus } from "lucide-react";
import { PrayerTime } from "../hooks/usePrayerTimeManagement";

interface PrayerTimeListProps {
  prayerTimes: PrayerTime[];
  onEdit: (prayer: PrayerTime) => void;
  onDelete: (prayerId: string) => void;
  onCreateNew: () => void;
}

export default function PrayerTimeList({
  prayerTimes,
  onEdit,
  onDelete,
  onCreateNew,
}: PrayerTimeListProps) {
  const sortedPrayers = [
    "Fajr",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha",
  ].map((name) => prayerTimes.find((p) => p.name === name)).filter(
    Boolean
  ) as PrayerTime[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Prayer Times</h3>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors"
        >
          <Plus size={18} />
          Add Prayer
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Prayer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Adhan Time
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Iqamah Time
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Notes
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPrayers.map((prayer, index) => (
                <tr
                  key={prayer.id}
                  className={`border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Clock className="text-emerald-600" size={18} />
                      </div>
                      <span className="font-semibold text-gray-900">
                        {prayer.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900 font-medium">
                      {prayer.adhan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900 font-medium">
                      {prayer.iqamah}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600 text-sm">
                      {prayer.notes || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(prayer)}
                        className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 font-medium transition-colors text-sm"
                      >
                        <Edit2 size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(prayer.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition-colors text-sm"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {sortedPrayers.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <Clock className="text-emerald-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Prayer Times
          </h3>
          <p className="text-gray-600 mb-6">
            Add prayer times to get started
          </p>
          <button
            onClick={onCreateNew}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors"
          >
            <Plus size={20} />
            Add Prayer Time
          </button>
        </div>
      )}
    </div>
  );
}
