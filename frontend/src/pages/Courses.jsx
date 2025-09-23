// import React from 'react'
// import CrudPage from './CrudPage'
// import { api } from '../utils/api'

// export default function Courses() {
//   return (
//     <CrudPage
//       title="Courses"
//       columns={[
//         { key: 'code', label: 'Code', required: true },
//         { key: 'name', label: 'Name', required: true },
//         { key: 'department', label: 'Department', required: true },
//         { key: 'semester', label: 'Semester', type: 'number', required: true },
//         { key: 'weeklyClasses', label: 'Weekly', type: 'number', required: true },
//         { key: 'type', label: 'Type', required: true },
//         { key: 'batch', label: 'Batch', required: true },
//       ]}
//       list={api.getCourses}
//       create={api.createCourse}
//       update={api.updateCourse}
//       remove={api.deleteCourse}
//       initial={{ code:'', name:'', department:'', semester:1, weeklyClasses:1, type:'theory', batch:'' }}
//     />
//   )
// }



// 






// import React from "react";
// import CrudPage from "./CrudPage";
// import { api } from "../utils/api";

// export default function Courses() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-8">
//       {/* Dashboard Header */}
//       <div className="mb-8">
//         <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent tracking-wide drop-shadow">
//           📘 Courses Management
//         </h1>
//         <p className="text-gray-400 mt-2 text-lg">
//           Manage all course details including departments, semesters, and batches.
//         </p>
//       </div>

//       {/* Card Wrapper for CrudPage */}
//       <div className="bg-gray-900/80 backdrop-blur rounded-2xl shadow-lg border border-indigo-600 hover:border-blue-500 transition-all duration-300 p-6">
//         <CrudPage
//           title="Courses"
//           columns={[
//             { key: "code", label: "Code", required: true },
//             { key: "name", label: "Name", required: true },
//             { key: "department", label: "Department", required: true },
//             { key: "semester", label: "Semester", type: "number", required: true },
//             { key: "weeklyClasses", label: "Weekly", type: "number", required: true },
//             { key: "type", label: "Type", required: true },
//             { key: "batch", label: "Batch", required: true },
//           ]}
//           list={api.getCourses}
//           create={api.createCourse}
//           update={api.updateCourse}
//           remove={api.deleteCourse}
//           initial={{
//             code: "",
//             name: "",
//             department: "",
//             semester: 1,
//             weeklyClasses: 1,
//             type: "theory",
//             batch: "",
//           }}
//         />
//       </div>
//     </div>
//   );
// }



import React from "react";
import CrudPage from "./CrudPage";
import { api } from "../utils/api";

export default function Courses() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-wider drop-shadow">
             Courses
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Manage all course details efficiently
          </p>
        </div>

        {/* CrudPage Container */}
        <div className="bg-gray-700/90 p-6 rounded-2xl border border-indigo-600 shadow-lg hover:shadow-2xl transition-all duration-300">
          <style>
            {`
              /* Labels */
              .courses-form label {
                font-family: 'Inter', sans-serif;
                font-weight: 700;
                color: #111827; /* dark label */
                font-size: 1rem;
                letter-spacing: 0.05em;
                margin-bottom: 0.5rem;
                display: block;
              }

              /* Inputs, Selects, Textarea */
              .courses-form input,
              .courses-form select,
              .courses-form textarea {
                width: 100%;
                padding: 0.7rem 1rem;
                border-radius: 0.6rem;
                background-color: #4b5563; /* slightly lighter dark background */
                color: #f9fafb; /* white text */
                border: 2px solid #4f46e5; /* indigo border */
                font-family: 'Inter', sans-serif;
                font-size: 1rem;
                letter-spacing: 0.01em;
                transition: all 0.3s ease;
              }

              /* Options inside select */
              .courses-form select option {
                background-color: #4b5563;
                color: #f9fafb;
              }

              /* Placeholder */
              .courses-form input::placeholder,
              .courses-form select::placeholder,
              .courses-form textarea::placeholder {
                color: #d1d5db; /* soft gray */
              }

              /* Focus glow */
              .courses-form input:focus,
              .courses-form select:focus,
              .courses-form textarea:focus {
                outline: none;
                border-color: #3b82f6; /* blue */
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
                background-color: #374151; /* slightly darker on focus */
              }
            `}
          </style>

          <div className="courses-form">
            <CrudPage
              title="Courses"
              columns={[
                { key: "code", label: "Course Code", required: true },
                { key: "name", label: "Course Name", required: true },
                { key: "department", label: "Department", required: true },
                { key: "semester", label: "Semester", type: "number", required: true },
                { key: "weeklyClasses", label: "Weekly Classes", type: "number", required: true },
                { key: "type", label: "Course Type", required: true },
                { key: "batch", label: "Batch", required: true },
              ]}
              list={api.getCourses}
              create={api.createCourse}
              update={api.updateCourse}
              remove={api.deleteCourse}
              initial={{
                code: "",
                name: "",
                department: "",
                semester: 1,
                weeklyClasses: 1,
                type: "theory",
                batch: "",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

