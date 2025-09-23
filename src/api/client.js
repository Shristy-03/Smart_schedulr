// API Client for Schedulr Backend
// This file provides easy-to-use functions to connect frontend with your backend

const API_BASE = import.meta.env.VITE_API_BASE;

class SchedulrAPI {
  constructor() {
    this.token = localStorage.getItem('schedulr_token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    localStorage.setItem('schedulr_token', token);
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
    localStorage.removeItem('schedulr_token');
  }

  // Get headers for authenticated requests
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  // Make HTTP request
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication APIs
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  async logout() {
    this.clearToken();
  }

  // Health check
  async healthCheck() {
    return await this.request('/health');
  }

  // User Management APIs
  async getUsers() {
    return await this.request('/users');
  }

  async createUser(userData) {
    return await this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async updateUser(userId, userData) {
    return await this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  async deleteUser(userId) {
    return await this.request(`/users/${userId}`, {
      method: 'DELETE'
    });
  }

  // Course Management APIs
  async getCourses() {
    return await this.request('/courses');
  }

  async createCourse(courseData) {
    return await this.request('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData)
    });
  }

  async updateCourse(courseId, courseData) {
    return await this.request(`/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(courseData)
    });
  }

  async deleteCourse(courseId) {
    return await this.request(`/courses/${courseId}`, {
      method: 'DELETE'
    });
  }

  // Classroom Management APIs
  async getClassrooms() {
    return await this.request('/classrooms');
  }

  async createClassroom(classroomData) {
    return await this.request('/classrooms', {
      method: 'POST',
      body: JSON.stringify(classroomData)
    });
  }

  async updateClassroom(classroomId, classroomData) {
    return await this.request(`/classrooms/${classroomId}`, {
      method: 'PUT',
      body: JSON.stringify(classroomData)
    });
  }

  async deleteClassroom(classroomId) {
    return await this.request(`/classrooms/${classroomId}`, {
      method: 'DELETE'
    });
  }

  // Faculty Management APIs
  async getFaculty() {
    return await this.request('/faculty');
  }

  async createFaculty(facultyData) {
    return await this.request('/faculty', {
      method: 'POST',
      body: JSON.stringify(facultyData)
    });
  }

  async updateFaculty(facultyId, facultyData) {
    return await this.request(`/faculty/${facultyId}`, {
      method: 'PUT',
      body: JSON.stringify(facultyData)
    });
  }

  async deleteFaculty(facultyId) {
    return await this.request(`/faculty/${facultyId}`, {
      method: 'DELETE'
    });
  }

  // Timetable Management APIs
  async generateTimetable(choices = 3) {
    return await this.request('/timetable/generate', {
      method: 'POST',
      body: JSON.stringify({ choices })
    });
  }

  async getTimetableChoices() {
    return await this.request('/timetable/choices');
  }

  async detectConflicts(timetable) {
    return await this.request('/timetable/conflicts', {
      method: 'POST',
      body: JSON.stringify({ timetable })
    });
  }

  async approveTimetable(approvedId) {
    return await this.request('/timetable/review', {
      method: 'POST',
      body: JSON.stringify({ approvedId })
    });
  }

  // Utility methods
  isAuthenticated() {
    return !!this.token;
  }

  getCurrentUser() {
    if (!this.token) return null;
    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  }
}

// Create and export a singleton instance
const apiClient = new SchedulrAPI();
export default apiClient;

// Also export the class for custom instances
export { SchedulrAPI };
