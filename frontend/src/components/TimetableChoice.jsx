import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TimetableChoice = ({ choice }) => {
  // Approve & Save → send to backend
  const handleApprove = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/timetable/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(choice),
      });

      if (response.ok) {
        alert("Choice saved successfully!");
      } else {
        alert("Error saving choice");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to backend");
    }
  };

  // Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(choice.name, 14, 10);

    const tableData = choice.slots.map(slot => [
      slot.day,
      slot.slot,
      slot.batch,
      slot.courseCode,
      slot.facultyEmail,
      slot.roomName,
      slot.durationSlots,
      slot.time,
    ]);

    doc.autoTable({
      head: [["Day", "Slot", "Batch", "Course Code", "Faculty", "Room", "Duration", "Time"]],
      body: tableData,
    });

    doc.save(`${choice.name}.pdf`);
  };

  return (
    <div className="p-4 border rounded-lg shadow mb-6">
      <h2 className="text-lg font-bold mb-3">{choice.name}</h2>
      <table className="table-auto border-collapse border border-gray-400 w-full text-sm mb-3">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Day</th>
            <th className="border px-2 py-1">Slot</th>
            <th className="border px-2 py-1">Batch</th>
            <th className="border px-2 py-1">Course Code</th>
            <th className="border px-2 py-1">Faculty</th>
            <th className="border px-2 py-1">Room</th>
            <th className="border px-2 py-1">Duration</th>
            <th className="border px-2 py-1">Time</th>
          </tr>
        </thead>
        <tbody>
          {choice.slots.map((slot, index) => (
            <tr key={index}>
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

      <div className="flex gap-3">
        <button
          onClick={handleApprove}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Approve & Save
        </button>
        <button
          onClick={handleExportPDF}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default TimetableChoice;
