// import React from 'react'
// // import '../style/dashboard.css';


// export default function Dashboard() {
//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
//       <p>Use the sidebar to manage Users, Courses, Classrooms, Faculty and Timetable.</p>
//     </div>
//   )
// }


// import React from 'react';
// import '../style/dashboard.css';

// export default function Dashboard() {
//   return (
//     <div className="dashboard-container">
//       <h1>Dashboard</h1>
//       <p>Use the sidebar to manage Users, Courses, Classrooms, Faculty and Timetable.</p>

//       <div className="dashboard-cards">
//         <div className="dashboard-card">
//           <h2>Users</h2>
//           <p>Manage all users in your system.</p>
//         </div>

//         <div className="dashboard-card">
//           <h2>Courses</h2>
//           <p>Create, edit, or delete courses.</p>
//         </div>

//         <div className="dashboard-card">
//           <h2>Classrooms</h2>
//           <p>Assign classrooms and manage schedules.</p>
//         </div>

//         <div className="dashboard-card">
//           <h2>Faculty</h2>
//           <p>Manage faculty members and their courses.</p>
//         </div>

//         <div className="dashboard-card">
//           <h2>Timetable</h2>
//           <p>View and manage the timetable.</p>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from 'react'

// export default function Dashboard() {
//   // Dummy data for now (replace with API later)
//   const upcomingClasses = [
//     { id: 1, subject: "Mathematics", faculty: "Dr. Sharma", time: "10:00 AM - 11:00 AM", room: "Room 201" },
//     { id: 2, subject: "Physics", faculty: "Prof. Mehta", time: "11:15 AM - 12:15 PM", room: "Lab 3" },
//     { id: 3, subject: "Computer Science", faculty: "Ms. Kapoor", time: "2:00 PM - 3:00 PM", room: "Lab 1" },
//   ]

//   const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
//   const slots = ["9-10", "10-11", "11-12", "12-1", "2-3", "3-4"]

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
//       <p className="text-gray-600">Manage schedules, faculty, and classes all in one place.</p>

//       {/* Grid Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* Upcoming Classes */}
//         <div className="lg:col-span-1 p-6 bg-white rounded-2xl shadow">
//           <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
//           <ul className="space-y-3">
//             {upcomingClasses.map(cls => (
//               <li key={cls.id} className="p-3 border rounded-lg hover:bg-gray-50">
//                 <div className="font-semibold text-gray-800">{cls.subject}</div>
//                 <div className="text-sm text-gray-600">{cls.faculty}</div>
//                 <div className="text-sm text-gray-500">{cls.time} • {cls.room}</div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Weekly Timetable */}
//         <div className="lg:col-span-2 p-6 bg-white rounded-2xl shadow overflow-x-auto">
//           <h2 className="text-xl font-semibold mb-4">Weekly Timetable</h2>
//           <table className="w-full border-collapse">
//             <thead>
//               <tr>
//                 <th className="border p-2 bg-gray-100"></th>
//                 {days.map(day => (
//                   <th key={day} className="border p-2 bg-gray-100">{day}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {slots.map(slot => (
//                 <tr key={slot}>
//                   <td className="border p-2 font-medium bg-gray-50">{slot}</td>
//                   {days.map(day => (
//                     <td key={day+slot} className="border p-2 text-center text-gray-500">
//                       —
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="p-6 bg-white rounded-2xl shadow">
//         <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
//         <div className="flex flex-wrap gap-3">
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Class</button>
//           <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Assign Faculty</button>
//           <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">View Timetable</button>
//         </div>
//       </div>
//     </div>
//   )
// }



import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, BookOpen, Plus, Eye, UserPlus, Settings, Bell, Filter, Search, ChevronDown, MapPin, User } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Sample data
  const upcomingClasses = [
    { id: 1, subject: 'Mathematics', faculty: 'Dr. Smith', time: '09:00 AM', room: 'Room 101', duration: '1h 30m', students: 25 },
    { id: 2, subject: 'Physics', faculty: 'Prof. Johnson', time: '11:00 AM', room: 'Lab 203', duration: '2h', students: 20 },
    { id: 3, subject: 'Chemistry', faculty: 'Dr. Wilson', time: '02:00 PM', room: 'Lab 105', duration: '1h 45m', students: 22 },
    { id: 4, subject: 'Biology', faculty: 'Prof. Davis', time: '03:45 PM', room: 'Room 301', duration: '1h 15m', students: 28 }
  ];

  const facultyData = [
    { id: 1, name: 'Dr. Smith', department: 'Mathematics', classes: 5, status: 'Available' },
    { id: 2, name: 'Prof. Johnson', department: 'Physics', classes: 3, status: 'Busy' },
    { id: 3, name: 'Dr. Wilson', department: 'Chemistry', classes: 4, status: 'Available' },
    { id: 4, name: 'Prof. Davis', department: 'Biology', classes: 6, status: 'Available' }
  ];

  const timeSlots = ['09:00', '10:30', '12:00', '01:30', '03:00'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const timetableData = {
    'Monday': { '09:00': 'Math - Dr. Smith', '10:30': 'Physics - Prof. Johnson', '01:30': 'Chemistry - Dr. Wilson' },
    'Tuesday': { '09:00': 'Biology - Prof. Davis', '12:00': 'Math - Dr. Smith', '03:00': 'Physics - Prof. Johnson' },
    'Wednesday': { '10:30': 'Chemistry - Dr. Wilson', '01:30': 'Biology - Prof. Davis', '03:00': 'Math - Dr. Smith' },
    'Thursday': { '09:00': 'Physics - Prof. Johnson', '10:30': 'Math - Dr. Smith', '12:00': 'Biology - Prof. Davis' },
    'Friday': { '09:00': 'Chemistry - Dr. Wilson', '01:30': 'Math - Dr. Smith', '03:00': 'Physics - Prof. Johnson' }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
    <div className={`bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className={`h-8 w-8 text-${color}-400`} />
        <div className={`text-2xl font-bold text-${color}-400`}>{value}</div>
      </div>
      <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </div>
  );

  const QuickActionButton = ({ icon: Icon, label, onClick, color = "blue" }) => (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-${color}-600 to-${color}-700 hover:from-${color}-700 hover:to-${color}-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Manage your academic schedule efficiently</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-white font-semibold">{currentTime.toLocaleDateString()}</div>
              <div className="text-gray-400 text-sm">{currentTime.toLocaleTimeString()}</div>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-3 rounded-xl transition-all duration-300 hover:scale-105">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 bg-gray-800 p-2 rounded-xl border border-gray-700">
          {[
            { id: 'overview', label: 'Overview', icon: Calendar },
            { id: 'timetable', label: 'Timetable', icon: Clock },
            { id: 'faculty', label: 'Faculty', icon: Users },
            { id: 'classes', label: 'Classes', icon: BookOpen }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                activeTab === id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={BookOpen}
                title="Total Classes"
                value="24"
                subtitle="Active this week"
                color="blue"
              />
              <StatCard
                icon={Users}
                title="Faculty Members"
                value="12"
                subtitle="Available today"
                color="green"
              />
              <StatCard
                icon={Clock}
                title="Hours Scheduled"
                value="48"
                subtitle="This week"
                color="yellow"
              />
              <StatCard
                icon={Calendar}
                title="Rooms Booked"
                value="8"
                subtitle="Currently occupied"
                color="purple"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
                <button
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronDown className={`h-5 w-5 transform transition-transform ${showQuickActions ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300 ${showQuickActions ? 'opacity-100 max-h-96' : 'opacity-100 max-h-96'}`}>
                <QuickActionButton
                  icon={Plus}
                  label="Add Class"
                  onClick={() => console.log('Add Class')}
                  color="blue"
                />
                <QuickActionButton
                  icon={UserPlus}
                  label="Assign Faculty"
                  onClick={() => console.log('Assign Faculty')}
                  color="green"
                />
                <QuickActionButton
                  icon={Eye}
                  label="View Timetable"
                  onClick={() => setActiveTab('timetable')}
                  color="purple"
                />
                <QuickActionButton
                  icon={Settings}
                  label="Settings"
                  onClick={() => console.log('Settings')}
                  color="gray"
                />
              </div>
            </div>

            {/* Upcoming Classes */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Today's Classes</h2>
              <div className="space-y-4">
                {upcomingClasses.map((cls, index) => (
                  <div
                    key={cls.id}
                    className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-lg border border-gray-600 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">{cls.subject}</h3>
                          <div className="flex items-center space-x-4 text-gray-400 text-sm">
                            <span className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{cls.faculty}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{cls.room}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{cls.students} students</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold text-lg">{cls.time}</div>
                        <div className="text-gray-400 text-sm">{cls.duration}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timetable' && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Weekly Timetable</h2>
              <div className="flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Filter className="h-4 w-4 inline mr-2" />
                  Filter
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Plus className="h-4 w-4 inline mr-2" />
                  Add Slot
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-gray-400 font-medium p-4">Time</th>
                    {days.map(day => (
                      <th key={day} className="text-center text-gray-400 font-medium p-4 min-w-48">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(time => (
                    <tr key={time} className="border-t border-gray-700">
                      <td className="text-white font-medium p-4 bg-gray-800 rounded-l-lg">
                        {time}
                      </td>
                      {days.map(day => (
                        <td
                          key={`${day}-${time}`}
                          className="p-2 border-l border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer"
                          onClick={() => setSelectedTimeSlot(`${day}-${time}`)}
                        >
                          {timetableData[day]?.[time] ? (
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg text-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                              {timetableData[day][time]}
                            </div>
                          ) : (
                            <div className="h-12 flex items-center justify-center text-gray-500 text-sm hover:text-gray-300">
                              Available
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'faculty' && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Faculty Management</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search faculty..."
                    className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <UserPlus className="h-4 w-4 inline mr-2" />
                  Add Faculty
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facultyData.map(faculty => (
                <div key={faculty.id} className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-lg border border-gray-600 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{faculty.name}</h3>
                      <p className="text-gray-400">{faculty.department}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Classes:</span>
                      <span className="text-white font-medium">{faculty.classes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`font-medium ${faculty.status === 'Available' ? 'text-green-400' : 'text-red-400'}`}>
                        {faculty.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Class Management</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Plus className="h-4 w-4 inline mr-2" />
                Create Class
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingClasses.map(cls => (
                <div key={cls.id} className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-lg border border-gray-600 hover:border-blue-500 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-xl mb-2">{cls.subject}</h3>
                      <div className="space-y-2 text-gray-400">
                        <p className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{cls.faculty}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{cls.time} ({cls.duration})</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{cls.room}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{cls.students} students</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                        <Settings className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-600 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: `${(cls.students / 30) * 100}%` }}></div>
                  </div>
                  <p className="text-gray-400 text-sm">Capacity: {cls.students}/30</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
