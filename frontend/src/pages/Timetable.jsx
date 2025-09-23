// // import React, { useEffect, useState } from 'react'
// // import { api } from '../utils/api'

// // export default function Timetable() {
// //   const [choices, setChoices] = useState([])
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState('')

// //   const load = async () => {
// //     setLoading(true)
// //     try { setChoices(await api.getTimetableChoices()); setError('') } catch (e) { setError(e.message) } finally { setLoading(false) }
// //   }
// //   useEffect(()=>{ load() }, [])

// //   const generate = async () => {
// //     setLoading(true)
// //     try { const res = await api.generateTimetable(3); await load() } catch (e) { setError(e.message) } finally { setLoading(false) }
// //   }

// //   return (
// //     <div>
// //       <h1 className="text-2xl font-semibold mb-4">Timetable</h1>
// //       {error && <div className="text-red-600 mb-2">{error}</div>}
// //       <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={generate} disabled={loading}>
// //         {loading ? 'Generating...' : 'Generate Timetable'}
// //       </button>
// //       <div className="mt-4 grid md:grid-cols-2 gap-4">
// //         {(choices||[]).map((tt, idx) => (
// //           <div key={tt.id || idx} className="bg-white border rounded p-3">
// //             <div className="font-semibold mb-2">{tt.name || `Choice ${idx+1}`}</div>
// //             <pre className="text-xs overflow-auto max-h-64">{JSON.stringify(tt, null, 2)}</pre>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }





// import React, { useEffect, useState } from "react";
// import { api } from "../utils/api";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";  // ✅ import the function

// export default function Timetable() {
//   const [choices, setChoices] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const load = async () => {
//     setLoading(true);
//     try {
//       setChoices(await api.getTimetableChoices());
//       setError("");
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const generate = async () => {
//     setLoading(true);
//     try {
//       await api.generateTimetable(3);
//       await load();
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Approve & Save ---
//  const handleApprove = async (choice) => {
//   try {
//     const res = await fetch("http://localhost:3000/api/timetable/approve", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(choice),
//     });

//     if (!res.ok) throw new Error("Failed to save choice");

//     const result = await res.json();
//     alert(result.message || "Timetable saved!");
//   } catch (err) {
//     console.error("Error approving timetable:", err);
//     alert("Error saving choice: " + err.message);
//   }
// };
//   // --- Export to PDF ---
//   const handleExportPDF = (choice) => {
//   const doc = new jsPDF();

//   // Add title
//   doc.setFontSize(14);
//   doc.text(choice.name || "Timetable Choice", 14, 15);

//   // Define columns & rows
//   const tableColumn = [
//     "Day",
//     "Slot",
//     "Batch",
//     "Course Code",
//     "Faculty",
//     "Room",
//     "Duration",
//     "Time",
//   ];
//   const tableRows = [];

//   choice.slots?.forEach((slot) => {
//     tableRows.push([
//       slot.day,
//       slot.slot,
//       slot.batch,
//       slot.courseCode,
//       slot.facultyEmail,
//       slot.roomName,
//       slot.durationSlots,
//       slot.time,
//     ]);
//   });

//   // Draw table
//   doc.autoTable({
//     head: [tableColumn],
//     body: tableRows,
//     startY: 25,
//   });

//   // Save file
//   doc.save(`${choice.name || "timetable_choice"}.pdf`);
// };


//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-4">Timetable</h1>
//       {error && <div className="text-red-600 mb-2">{error}</div>}

//       <button
//         className="px-3 py-2 bg-blue-600 text-white rounded"
//         onClick={generate}
//         disabled={loading}
//       >
//         {loading ? "Generating..." : "Generate Timetable"}
//       </button>

//       <div className="mt-4 grid md:grid-cols-2 gap-4">
//         {(choices || []).map((choice, idx) => (
//           <div key={choice.id || idx} className="bg-white border rounded p-3">
//             <div className="font-semibold mb-2">
//               {choice.name || `Choice ${idx + 1}`}
//             </div>

//             {/* Table instead of raw JSON */}
//             <table className="table-auto w-full text-sm border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border px-2 py-1">Day</th>
//                   <th className="border px-2 py-1">Slot</th>
//                   <th className="border px-2 py-1">Batch</th>
//                   <th className="border px-2 py-1">Course</th>
//                   <th className="border px-2 py-1">Faculty</th>
//                   <th className="border px-2 py-1">Room</th>
//                   <th className="border px-2 py-1">Duration</th>
//                   <th className="border px-2 py-1">Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {choice.slots?.map((slot, i) => (
//                   <tr key={i}>
//                     <td className="border px-2 py-1">{slot.day}</td>
//                     <td className="border px-2 py-1">{slot.slot}</td>
//                     <td className="border px-2 py-1">{slot.batch}</td>
//                     <td className="border px-2 py-1">{slot.courseCode}</td>
//                     <td className="border px-2 py-1">{slot.facultyEmail}</td>
//                     <td className="border px-2 py-1">{slot.roomName}</td>
//                     <td className="border px-2 py-1">{slot.durationSlots}</td>
//                     <td className="border px-2 py-1">{slot.time}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Action buttons */}
//             <div className="mt-2 flex gap-2">
//               <button
//                 onClick={() => handleApprove(choice)}
//                 className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//               >
//                 Approve & Save
//               </button>
//               <button
//                 onClick={() => handleExportPDF(choice)}
//                 className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//               >
//                 Export to PDF
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ correct import

export default function Timetable() {
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      setChoices(await api.getTimetableChoices());
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const generate = async () => {
    setLoading(true);
    try {
      await api.generateTimetable(3);
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Approve & Save ---
  // const handleApprove = async (choice) => {
  //   try {
  //     const res = await fetch("http://localhost:3000/timetable/approve", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(choice),
  //     });

  //     const result = await res.json();
  //     alert(result.message || "Saved!");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error saving choice!");
  //   }
  // };
  const handleApprove = async (choice) => {
  try {
    const res = await fetch("http://localhost:3000/timetable/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(choice),
    });

    const result = await res.json();

    if (result.success) {
      alert(result.message); // "Timetable saved successfully!"
    } else {
      alert(result.error || "Error saving timetable!");
    }
  } catch (err) {
    console.error(err);
    alert("Network or server error!");
  }
};
// const handleApprove = async (choice) => {
//   try {
//     // Get token from localStorage (replace with your actual storage method)
//     const token = localStorage.getItem("token"); 

//     if (!token) {
//       alert("You must be logged in as admin to approve timetables!");
//       return;
//     }

//     const res = await fetch("http://localhost:3000/timetable/approve", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}` // <-- send token
//       },
//       body: JSON.stringify(choice),
//     });

//     const result = await res.json();

//     if (result.success) {
//       alert(result.message); // "Timetable saved successfully!"
//     } else {
//       alert(result.error || "Error saving timetable!");
//     }
//   } catch (err) {
//     console.error(err);
//     alert("Network or server error!");
//   }
// };



  // --- Export to PDF ---
  const handleExportPDF = (choice) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text(choice.name, 14, 15);

    const tableColumn = [
      "Day",
      "Slot",
      "Batch",
      "Course Code",
      "Faculty",
      "Room",
      "Duration",
      "Time",
    ];

    const tableRows = choice.slots.map((slot) => [
      slot.day,
      slot.slot,
      slot.batch,
      slot.courseCode,
      slot.facultyEmail,
      slot.roomName,
      slot.durationSlots,
      slot.time,
    ]);

    // ✅ Correct usage of autoTable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 10 },
      
      headStyles: { fillColor: [41, 128, 185] }, // nice blue header
    });

    // Save file
    doc.save(`${choice.name || "timetable_choice"}.pdf`);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Timetable</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <button
        className="px-3 py-2 bg-blue-600 text-white rounded"
        onClick={generate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Timetable"}
      </button>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        {(choices || []).map((choice, idx) => (
          <div key={choice.id || idx} className="bg-white border rounded p-3">
            <div className="font-semibold mb-2">
              {choice.name || `Choice ${idx + 1}`}
            </div>

            {/* Table instead of raw JSON */}
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
                {choice.slots?.map((slot, i) => (
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

            {/* Action buttons */}
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleApprove(choice)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Approve & Save
              </button>
              <button
                onClick={() => handleExportPDF(choice)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Export to PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
