// // import React from 'react'
// // import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
// // import { useAuth } from '../context/AuthContext'

// // export default function Layout() {
// //   const { user, logout } = useAuth()
// //   const navigate = useNavigate()
// //   const doLogout = () => { logout(); navigate('/login'); }
// //   return (
// //     <div className="min-h-screen flex bg-gray-50">
// //       <aside className="w-64 bg-white border-r">
// //         <div className="p-4 font-semibold text-blue-700">EduSchedule</div>
// //         <nav className="p-2 space-y-1">
// //           <NavLink to="/" end className={({isActive})=>`block px-3 py-2 rounded ${isActive?'bg-blue-100 text-blue-700':'hover:bg-gray-100'}`}>Dashboard</NavLink>
// //           <NavLink to="/users" className={({isActive})=>`block px-3 py-2 rounded ${isActive?'bg-blue-100 text-blue-700':'hover:bg-gray-100'}`}>Users</NavLink>
// //           <NavLink to="/courses" className={({isActive})=>`block px-3 py-2 rounded ${isActive?'bg-blue-100 text-blue-700':'hover:bg-gray-100'}`}>Courses</NavLink>
// //           <NavLink to="/classrooms" className={({isActive})=>`block px-3 py-2 rounded ${isActive?'bg-blue-100 text-blue-700':'hover:bg-gray-100'}`}>Classrooms</NavLink>
// //           <NavLink to="/faculty" className={({isActive})=>`block px-3 py-2 rounded ${isActive?'bg-blue-100 text-blue-700':'hover:bg-gray-100'}`}>Faculty</NavLink>
// //           <NavLink to="/timetable" className={({isActive})=>`block px-3 py-2 rounded ${isActive?'bg-blue-100 text-blue-700':'hover:bg-gray-100'}`}>Timetable</NavLink>
// //         </nav>
// //       </aside>
// //       <div className="flex-1 flex flex-col">
// //         <header className="h-14 bg-white border-b flex items-center justify-between px-4">
// //           <div>Welcome {user?.name || user?.email} ({user?.role})</div>
// //           <button className="px-3 py-1 bg-gray-800 text-white rounded" onClick={doLogout}>Logout</button>
// //         </header>
// //         <main className="p-4"><Outlet /></main>
// //       </div>
// //     </div>
// //   )
// // }


// import React, { useState, useEffect } from 'react';
// import { 
//   Home, 
//   Users, 
//   BookOpen, 
//   Building, 
//   User, 
//   Calendar,
//   Menu,
//   X,
//   LogOut,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';

// const Layout = () => {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeLink, setActiveLink] = useState('/dashboard'); // Mock active state

//   // Mock data - replace these with your actual implementations
//   const currentUser = { name: 'John Doe' }; 
//   const doLogout = () => console.log('Logout clicked');
  
//   const navigationLinks = [
//     { path: '/pages/Dashboard.jsx', label: 'Dashboard', icon: Home },
//     { path: '/users', label: 'Users', icon: Users },
//     { path: '/courses', label: 'Courses', icon: BookOpen },
//     { path: '/classrooms', label: 'Classrooms', icon: Building },
//     { path: '/faculty', label: 'Faculty', icon: User },
//     { path: '/timetable', label: 'Timetable', icon: Calendar }
//   ];

//   // Close mobile menu on window resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const NavItem = ({ link, isMobile = false }) => {
//     const { path, label, icon: Icon } = link;
//     const isActive = activeLink === path;

//     return (
//       <button
//         onClick={() => {
//           setActiveLink(path);
//           if (isMobile) setIsMobileMenuOpen(false);
//         }}
//         className={`
//           group relative flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out
//           ${isActive
//             ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-[1.02]'
//             : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:shadow-md hover:transform hover:scale-[1.01]'
//           }
//           ${isSidebarCollapsed && !isMobile ? 'justify-center px-3' : ''}
//         `}
//       >
//         <Icon className={`h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
//           isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
//         }`} />
//         <span className={`ml-3 transition-all duration-200 ${
//           isSidebarCollapsed && !isMobile ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
//         }`}>
//           {label}
//         </span>
        
//         {/* Active indicator */}
//         {isActive && (
//           <div className="absolute right-2 w-2 h-2 bg-white rounded-full opacity-80"></div>
//         )}
        
//         {/* Tooltip for collapsed state */}
//         {isSidebarCollapsed && !isMobile && (
//           <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//             {label}
//           </div>
//         )}
//       </button>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700 shadow-2xl z-50 transition-all duration-300 ease-in-out
//         ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
//         ${isSidebarCollapsed ? 'w-20' : 'w-64'}
//         md:translate-x-0
//       `}>
//         <div className="flex flex-col h-full">
//           {/* Sidebar Header */}
//           <div className={`flex items-center justify-between p-6 border-b border-gray-700 ${
//             isSidebarCollapsed ? 'px-4' : ''
//           }`}>
//             <div className={`flex items-center transition-all duration-200 ${
//               isSidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
//             }`}>
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
//                 <BookOpen className="h-5 w-5 text-white" />
//               </div>
//               <span className="ml-3 text-xl font-bold text-white">EduSchedule</span>
//             </div>
            
//             {/* Desktop Collapse Button */}
//             <button
//               onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
//               className="hidden md:flex p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
//             >
//               {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
//             </button>

//             {/* Mobile Close Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>

//           {/* Navigation Links */}
//           <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//             {navigationLinks.map((link) => (
//               <NavItem key={link.path} link={link} />
//             ))}
//           </nav>

//           {/* Sidebar Footer */}
//           <div className="p-4 border-t border-gray-700">
//             <div className={`text-xs text-gray-400 text-center transition-all duration-200 ${
//               isSidebarCollapsed ? 'opacity-0' : 'opacity-100'
//             }`}>
//               © 2024 EduSchedule
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className={`transition-all duration-300 ease-in-out ${
//         isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
//       }`}>
//         {/* Header */}
//         <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
//           <div className="flex items-center justify-between px-6 py-4">
//             {/* Left side - Mobile menu button + Welcome */}
//             <div className="flex items-center space-x-4">
//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(true)}
//                 className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
//               >
//                 <Menu className="h-6 w-6" />
//               </button>

//               {/* Welcome Message */}
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   Welcome back, {currentUser?.name || 'User'}!
//                 </h1>
//                 <p className="text-sm text-gray-600 mt-1">
//                   {new Date().toLocaleDateString('en-US', { 
//                     weekday: 'long', 
//                     year: 'numeric', 
//                     month: 'long', 
//                     day: 'numeric' 
//                   })}
//                 </p>
//               </div>
//             </div>

//             {/* Right side - Logout button */}
//             <button
//               onClick={doLogout}
//               className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 hover:shadow-md group"
//             >
//               <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
//               <span>Logout</span>
//             </button>
//           </div>
//         </header>

//         {/* Main Content - This is where your Outlet would go */}
//         <main className="p-6">
//           <div className="max-w-7xl mx-auto">
//             {/* Replace this div with your <Outlet /> component */}
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Main Content Area</h2>
//               <p className="text-gray-600">
//                 Replace this section with your actual &lt;Outlet /&gt; component for routing.
//                 This is just a placeholder to show the layout structure.
//               </p>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;


import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  Users,
  BookOpen,
  Building,
  User,
  Calendar,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const doLogout = () => {
    logout();
    navigate("/login");
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/users", label: "Users", icon: Users },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/classrooms", label: "Classrooms", icon: Building },
    { path: "/faculty", label: "Faculty", icon: User },
    { path: "/timetable", label: "Timetable", icon: Calendar },
  ];

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const NavItem = ({ link }) => {
    const { path, label, icon: Icon } = link;

    return (
      <NavLink
        to={path}
        end
        onClick={() => setIsMobileMenuOpen(false)}
        className={({ isActive }) =>
          `
          group relative flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out
          ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-[1.02]"
              : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:shadow-md hover:scale-[1.01]"
          }
          ${isSidebarCollapsed ? "justify-center px-3" : ""}
        `
        }
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {!isSidebarCollapsed && <span className="ml-3">{label}</span>}
      </NavLink>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700 shadow-2xl z-50 transition-all duration-300
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        ${isSidebarCollapsed ? "w-20" : "w-64"}
        md:translate-x-0
      `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            {!isSidebarCollapsed && (
              <span className="text-xl font-bold text-white">EduSchedule</span>
            )}

            {/* Collapse Button (desktop) */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden md:flex p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>

            {/* Close button (mobile) */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationLinks.map((link) => (
              <NavItem key={link.path} link={link} />
            ))}
          </nav>

          {/* Footer */}
          {!isSidebarCollapsed && (
            <div className="p-4 border-t border-gray-700 text-xs text-gray-400 text-center">
              © 2024 EduSchedule
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Welcome */}
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Welcome {user?.name || user?.email} ({user?.role})
              </h1>
            </div>

            {/* Logout */}
            <button
              onClick={doLogout}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-red-50 hover:text-red-700 rounded-lg transition"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Routed Pages */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
