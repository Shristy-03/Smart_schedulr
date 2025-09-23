import { db } from '../models/db.js';

// Timetable representation: { id, name, slots: [ { day, slot, batch, courseCode, facultyEmail, roomName, durationSlots } ] }

export function generateTimetable(options = { choices: 3 }) {
  const choices = [];
  for (let i = 0; i < (options.choices || 1); i += 1) {
    const tt = greedySchedule(i);
    choices.push(tt);
  }
  return choices;
}

export function detectConflicts(timetable) {
  const conflicts = [];
  const seen = new Map();
  for (const s of timetable.slots) {
    const keys = [
      `faculty:${s.facultyEmail}:${s.day}:${s.slot}`,
      `room:${s.roomName}:${s.day}:${s.slot}`,
      `batch:${s.batch}:${s.day}:${s.slot}`
    ];
    for (const k of keys) {
      if (seen.has(k)) {
        conflicts.push({ type: k.split(':')[0], existing: seen.get(k), clash: s });
      } else {
        seen.set(k, s);
      }
    }
  }
  return conflicts;
}

export function suggestRearrangements(timetable, maxSuggestions = 5) {
  const conflicts = detectConflicts(timetable);
  const suggestions = [];
  const { workingDays, dailySlots } = db.constraints;
  for (const c of conflicts) {
    const s = c.clash;
    // try moving to another free slot same day
    for (const slot of dailySlots) {
      if (slot === s.slot) continue;
      if (isFree(timetable, s.batch, s.facultyEmail, s.roomName, s.day, slot)) {
        suggestions.push({ move: s, to: { day: s.day, slot } });
        break;
      }
    }
    if (suggestions.length >= maxSuggestions) break;
    // try other days
    for (const day of workingDays) {
      if (day === s.day) continue;
      for (const slot of dailySlots) {
        if (isFree(timetable, s.batch, s.facultyEmail, s.roomName, day, slot)) {
          suggestions.push({ move: s, to: { day, slot } });
          break;
        }
      }
      if (suggestions.length >= maxSuggestions) break;
    }
  }
  return { conflicts, suggestions };
}

function greedySchedule(seed = 0) {
  const rng = mulberry32(1234 + seed);
  const { workingDays, dailySlots, maxClassesPerDayPerBatch } = db.constraints;
  const facultyByEmail = new Map(db.faculty.map((f) => [f.userEmail, { ...f, load: 0 }]));
  const roomPools = shuffleArray([...db.classrooms], rng);
  const courses = shuffleArray([...db.courses], rng)
    .sort((a, b) => (b.type === 'lab') - (a.type === 'lab'));

  const timetable = { id: `tt-${Date.now()}-${seed}`, name: `Choice ${seed + 1}`, slots: [] };
  const batchDailyCount = new Map(); // key: batch:day -> count

  for (const course of courses) {
    const weekly = course.weeklyClasses || 2;
    const duration = course.durationSlots || (course.type === 'lab' ? 2 : 1);
    const facultyEmail = db.assignments.find((a) => a.courseCode === course.code)?.facultyEmail;
    const faculty = facultyByEmail.get(facultyEmail);
    if (!faculty) continue;

    let sessionsPlaced = 0;
    let safety = 0;
    while (sessionsPlaced < weekly && safety < 500) {
      safety += 1;
      const day = randomPick(workingDays, rng);
      const startSlots = dailySlots.filter((s) => s + duration - 1 <= dailySlots[dailySlots.length - 1]);
      const slot = randomPick(startSlots, rng);
      const room = roomPools.find((r) => r.type === course.type && isFree(timetable, course.batch, facultyEmail, r.name, day, slot, duration));
      const key = `${course.batch}:${day}`;
      const dailyCount = batchDailyCount.get(key) || 0;
      if (!room) continue;
      if (dailyCount >= maxClassesPerDayPerBatch) continue;
      if (!isFacultyAvailable(faculty, day, slot, duration)) continue;

      // assign
      for (let d = 0; d < duration; d += 1) {
        timetable.slots.push({ day, slot: slot + d, batch: course.batch, courseCode: course.code, facultyEmail, roomName: room.name, durationSlots: duration });
      }
      faculty.load += duration;
      batchDailyCount.set(key, dailyCount + 1);
      sessionsPlaced += 1;
    }
  }
  return timetable;
}

function isFacultyAvailable(faculty, day, startSlot, duration = 1) {
  for (let d = 0; d < duration; d += 1) {
    if (!faculty.availability?.[day]?.has(startSlot + d)) return false;
  }
  return true;
}

function isFree(timetable, batch, facultyEmail, roomName, day, startSlot, duration = 1) {
  for (let d = 0; d < duration; d += 1) {
    const s = startSlot + d;
    if (timetable.slots.some((x) => x.day === day && x.slot === s && (x.batch === batch || x.facultyEmail === facultyEmail || x.roomName === roomName))) {
      return false;
    }
  }
  return true;
}

function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function shuffleArray(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randomPick(arr, rng) { return arr[Math.floor(rng() * arr.length)]; }



