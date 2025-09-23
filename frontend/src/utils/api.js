import { getToken, clearToken } from './auth'

const API_BASE = 'http://localhost:3000'

async function request(path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    if (res.status === 401) {
      clearToken()
    }
    throw new Error(data.error || `HTTP ${res.status}`)
  }
  return data
}

export const api = {
  // health
  health: () => request('/health'),
  // auth
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  // users
  getUsers: () => request('/users'),
  createUser: (payload) => request('/users', { method: 'POST', body: JSON.stringify(payload) }),
  updateUser: (id, payload) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteUser: (id) => request(`/users/${id}`, { method: 'DELETE' }),
  // courses
  getCourses: () => request('/courses'),
  createCourse: (payload) => request('/courses', { method: 'POST', body: JSON.stringify(payload) }),
  updateCourse: (id, payload) => request(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteCourse: (id) => request(`/courses/${id}`, { method: 'DELETE' }),
  // classrooms
  getClassrooms: () => request('/classrooms'),
  createClassroom: (payload) => request('/classrooms', { method: 'POST', body: JSON.stringify(payload) }),
  updateClassroom: (id, payload) => request(`/classrooms/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteClassroom: (id) => request(`/classrooms/${id}`, { method: 'DELETE' }),
  // faculty
  getFaculty: () => request('/faculty'),
  createFaculty: (payload) => request('/faculty', { method: 'POST', body: JSON.stringify(payload) }),
  updateFaculty: (id, payload) => request(`/faculty/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteFaculty: (id) => request(`/faculty/${id}`, { method: 'DELETE' }),
  // timetable
  generateTimetable: (choices = 3) => request('/timetable/generate', { method: 'POST', body: JSON.stringify({ choices }) }).then(d => d.choices || []),
  getTimetableChoices: () => request('/timetable/choices').then(d => d.choices || []),
  //
  // Add this inside your exported api object
getAllApprovedTimetables: () =>
  request('/timetable/all-approved').then(d => d.choices || []),


}





