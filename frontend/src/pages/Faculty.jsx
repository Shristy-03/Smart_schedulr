// import React from 'react'
// import CrudPage from './CrudPage'
// import { api } from '../utils/api'

// export default function Faculty() {
//   return (
//     <CrudPage
//       title="Faculty"
//       columns={[
//         { key: 'userEmail', label: 'User Email', required: true },
//         { key: 'maxLoadPerWeek', label: 'Max Load/Week', type: 'number', required: true },
//       ]}
//       list={api.getFaculty}
//       create={api.createFaculty}
//       update={api.updateFaculty}
//       remove={api.deleteFaculty}
//       initial={{ userEmail:'', maxLoadPerWeek:8 }}
//     />
//   )
// }





import React from 'react'
import CrudPage from './CrudPage'
import { api } from '../utils/api'

export default function Faculty() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-wider drop-shadow">
            Faculty
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Manage faculty workload efficiently
          </p>
        </div>

        {/* CrudPage Container */}
        <div className="bg-gray-700/90 p-6 rounded-2xl border border-indigo-600 shadow-lg hover:shadow-2xl transition-all duration-300">
          <style>
            {`
              /* Labels */
              .faculty-form label {
                font-family: 'Inter', sans-serif;
                font-weight: 700;
                color: #111827; /* dark label */
                font-size: 1rem;
                letter-spacing: 0.05em;
                margin-bottom: 0.5rem;
                display: block;
              }

              /* Inputs and Selects */
              .faculty-form input,
              .faculty-form select,
              .faculty-form textarea {
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
              .faculty-form select option {
                background-color: #4b5563;
                color: #f9fafb;
              }

              /* Placeholder */
              .faculty-form input::placeholder,
              .faculty-form select::placeholder,
              .faculty-form textarea::placeholder {
                color: #d1d5db; /* soft gray placeholder */
              }

              /* Focus glow */
              .faculty-form input:focus,
              .faculty-form select:focus,
              .faculty-form textarea:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
                background-color: #374151; /* darker on focus */
              }
            `}
          </style>

          <div className="faculty-form">
            <CrudPage
              title="Faculty"
              columns={[
                { key: 'userEmail', label: 'User Email', required: true },
                { key: 'maxLoadPerWeek', label: 'Max Load/Week', type: 'number', required: true },
              ]}
              list={api.getFaculty}
              create={api.createFaculty}
              update={api.updateFaculty}
              remove={api.deleteFaculty}
              initial={{ userEmail:'', maxLoadPerWeek:8 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}






