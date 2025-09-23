import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function AllApprovedTimetables() {
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load all approved timetables
  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getAllApprovedTimetables();
      setChoices(data);
      setError("");
    } catch (e) {
      setError(e.message || "Failed to load timetables");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">All Approved Timetables</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : choices.length === 0 ? (
        <div>No approved timetables found.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {choices.map((choice, idx) => (
            <div key={choice.id || idx} className="bg-white border rounded p-3">
              <div className="font-semibold mb-2">{choice.name}</div>

              <table className="table-auto w-full text-sm border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-2 py-1">Day</th>
                    <th className="border px-2 py-1">Slot</th>
                    <th className="border px-2 py-1">Batch</th>
                    <th className="border px-2 py-1">Course</th>
                    <th className="border px-2 py-1">Faculty</th>
                    <th className="border px-2 py-1">Room</th>
                    <th className="border px-2 py-1">Duration</th>
                    <th className="border px-2 py-1">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {choice.slots.map((slot, i) => (
                    <tr key={i}>
                      <td className="border px-2 py-1">{slot.day}</td>
                      <td className="border px-2 py-1">{slot.slot}</td>
                      <td className="border px-2 py-1">{slot.batch}</td>
                      <td className="border px-2 py-1">{slot.courseCode}</td>
                      <td className="border px-2 py-1">{slot.facultyEmail}</td>
                      <td className="border px-2 py-1">{slot.roomName}</td>
                      <td className="border px-2 py-1">{slot.durationSlots}</td>
                      <td className="border px-2 py-1">{slot.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
