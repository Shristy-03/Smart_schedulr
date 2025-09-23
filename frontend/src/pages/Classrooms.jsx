// import React from 'react'
// import CrudPage from './CrudPage'
// import { api } from '../utils/api'

// export default function Classrooms() {
//   return (
//     <CrudPage
//       title="Classrooms"
//       columns={[
//         { key: 'name', label: 'Name', required: true },
//         { key: 'capacity', label: 'Capacity', type: 'number', required: true },
//         { key: 'type', label: 'Type', required: true },
//       ]}
//       list={api.getClassrooms}
//       create={api.createClassroom}
//       update={api.updateClassroom}
//       remove={api.deleteClassroom}
//       initial={{ name:'', capacity:30, type:'theory' }}
//     />
//   )
// }






// import React from 'react'
// import CrudPage from './CrudPage'
// import { api } from '../utils/api'

// export default function Classrooms() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-8">
//       <div className="mb-8">
//         <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent tracking-wide drop-shadow">
//           🏫 Classrooms Management
//         </h1>
//         <p className="text-gray-400 mt-2 text-lg">
//           Manage all classroom details including capacity and type.
//         </p>
//       </div>

//       <div className="bg-gray-700/90 p-6 rounded-2xl border border-indigo-600 shadow-lg hover:shadow-2xl transition-all duration-300">
//         <style>
//           {`
//             /* Labels */
//             .classrooms-form label {
//               font-family: 'Inter', sans-serif;
//               font-weight: 700;
//               color: #111827; /* dark labels */
//               font-size: 1rem;
//               letter-spacing: 0.05em;
//               margin-bottom: 0.5rem;
//               display: block;
//             }

//             /* Inputs, Selects, Textarea */
//             .classrooms-form input,
//             .classrooms-form select,
//             .classrooms-form textarea {
//               width: 100%;
//               padding: 0.7rem 1rem;
//               border-radius: 0.6rem;
//               background-color: #4b5563; /* slightly lighter dark background */
//               color: #f9fafb; /* white text */
//               border: 2px solid #4f46e5; /* indigo border */
//               font-family: 'Inter', sans-serif;
//               font-size: 1rem;
//               letter-spacing: 0.01em;
//               transition: all 0.3s ease;
//             }

//             /* Options inside select */
//             .classrooms-form select option {
//               background-color: #4b5563;
//               color: #f9fafb;
//             }

//             /* Placeholder */
//             .classrooms-form input::placeholder,
//             .classrooms-form select::placeholder,
//             .classrooms-form textarea::placeholder {
//               color: #d1d5db; /* soft gray */
//             }

//             /* Focus glow */
//             .classrooms-form input:focus,
//             .classrooms-form select:focus,
//             .classrooms-form textarea:focus {
//               outline: none;
//               border-color: #3b82f6; /* blue */
//               box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
//               background-color: #374151; /* darker on focus */
//             }

//             /* Table headers */
//             .classrooms-form th {
//               background-color: #4b5563;
//               color: #f3f4f6;
//               font-weight: 700;
//               padding: 0.75rem 1rem;
//               letter-spacing: 0.02em;
//             }

//             /* Table rows */
//             .classrooms-form td {
//               color: #f9fafb;
//               border-top: 1px solid #4b5563;
//               padding: 0.75rem 1rem;
//             }

//             /* Row hover */
//             .classrooms-form tr:hover td {
//               background-color: #6b7280;
//               transition: background-color 0.3s;
//             }
//           `}
//         </style>

//         <div className="classrooms-form">
//           <CrudPage
//             title="Classrooms"
//             columns={[
//               { key: 'name', label: 'Name', required: true },
//               { key: 'capacity', label: 'Capacity', type: 'number', required: true },
//               { key: 'type', label: 'Type', required: true },
//             ]}
//             list={api.getClassrooms}
//             create={api.createClassroom}
//             update={api.updateClassroom}
//             remove={api.deleteClassroom}
//             initial={{ name:'', capacity:30, type:'theory' }}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }



import React from 'react'
import CrudPage from './CrudPage'
import { api } from '../utils/api'

export default function Classrooms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-wider drop-shadow">
            Classrooms
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Manage all classrooms efficiently
          </p>
        </div>

        {/* CrudPage Container */}
        <div className="bg-gray-700/90 p-6 rounded-2xl border border-indigo-600 shadow-lg hover:shadow-2xl transition-all duration-300">
          <style>
            {`
              /* Labels */
              .classrooms-form label {
                font-family: 'Inter', sans-serif;
                font-weight: 700;
                color: #111827; /* dark label */
                font-size: 1rem;
                letter-spacing: 0.05em;
                margin-bottom: 0.5rem;
                display: block;
              }

              /* Inputs and Selects */
              .classrooms-form input,
              .classrooms-form select,
              .classrooms-form textarea {
                width: 100%;
                padding: 0.7rem 1rem;
                border-radius: 0.6rem;
                background-color: #4b5563; /* slightly lighter than container */
                color: #f9fafb; /* white text */
                border: 2px solid #4f46e5; /* indigo border */
                font-family: 'Inter', sans-serif;
                font-size: 1rem;
                letter-spacing: 0.01em;
                transition: all 0.3s ease;
              }

              /* Options inside select */
              .classrooms-form select option {
                background-color: #4b5563;
                color: #f9fafb;
              }

              /* Placeholder */
              .classrooms-form input::placeholder,
              .classrooms-form select::placeholder,
              .classrooms-form textarea::placeholder {
                color: #d1d5db; /* soft gray placeholder */
              }

              /* Focus glow */
              .classrooms-form input:focus,
              .classrooms-form select:focus,
              .classrooms-form textarea:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
                background-color: #374151; /* darker on focus */
              }
            `}
          </style>

          <div className="classrooms-form">
            <CrudPage
              title="Classrooms"
              columns={[
                { key: 'name', label: 'Name', required: true },
                { key: 'capacity', label: 'Capacity', type: 'number', required: true },
                { key: 'type', label: 'Type', required: true },
              ]}
              list={api.getClassrooms}
              create={api.createClassroom}
              update={api.updateClassroom}
              remove={api.deleteClassroom}
              initial={{ name:'', capacity:30, type:'theory' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
