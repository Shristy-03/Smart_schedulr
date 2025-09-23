// import React from 'react'
// import CrudPage from './CrudPage'
// import { api } from '../utils/api'

// export default function Users() {
//   return (
//     <CrudPage
//       title="Users"
//       columns={[
//         { key: 'name', label: 'Name', required: true },
//         { key: 'email', label: 'Email', required: true },
//         { key: 'role', label: 'Role', required: true },
//         { key: 'department', label: 'Department' },
//       ]}
//       list={api.getUsers}
//       create={api.createUser}
//       update={api.updateUser}
//       remove={api.deleteUser}
//       initial={{ name: '', email: '', role: 'admin', department: '' }}
//     />
//   )
// }



// import React from 'react'
// import CrudPage from './CrudPage'
// import { api } from '../utils/api'

// export default function Users() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//             Users
//           </h1>
//           <p className="text-gray-400 mt-2">Manage all users efficiently</p>
//         </div>

//         {/* CrudPage with styled container */}
//         <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300">
//           <CrudPage
//             title="Users"
//             columns={[
//               { key: 'name', label: 'Name', required: true },
//               { key: 'email', label: 'Email', required: true },
//               { key: 'role', label: 'Role', required: true },
//               { key: 'department', label: 'Department' },
//             ]}
//             list={api.getUsers}
//             create={api.createUser}
//             update={api.updateUser}
//             remove={api.deleteUser}
//             initial={{ name: '', email: '', role: 'admin', department: '' }}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }


// import React from 'react'
// import CrudPage from './CrudPage'
// import { api } from '../utils/api'

// export default function Users() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//             Users
//           </h1>
//           <p className="text-gray-400 mt-2">Manage all users efficiently</p>
//         </div>

//         {/* CrudPage Container */}
//         <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300">
//           <CrudPage
//             title="Users"
//             columns={[
//               { key: 'name', label: 'Name', required: true },
//               { key: 'email', label: 'Email', required: true },
//               { key: 'role', label: 'Role', required: true },
//               { key: 'department', label: 'Department' },
//             ]}
//             list={api.getUsers}
//             create={api.createUser}
//             update={api.updateUser}
//             remove={api.deleteUser}
//             initial={{ name: '', email: '', role: 'admin', department: '' }}
//             // 👇 Pass extra props so CrudPage can apply styles
//             inputClassName="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
//             buttonClassName="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
//             tableClassName="w-full border-collapse rounded-lg overflow-hidden"
//             thClassName="bg-gray-700 text-gray-300 font-semibold px-4 py-3 text-left"
//             tdClassName="px-4 py-3 text-gray-200 border-t border-gray-700 hover:bg-gray-700 transition-colors"
//             rowHoverClassName="hover:bg-gray-800 transition-all duration-200"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }






import React from 'react'
import CrudPage from './CrudPage'
import { api } from '../utils/api'

export default function Users() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-wider drop-shadow">
            Users
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Manage all users efficiently
          </p>
        </div>

        {/* CrudPage Container */}
        <div className="bg-gray-700/90 p-6 rounded-2xl border border-indigo-600 shadow-lg hover:shadow-2xl transition-all duration-300">
          <style>
            {`
              /* Labels */
              .users-form label {
                font-family: 'Inter', sans-serif;
                font-weight: 700;
                color: #111827; /* dark label */
                font-size: 1rem;
                letter-spacing: 0.05em;
                margin-bottom: 0.5rem;
                display: block;
              }

              /* Inputs and Selects */
              .users-form input,
              .users-form select,
              .users-form textarea {
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
              .users-form select option {
                background-color: #4b5563;
                color: #f9fafb;
              }

              /* Placeholder */
              .users-form input::placeholder,
              .users-form select::placeholder,
              .users-form textarea::placeholder {
                color: #d1d5db; /* soft gray placeholder */
              }

              /* Focus glow */
              .users-form input:focus,
              .users-form select:focus,
              .users-form textarea:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
                background-color: #374151; /* darker on focus */
              }
            `}
          </style>

          <div className="users-form">
            <CrudPage
              title="Users"
              columns={[
                { key: 'name', label: 'Name', required: true },
                { key: 'email', label: 'Email', required: true },
                { key: 'role', label: 'Role', required: true },
                { key: 'department', label: 'Department' },
              ]}
              list={api.getUsers}
              create={api.createUser}
              update={api.updateUser}
              remove={api.deleteUser}
              initial={{ name: '', email: '', role: 'admin', department: '' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
