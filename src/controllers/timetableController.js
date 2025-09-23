import { db } from '../models/db.js';
import pool from '../models/mysql.js';
import { generateTimetable, detectConflicts, suggestRearrangements } from '../services/scheduler.js';

const slotTimes = {
  1: "08:30–09:30",
  2: "09:30–10:30",
  3: "10:30–11:30",
  4: "11:30–12:30",
  5: "12:30–01:30",
  6: "01:30–02:30",
  7: "02:30–03:30"
};

export const generate = (req, res) => {
  const { choices = 3 } = req.body || {};
  const result = generateTimetable({ choices });
  db.timetables = result;
  res.json({ choices: result });
};

export const conflicts = (req, res) => {
  const timetable = req.body?.timetable || db.timetables?.[0];
  if (!timetable) return res.status(400).json({ error: 'No timetable provided or generated' });
  const details = suggestRearrangements(timetable);
  res.json(details);
};

export const choices = (req, res) => {
  const formattedChoices = (db.timetables || []).map((timetable) => {
    const updatedSlots = timetable.slots.map((slot) => ({
      ...slot,
      time: slotTimes[slot.slot] || "Unknown"
    }));

    return {
      ...timetable,
      slots: updatedSlots
    };
  });

  res.json({ choices: formattedChoices });
};

export const review = (req, res) => {
  const { approvedId } = req.body;
  const tt = (db.timetables || []).find((t) => t.id === approvedId);
  if (!tt) return res.status(404).json({ error: 'Timetable not found' });
  db.timetables = [tt];
  res.json({ approved: tt });
};

// export const saveTimetable = async (req, res) => {
//   const timetable = req.body;

//   if (!timetable || !timetable.id) {
//     return res.status(400).json({ error: 'Invalid timetable data' });
//   }

//   try {
//     await pool.query(
//       'INSERT INTO approved_timetables (id, name, data, created_at) VALUES (?, ?, ?, NOW())',
//       [timetable.id, timetable.name, JSON.stringify(timetable)]
//     );
//     db.timetables = [timetable];
//     res.json({ success: true, saved: timetable });
//   } catch (err) {
//     console.error('Error saving timetable:', err.message);
//     res.status(500).json({ error: 'Database error' });
//   }
// };
export const saveTimetable = async (req, res) => {
  const choice = req.body;

  // ✅ Validation
  if (!choice || !choice.name || !choice.slots || choice.slots.length === 0) {
    return res.status(400).json({ error: 'Invalid timetable data' });
  }

  try {
    // 1️⃣ Insert into timetable_choices
    const [result] = await pool.query(
      'INSERT INTO timetable_choices (choice_id, name) VALUES (?, ?)',
      [choice.choice_id || null, choice.name]
    );

    const choiceId = result.insertId; // Get AUTO_INCREMENT ID

    // 2️⃣ Insert all slots into timetable_slots
    const slotPromises = choice.slots.map((slot) =>
      pool.query(
        `INSERT INTO timetable_slots 
        (choice_id, day, slot, batch, course_code, faculty_email, room_name, duration_slots, time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          choiceId,
          slot.day,
          slot.slot,
          slot.batch,
          slot.courseCode,
          slot.facultyEmail,
          slot.roomName,
          slot.durationSlots,
          slot.time,
        ]
      )
    );

    await Promise.all(slotPromises);

    res.json({ success: true, message: 'Timetable saved successfully!', choiceId });
  } catch (err) {
    console.error('Error saving timetable:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
};


export const getApprovedTimetable = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM timetable_slots ORDER BY created_at DESC LIMIT 1'
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No approved timetable found' });
    }
    const timetable = JSON.parse(rows[0].data);
    res.json({ approved: timetable });
  } catch (err) {
    console.error('Error fetching approved timetable:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
};
export const getAllApprovedChoices = async (req, res) => {
  try {
    const [choices] = await pool.query(
      'SELECT * FROM timetable_choices ORDER BY created_at DESC'
    );

    const detailedChoices = await Promise.all(
      choices.map(async (choice) => {
        const [slots] = await pool.query(
          'SELECT * FROM timetable_slots WHERE choice_id = ? ORDER BY day, slot',
          [choice.id]
        );
        return { ...choice, slots };
      })
    );

    res.json({ choices: detailedChoices });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};


export const getTimetableByTimestamp = async (req, res) => {
  const { timestamp } = req.query;

  if (!timestamp) {
    return res.status(400).json({ error: 'Timestamp is required' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM timetable_slots WHERE created_at = ?',
      [timestamp]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No timetable found for that timestamp' });
    }

    const timetable = JSON.parse(rows[0].data);
    res.json({ approved: timetable });
  } catch (err) {
    console.error('Error fetching timetable by timestamp:', err.message);
    res.status(500).json({ error: err.message });
  }
};