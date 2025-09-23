// In-memory database for prototype
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

const hash = (pwd) => bcrypt.hashSync(pwd, 8);

export const db = {
  users: [
    { id: uuid(), role: 'admin', name: 'Admin One', email: 'admin@example.com', passwordHash: hash('admin123') },
    { id: uuid(), role: 'faculty', name: 'Dr. Alice', email: 'alice@example.com', passwordHash: hash('password'), department: 'CSE' },
    { id: uuid(), role: 'faculty', name: 'Dr. Bob', email: 'bob@example.com', passwordHash: hash('password'), department: 'ECE' },
    { id: uuid(), role: 'student', name: 'Charlie', email: 'charlie@example.com', passwordHash: hash('password') }
  ],
  courses: [
    // semester-based courses with weekly sessions
    { id: uuid(), code: 'CSE101', name: 'Data Structures', department: 'CSE', semester: 3, weeklyClasses: 3, type: 'theory', batch: 'CSE-3A' },
    { id: uuid(), code: 'CSE102', name: 'Algorithms', department: 'CSE', semester: 3, weeklyClasses: 3, type: 'theory', batch: 'CSE-3A' },
    { id: uuid(), code: 'ECE201', name: 'Signals & Systems', department: 'ECE', semester: 3, weeklyClasses: 3, type: 'theory', batch: 'ECE-3A' },
    { id: uuid(), code: 'LAB101', name: 'DS Lab', department: 'CSE', semester: 3, weeklyClasses: 1, type: 'lab', durationSlots: 2, batch: 'CSE-3A' }
  ],
  faculty: [
    // availability: days 0-5 (Mon-Sat), slots per day 0..7
    { id: uuid(), userEmail: 'alice@example.com', maxLoadPerWeek: 12, availability: generateAvailability([0,1,2,3,4], [1,2,3,4,5]), leaves: [] },
    { id: uuid(), userEmail: 'bob@example.com', maxLoadPerWeek: 10, availability: generateAvailability([0,1,2,3,4], [1,2,3,4,5]), leaves: [] }
  ],
  classrooms: [
    { id: uuid(), name: 'A-101', capacity: 60, type: 'theory', availability: standardAvailability() },
    { id: uuid(), name: 'A-102', capacity: 60, type: 'theory', availability: standardAvailability() },
    { id: uuid(), name: 'Lab-CSE-1', capacity: 30, type: 'lab', availability: standardAvailability() }
  ],
  assignments: [
    // map courses to faculty by email for prototype
    { courseCode: 'CSE101', facultyEmail: 'alice@example.com' },
    { courseCode: 'CSE102', facultyEmail: 'alice@example.com' },
    { courseCode: 'ECE201', facultyEmail: 'bob@example.com' },
    { courseCode: 'LAB101', facultyEmail: 'alice@example.com' }
  ],
  constraints: {
    maxClassesPerDayPerBatch: 5,
    workingDays: [0,1,2,3,4],
    dailySlots: [0,1,2,3,4,5],
    slotDurationMinutes: 60
  },
  timetables: []
};

function standardAvailability() {
  const days = [0,1,2,3,4];
  const slots = [0,1,2,3,4,5];
  const availability = {};
  days.forEach((d)=>{ availability[d] = new Set(slots); });
  return availability;
}

function generateAvailability(days, slots) {
  const availability = {};
  days.forEach((d)=>{ availability[d] = new Set(slots); });
  return availability;
}


