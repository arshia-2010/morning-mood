"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mood, setMood] = useState(null);
  const [breakfasts, setBreakfasts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1 - Create anonymous user ID (runs once)
  useEffect(() => {
    let userId = localStorage.getItem("morning-mood-user");

    if (!userId) {
      userId = window.crypto.randomUUID();
      localStorage.setItem("morning-mood-user", userId);
    }
  }, []);

  // 2 - Fetch breakfasts when mood changes
  useEffect(() => {
    if (!mood) return;

    const fetchBreakfasts = async () => {
      setLoading(true);

      const res = await fetch(`/api/breakfasts?mood=${mood}`);
      if (!res.ok) {
        setBreakfasts([]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setBreakfasts(data);
      setLoading(false);
    };

    fetchBreakfasts();
  }, [mood]);

  return (
    <main className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          Morning Mood ☀️
        </h1>

        <p className="text-gray-600 mt-2">
          How do you feel today?
        </p>

        <div className="flex gap-3 justify-center mt-6">
          {["energetic", "calm", "tired"].map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`px-4 py-2 rounded-full text-sm shadow transition
                ${
                  mood === m
                    ? "bg-amber-200 text-gray-900"
                    : "bg-white text-gray-700"
                }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {loading && (
          <p className="text-sm text-gray-500 mt-6">
            Finding breakfast ideas...
          </p>
        )}

        {!loading && mood && breakfasts.length === 0 && (
          <p className="text-sm text-gray-500 mt-6">
            No breakfasts match this mood yet ☕
          </p>
        )}

        <div className="mt-8 space-y-4">
          {breakfasts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 shadow text-left"
            >
              <h3 className="font-semibold text-gray-800">
                {item.name}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                {item.description}
              </p>

              <div className="text-xs text-gray-500 mt-2">
                ⏱ {item.prep_time} min · {item.diet_type}
              </div>

              {/* Save button (UI only for now) */}
              <button
                className="mt-3 text-sm px-3 py-1 rounded-md bg-amber-100 text-amber-900 hover:bg-amber-200 transition"
              >
                Save
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
