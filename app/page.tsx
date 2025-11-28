"use client"
import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Megaphone,
  DollarSign,
  Settings,
  Clock,
  Menu,
  Bell,
  Search,
  Plus,
  Edit2,
  Trash2,
  MoreVertical,
  TrendingUp,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import { useEventManagement, Event } from "./hooks/useEventManagement";
import { usePrayerTimeManagement, PrayerTime } from "./hooks/usePrayerTimeManagement";
import EventModal from "./components/EventModal";
import EventList from "./components/EventList";
import PrayerTimeModal from "./components/PrayerTimeModal";
import PrayerTimeList from "./components/PrayerTimeList";

export default function MasjidAdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { events, createEvent, updateEvent, deleteEvent } = useEventManagement();
  const { prayerTimes, createPrayerTime, updatePrayerTime, deletePrayerTime } =
    usePrayerTimeManagement();

  const [eventModalState, setEventModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    event?: Event;
  }>({
    isOpen: false,
    mode: "create",
  });

  const [prayerModalState, setPrayerModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    prayer?: PrayerTime;
  }>({
    isOpen: false,
    mode: "create",
  });

  const handleOpenCreateEventModal = () => {
    setEventModalState({ isOpen: true, mode: "create" });
  };

  const handleOpenEditEventModal = (event: Event) => {
    setEventModalState({ isOpen: true, mode: "edit", event });
  };

  const handleCloseEventModal = () => {
    setEventModalState({ isOpen: false, mode: "create" });
  };

  const handleEventModalSubmit = (eventData: Omit<Event, "id">) => {
    if (eventModalState.mode === "create") {
      createEvent(eventData);
    } else if (eventModalState.event) {
      updateEvent(eventModalState.event.id, eventData);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEvent(eventId);
    }
  };

  const handleOpenCreatePrayerModal = () => {
    setPrayerModalState({ isOpen: true, mode: "create" });
  };

  const handleOpenEditPrayerModal = (prayer: PrayerTime) => {
    setPrayerModalState({ isOpen: true, mode: "edit", prayer });
  };

  const handleClosePrayerModal = () => {
    setPrayerModalState({ isOpen: false, mode: "create" });
  };

  const handlePrayerModalSubmit = (prayerData: Omit<PrayerTime, "id">) => {
    if (prayerModalState.mode === "create") {
      createPrayerTime(prayerData);
    } else if (prayerModalState.prayer) {
      updatePrayerTime(prayerModalState.prayer.id, prayerData);
    }
  };

  const handleDeletePrayer = (prayerId: string) => {
    if (confirm("Are you sure you want to delete this prayer time?")) {
      deletePrayerTime(prayerId);
    }
  };

  // Sample data
  const stats = [
    {
      label: "Total Members",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "bg-emerald-500",
    },
    {
      label: "Monthly Donations",
      value: "$45,890",
      change: "+8%",
      icon: DollarSign,
      color: "bg-blue-500",
    },
    {
      label: "Upcoming Events",
      value: "8",
      change: "+2",
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      label: "Active Announcements",
      value: "5",
      change: "0",
      icon: Megaphone,
      color: "bg-orange-500",
    },
  ];

  const recentEvents = [
    {
      title: "Friday Khutbah",
      date: "Dec 1, 2024",
      attendees: 450,
      status: "Upcoming",
    },
    {
      title: "Youth Program",
      date: "Dec 3, 2024",
      attendees: 85,
      status: "Upcoming",
    },
    {
      title: "Quran Study Circle",
      date: "Nov 29, 2024",
      attendees: 32,
      status: "Completed",
    },
    {
      title: "Community Iftar",
      date: "Nov 28, 2024",
      attendees: 320,
      status: "Completed",
    },
  ];

  const recentDonations = [
    {
      donor: "Ahmed Al-Farsi",
      amount: "$500",
      purpose: "General Fund",
      date: "2 hours ago",
    },
    {
      donor: "Fatima Khan",
      amount: "$250",
      purpose: "Masjid Expansion",
      date: "5 hours ago",
    },
    {
      donor: "Anonymous",
      amount: "$1,000",
      purpose: "Zakat",
      date: "1 day ago",
    },
    {
      donor: "Omar Hassan",
      amount: "$100",
      purpose: "General Fund",
      date: "1 day ago",
    },
  ];

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "prayer-times", label: "Prayer Times", icon: Clock },
    { id: "events", label: "Events", icon: Calendar },
    { id: "members", label: "Members", icon: Users },
    { id: "announcements", label: "Announcements", icon: Megaphone },
    { id: "donations", label: "Donations", icon: DollarSign },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-emerald-800 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-emerald-700">
          {sidebarOpen && <h1 className="text-xl font-bold">Masjid Admin</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-emerald-700 rounded-lg"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                  activeTab === item.id
                    ? "bg-emerald-700"
                    : "hover:bg-emerald-700/50"
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-emerald-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="font-semibold">AA</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-medium text-sm">Admin User</p>
                <p className="text-xs text-emerald-200">admin@masjid.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={handleOpenCreateEventModal}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                <Plus size={20} />
                <span>New Event</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Dashboard Overview
                </h2>
                <p className="text-gray-600">
                  {`Welcome back! Here's what's happening today.`}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}
                        >
                          <Icon size={24} />
                        </div>
                        <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                          <TrendingUp size={16} />
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Prayer Times Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {`Today's Prayer Times`}
                    </h3>
                    <button className="text-emerald-600 hover:text-emerald-700">
                      <Edit2 size={18} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {prayerTimes.slice(0, 5).map((prayer) => (
                      <div
                        key={prayer.id}
                        className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {prayer.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Iqamah: {prayer.iqamah}
                          </p>
                        </div>
                        <span className="text-emerald-600 font-semibold">
                          {prayer.adhan}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Events */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 lg:col-span-2">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Recent Events
                    </h3>
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentEvents.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <Calendar className="text-emerald-600" size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {event.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {event.date} • {event.attendees} attendees
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            event.status === "Upcoming"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Donations */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Donations
                  </h3>
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="pb-3 text-sm font-medium text-gray-600">
                          Donor
                        </th>
                        <th className="pb-3 text-sm font-medium text-gray-600">
                          Amount
                        </th>
                        <th className="pb-3 text-sm font-medium text-gray-600">
                          Purpose
                        </th>
                        <th className="pb-3 text-sm font-medium text-gray-600">
                          Date
                        </th>
                        <th className="pb-3 text-sm font-medium text-gray-600"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentDonations.map((donation, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 last:border-0"
                        >
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                <span className="text-emerald-700 font-medium text-sm">
                                  {donation.donor.charAt(0)}
                                </span>
                              </div>
                              <span className="font-medium text-gray-900">
                                {donation.donor}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 font-semibold text-gray-900">
                            {donation.amount}
                          </td>
                          <td className="py-4 text-gray-600">
                            {donation.purpose}
                          </td>
                          <td className="py-4 text-gray-500 text-sm">
                            {donation.date}
                          </td>
                          <td className="py-4">
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                              <MoreVertical
                                size={16}
                                className="text-gray-400"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Events Management
                  </h2>
                  <p className="text-gray-600">
                    Create, edit, and manage all masjid events
                  </p>
                </div>
                <button
                  onClick={handleOpenCreateEventModal}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors"
                >
                  <Plus size={20} />
                  Create Event
                </button>
              </div>
              <EventList
                events={events}
                onEdit={handleOpenEditEventModal}
                onDelete={handleDeleteEvent}
                onCreateNew={handleOpenCreateEventModal}
              />
            </div>
          )}

          {activeTab === "prayer-times" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Prayer Times Management
                </h2>
                <p className="text-gray-600">
                  Manage daily prayer times (Adhan & Iqamah)
                </p>
              </div>
              <PrayerTimeList
                prayerTimes={prayerTimes}
                onEdit={handleOpenEditPrayerModal}
                onDelete={handleDeletePrayer}
                onCreateNew={handleOpenCreatePrayerModal}
              />
            </div>
          )}

          {activeTab !== "dashboard" && activeTab !== "events" && activeTab !== "prayer-times" && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <AlertCircle className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {menuItems.find((item) => item.id === activeTab)?.label} Section
              </h3>
              <p className="text-gray-600 mb-6">
                This section is under development. The full functionality will
                be available soon.
              </p>
              <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">
                Coming Soon
              </button>
            </div>
          )}
        </main>
      </div>

      <EventModal
        isOpen={eventModalState.isOpen}
        mode={eventModalState.mode}
        event={eventModalState.event}
        onClose={handleCloseEventModal}
        onSubmit={handleEventModalSubmit}
      />

      <PrayerTimeModal
        isOpen={prayerModalState.isOpen}
        mode={prayerModalState.mode}
        prayer={prayerModalState.prayer}
        onClose={handleClosePrayerModal}
        onSubmit={handlePrayerModalSubmit}
      />
    </div>
  );
}
