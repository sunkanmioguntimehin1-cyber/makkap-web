import { useState, useCallback } from "react";

export interface PrayerTime {
  id: string;
  name: "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";
  adhan: string;
  iqamah: string;
  notes?: string;
}

export function usePrayerTimeManagement() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([
    {
      id: "1",
      name: "Fajr",
      adhan: "5:30 AM",
      iqamah: "5:45 AM",
      notes: "Pre-dawn prayer",
    },
    {
      id: "2",
      name: "Dhuhr",
      adhan: "1:15 PM",
      iqamah: "1:30 PM",
      notes: "Midday prayer",
    },
    {
      id: "3",
      name: "Asr",
      adhan: "4:45 PM",
      iqamah: "5:00 PM",
      notes: "Afternoon prayer",
    },
    {
      id: "4",
      name: "Maghrib",
      adhan: "7:20 PM",
      iqamah: "7:25 PM",
      notes: "Sunset prayer",
    },
    {
      id: "5",
      name: "Isha",
      adhan: "8:45 PM",
      iqamah: "9:00 PM",
      notes: "Night prayer",
    },
  ]);

  const createPrayerTime = useCallback((prayerData: Omit<PrayerTime, "id">) => {
    const newPrayer: PrayerTime = {
      ...prayerData,
      id: Date.now().toString(),
    };
    setPrayerTimes((prev) => [...prev, newPrayer]);
    return newPrayer;
  }, []);

  const updatePrayerTime = useCallback(
    (id: string, prayerData: Omit<PrayerTime, "id">) => {
      setPrayerTimes((prev) =>
        prev.map((prayer) =>
          prayer.id === id ? { ...prayer, ...prayerData, id } : prayer
        )
      );
    },
    []
  );

  const deletePrayerTime = useCallback((id: string) => {
    setPrayerTimes((prev) => prev.filter((prayer) => prayer.id !== id));
  }, []);

  return {
    prayerTimes,
    createPrayerTime,
    updatePrayerTime,
    deletePrayerTime,
  };
}
