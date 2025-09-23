// Node.js Example: How to use Schedulr API from server-side
// This shows how to integrate with your backend from another Node.js application

import fetch from 'node-fetch'; // npm install node-fetch

class SchedulrAPIClient {
  constructor(baseURL = 'import.meta.env.VITE_API_BASE;') {
    this.baseURL = baseURL;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
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

  async healthCheck() {
    return await this.request('/health');
  }

  async generateTimetable(choices = 3) {
    return await this.request('/timetable/generate', {
      method: 'POST',
      body: JSON.stringify({ choices })
    });
  }

  async getTimetableChoices() {
    return await this.request('/timetable/choices');
  }

  async getUsers() {
    return await this.request('/users');
  }

  async getCourses() {
    return await this.request('/courses');
  }

  async getClassrooms() {
    return await this.request('/classrooms');
  }

  async getFaculty() {
    return await this.request('/faculty');
  }
}

// Example usage
async function demonstrateAPI() {
  console.log('🚀 Schedulr API Client Demo\n');

  const api = new SchedulrAPIClient();

  try {
    // 1. Health check
    console.log('1. Testing health endpoint...');
    const health = await api.healthCheck();
    console.log('✅ Health check:', health.status);

    // 2. Login
    console.log('\n2. Logging in...');
    const loginResult = await api.login('admin@example.com', 'admin123');
    console.log('✅ Login successful:', loginResult.user.name);

    // 3. Get all data
    console.log('\n3. Fetching all data...');
    const [users, courses, classrooms, faculty] = await Promise.all([
      api.getUsers(),
      api.getCourses(),
      api.getClassrooms(),
      api.getFaculty()
    ]);

    console.log(`✅ Users: ${users.length}`);
    console.log(`✅ Courses: ${courses.length}`);
    console.log(`✅ Classrooms: ${classrooms.length}`);
    console.log(`✅ Faculty: ${faculty.length}`);

    // 4. Generate timetable
    console.log('\n4. Generating timetable...');
    const timetableResult = await api.generateTimetable(2);
    console.log(`✅ Generated ${timetableResult.choices.length} timetable choices`);

    // 5. Display timetable details
    console.log('\n5. Timetable Details:');
    timetableResult.choices.forEach((timetable, index) => {
      console.log(`\n   Choice ${index + 1}: ${timetable.name}`);
      console.log(`   ID: ${timetable.id}`);
      console.log(`   Total Classes: ${timetable.slots ? timetable.slots.length : 0}`);
      
      if (timetable.slots && timetable.slots.length > 0) {
        console.log('   Sample Classes:');
        timetable.slots.slice(0, 3).forEach(slot => {
          console.log(`     - Day ${slot.day}, Slot ${slot.slot}: ${slot.courseCode} (${slot.batch}) in ${slot.roomName}`);
        });
        if (timetable.slots.length > 3) {
          console.log(`     ... and ${timetable.slots.length - 3} more classes`);
        }
      }
    });

    console.log('\n🎉 API demonstration completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the demonstration
if (import.meta.url === `file://${process.argv[1]}`) {
  demonstrateAPI();
}

export default SchedulrAPIClient;


