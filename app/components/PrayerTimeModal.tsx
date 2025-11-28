import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { PrayerTime } from "../hooks/usePrayerTimeManagement";
import PrayerTimeForm from "./PrayerTimeForm";

interface PrayerTimeModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  prayer?: PrayerTime;
  onClose: () => void;
  onSubmit: (prayerData: Omit<PrayerTime, "id">) => void;
}

export default function PrayerTimeModal({
  isOpen,
  mode,
  prayer,
  onClose,
  onSubmit,
}: PrayerTimeModalProps) {
  const [formData, setFormData] = useState<Omit<PrayerTime, "id">>({
    name: "Fajr",
    adhan: "",
    iqamah: "",
    notes: "",
  });

  useEffect(() => {
    if (prayer && mode === "edit") {
      setFormData({
        name: prayer.name,
        adhan: prayer.adhan,
        iqamah: prayer.iqamah,
        notes: prayer.notes || "",
      });
    } else if (mode === "create") {
      setFormData({
        name: "Fajr",
        adhan: "",
        iqamah: "",
        notes: "",
      });
    }
  }, [prayer, mode, isOpen]);

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
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === "create" ? "Add Prayer Time" : "Edit Prayer Time"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <PrayerTimeForm
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
              {mode === "create" ? "Add Prayer" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
