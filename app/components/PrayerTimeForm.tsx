import React from "react";
import { PrayerTime } from "../hooks/usePrayerTimeManagement";

interface PrayerTimeFormProps {
  formData: Omit<PrayerTime, "id">;
  onChange: (formData: Omit<PrayerTime, "id">) => void;
}

const PRAYER_NAMES = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

export default function PrayerTimeForm({
  formData,
  onChange,
}: PrayerTimeFormProps) {
  const handleChange = (
    field: keyof Omit<PrayerTime, "id">,
    value: string
  ) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Prayer Name *
        </label>
        <select
          value={formData.name}
          onChange={(e) =>
            handleChange(
              "name",
              e.target.value as "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha"
            )
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        >
          {PRAYER_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adhan Time *
          </label>
          <input
            type="time"
            value={formData.adhan}
            onChange={(e) => handleChange("adhan", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Iqamah Time *
          </label>
          <input
            type="time"
            value={formData.iqamah}
            onChange={(e) => handleChange("iqamah", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          value={formData.notes || ""}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Additional information about this prayer time..."
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
        />
      </div>
    </div>
  );
}
