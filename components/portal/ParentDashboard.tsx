"use client";

import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ClipboardList,
  Footprints,
  Image as ImageIcon,
  Leaf,
  LogIn,
  LogOut,
  Moon,
  Sparkles,
  Sun,
  Utensils,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { logoutFamily } from "@/lib/portal/actions";
import { formatLongDate, formatShortDate, formatTime, weekdayOf, WEEKDAY_NAMES } from "@/lib/portal/dates";
import type { AttendanceRecord, Child, DailyLog, Family, Photo, ScheduleDay } from "@/lib/portal/types";

/**
 * The signed-in parent experience: Today's log, attendance, weekly schedule,
 * and the photo journal. All data is loaded server-side and passed in.
 */

type Tab = "log" | "attendance" | "schedule" | "photos";

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-1 border-b-2 py-3 transition-colors ${
        active ? "border-pine text-pine" : "border-transparent text-charcoal-light"
      }`}
    >
      <Icon size={20} strokeWidth={1.75} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

const ROTATIONS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function ParentDashboard({
  family,
  childList,
  selectedChildId,
  log,
  attendance,
  schedule,
  photos,
  today,
}: {
  family: Family;
  childList: Child[];
  selectedChildId: string | null;
  log: DailyLog | null;
  attendance: AttendanceRecord[];
  schedule: ScheduleDay[];
  photos: Photo[];
  today: string;
}) {
  const [tab, setTab] = useState<Tab>("log");
  const selectedChild = childList.find((c) => c.id === selectedChildId) ?? null;
  const todayRecord = attendance.find((a) => a.date === today) ?? null;
  const todayWeekday = weekdayOf(today);

  return (
    <div className="min-h-screen w-full">
      <header className="bg-pine px-5 pb-5 pt-6 text-cream">
        <form action={logoutFamily}>
          <button className="mb-4 flex items-center gap-1 text-xs text-water">
            <ArrowLeft size={14} /> Sign out
          </button>
        </form>
        <div className="mb-1 flex items-center gap-2">
          <Waves size={18} strokeWidth={1.5} className="text-water" />
          <span className="text-xs uppercase tracking-wide text-water/90">
            Hello, {family.displayName}
          </span>
        </div>
        <h1 className="font-serif text-3xl">
          {selectedChild ? `${selectedChild.name}'s Day` : "Your Family"}
        </h1>
        {childList.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {childList.map((c) => (
              <Link
                key={c.id}
                href={`/portal?child=${c.id}`}
                className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                  c.id === selectedChildId
                    ? "border-water bg-water text-pine"
                    : "border-cream/30 text-cream/80"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      <nav className="sticky top-0 z-10 flex border-b border-wood/15 bg-white/60 backdrop-blur">
        <TabButton active={tab === "log"} onClick={() => setTab("log")} icon={BookOpen} label="Today" />
        <TabButton active={tab === "attendance"} onClick={() => setTab("attendance")} icon={ClipboardList} label="Attendance" />
        <TabButton active={tab === "schedule"} onClick={() => setTab("schedule")} icon={Calendar} label="Schedule" />
        <TabButton active={tab === "photos"} onClick={() => setTab("photos")} icon={ImageIcon} label="Photos" />
      </nav>

      <main className="mx-auto max-w-lg p-5 pb-16">
        {tab === "log" && (
          <div className="space-y-5">
            <p className="text-sm font-medium text-charcoal-light">{formatLongDate(today)}</p>

            {!log ? (
              <div className="rounded-2xl bg-white p-6 text-center">
                <Leaf size={28} strokeWidth={1.25} className="mx-auto mb-3 text-sage" />
                <p className="text-[15px] text-charcoal">
                  Today&apos;s update isn&apos;t written yet — check back this afternoon!
                </p>
              </div>
            ) : (
              <>
                {log.note && (
                  <div className="rounded-2xl bg-white p-5">
                    <div className="mb-3 flex items-center gap-2 text-pine">
                      <Sparkles size={18} strokeWidth={1.75} />
                      <h2 className="font-serif text-lg">How the day went</h2>
                    </div>
                    <p className="text-[15px] leading-relaxed text-charcoal">{log.note}</p>
                  </div>
                )}

                {log.focus && (
                  <div className="rounded-2xl bg-white p-5">
                    <div className="mb-3 flex items-center gap-2 text-pine">
                      <Footprints size={18} strokeWidth={1.75} />
                      <h2 className="font-serif text-lg">Today&apos;s focus</h2>
                    </div>
                    <p className="text-[15px] text-charcoal">{log.focus}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-4">
                    <div className="mb-1 flex items-center gap-2 text-xs text-charcoal-light">
                      <Sun size={14} /> Arrival
                    </div>
                    <p className="font-medium text-pine">
                      {formatTime(todayRecord?.timeIn ?? null) ?? "—"}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <div className="mb-1 flex items-center gap-2 text-xs text-charcoal-light">
                      <Moon size={14} /> Nap
                    </div>
                    <p className="text-sm font-medium text-pine">{log.nap || "—"}</p>
                  </div>
                </div>

                {log.meals.length > 0 && (
                  <div className="rounded-2xl bg-white p-5">
                    <div className="mb-3 flex items-center gap-2 text-pine">
                      <Utensils size={18} strokeWidth={1.75} />
                      <h2 className="font-serif text-lg">Meals &amp; snacks</h2>
                    </div>
                    <div className="space-y-2">
                      {log.meals.map((m, i) => (
                        <div key={i} className="flex gap-3 text-sm">
                          <span className="w-20 shrink-0 text-charcoal-light">{m.time}</span>
                          <span className="text-charcoal">{m.item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {log.mood && (
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs text-charcoal-light">Mood</p>
                    <p className="mt-0.5 text-sm font-medium text-pine">{log.mood}</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {tab === "attendance" && (
          <div className="space-y-3">
            <p className="mb-2 text-sm font-medium text-charcoal-light">
              This week&apos;s sign-in / sign-out
            </p>
            {attendance.length === 0 && (
              <div className="rounded-2xl bg-white p-6 text-center text-sm text-charcoal-light">
                No attendance recorded yet this week.
              </div>
            )}
            {attendance.map((a) => {
              const isToday = a.date === today;
              return (
                <div
                  key={a.id}
                  className={`rounded-2xl p-4 ${isToday ? "bg-pine text-cream" : "bg-white text-charcoal"}`}
                >
                  <p className={`mb-3 text-sm font-medium ${isToday ? "text-water" : "text-charcoal-light"}`}>
                    {formatShortDate(a.date)}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <LogIn size={16} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">{formatTime(a.timeIn) ?? "—"}</p>
                        {a.droppedBy && (
                          <p className={`text-xs ${isToday ? "text-cream/70" : "text-charcoal-light"}`}>
                            Dropped off by {a.droppedBy}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <LogOut size={16} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">
                          {formatTime(a.timeOut) ?? <span className="font-normal italic">Still here</span>}
                        </p>
                        {a.pickedUpBy && (
                          <p className={`text-xs ${isToday ? "text-cream/70" : "text-charcoal-light"}`}>
                            Picked up by {a.pickedUpBy}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "schedule" && (
          <div className="space-y-3">
            <p className="mb-2 text-sm font-medium text-charcoal-light">This week</p>
            {schedule.map((d) => {
              const active = d.weekday === todayWeekday;
              return (
                <div
                  key={d.weekday}
                  className={`flex items-start gap-4 rounded-2xl p-4 ${
                    active ? "bg-pine text-cream" : "bg-white text-charcoal"
                  }`}
                >
                  <div className="w-20 shrink-0">
                    <p className={`text-sm font-medium ${active ? "text-water" : "text-charcoal-light"}`}>
                      {WEEKDAY_NAMES[d.weekday]}
                    </p>
                  </div>
                  <div>
                    <p className="font-serif text-lg leading-tight">{d.theme || "—"}</p>
                    {d.detail && (
                      <p className={`mt-0.5 text-sm ${active ? "text-cream/85" : "text-charcoal-light"}`}>
                        {d.detail}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "photos" && (
          <div className="space-y-8 pt-2">
            <p className="text-sm font-medium text-charcoal-light">Photo journal</p>
            {photos.length === 0 && (
              <div className="rounded-2xl bg-white p-6 text-center text-sm text-charcoal-light">
                No photos yet — they&apos;ll appear here as we share them.
              </div>
            )}
            <div className="grid grid-cols-2 gap-x-4 gap-y-8">
              {photos.map((p, i) => (
                <div key={p.id} className={ROTATIONS[i % ROTATIONS.length]}>
                  <div className="bg-white p-2 pb-6 shadow-card">
                    {p.url ? (
                      // eslint-disable-next-line @next/next/no-img-element -- signed URLs are short-lived; next/image would cache-bust them
                      <img
                        src={p.url}
                        alt={p.caption || "Photo from the day"}
                        className="aspect-square w-full rounded-sm object-cover"
                      />
                    ) : (
                      <div className="flex aspect-square items-center justify-center rounded-sm bg-gradient-to-br from-water to-cream">
                        <Leaf size={28} strokeWidth={1} className="text-pine/40" />
                      </div>
                    )}
                    <p className="mt-3 text-center font-serif text-xs italic text-charcoal">
                      {p.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
