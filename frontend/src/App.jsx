import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Courses from './pages/Courses'
import Classrooms from './pages/Classrooms'
import Faculty from './pages/Faculty'
import Timetable from './pages/Timetable'
import AllApprovedTimetables from "./pages/AllApprovedTimetables";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="courses" element={<Courses />} />
            <Route path="classrooms" element={<Classrooms />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="/" element={<Timetable />} />
        <Route path="/approved-timetables" element={<AllApprovedTimetables />} />

          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  )
}





