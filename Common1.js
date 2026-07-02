/* =========================================================
   CURONEX — Medical Camp Management module
   common.js — shared data layer + UI wiring for every page
   ========================================================= */

/* ---------- Data layer (localStorage acting as mock DB) ---------- */

const DB_CAMPS_KEY = 'curonex_camps';
const DB_PATIENTS_KEY = 'curonex_patients';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function seedDatabase() {
  if (!localStorage.getItem(DB_CAMPS_KEY)) {
    const camps = [
      {
        id: 'CMP-1041',
        name: 'General Health Checkup Camp',
        specialization: 'General Medicine',
        doctor: 'Dr. Ananya Rao',
        location: 'Banjara Hills Community Hall, Hyderabad',
        date: '2026-07-12',
        startTime: '09:00',
        endTime: '14:00',
        capacity: 120,
        status: 'upcoming',
        organizer: 'City Care Hospital',
        description: 'Free general health checkup including BP, sugar and BMI screening for all age groups.'
      },
      {
        id: 'CMP-1042',
        name: 'Diabetes Screening Camp',
        specialization: 'Endocrinology',
        doctor: 'Dr. Karthik Iyer',
        location: 'Gachibowli Community Center, Hyderabad',
        date: '2026-07-05',
        startTime: '10:00',
        endTime: '13:00',
        capacity: 80,
        status: 'ongoing',
        organizer: 'Sunrise Medical Center',
        description: 'Free blood sugar screening and diet counselling for diabetes risk assessment.'
      },
      {
        id: 'CMP-1043',
        name: 'Pediatric Vaccination Drive',
        specialization: 'Pediatrics',
        doctor: 'Dr. Meera Nair',
        location: 'Ameerpet Municipal School, Hyderabad',
        date: '2026-06-20',
        startTime: '09:30',
        endTime: '15:00',
        capacity: 150,
        status: 'completed',
        organizer: 'HealthPlus Hospital',
        description: 'Routine childhood vaccination drive for children aged 0-12 years.'
      },
      {
        id: 'CMP-1044',
        name: 'Eye Care & Cataract Screening',
        specialization: 'Ophthalmology',
        doctor: 'Dr. Rohit Sharma',
        location: 'Kukatpally Community Hall, Hyderabad',
        date: '2026-06-15',
        startTime: '09:00',
        endTime: '13:00',
        capacity: 100,
        status: 'completed',
        organizer: 'Wellness Hospital',
        description: 'Free vision testing and cataract screening for senior citizens.'
      },
      {
        id: 'CMP-1045',
        name: 'Women\u2019s Wellness Camp',
        specialization: 'Gynecology',
        doctor: 'Dr. Sneha Reddy',
        location: 'Madhapur Community Center, Hyderabad',
        date: '2026-07-25',
        startTime: '10:00',
        endTime: '16:00',
        capacity: 90,
        status: 'upcoming',
        organizer: 'City Care Hospital',
        description: 'Comprehensive women\u2019s health screening including anemia and nutrition counselling.'
      }
    ];
    localStorage.setItem(DB_CAMPS_KEY, JSON.stringify(camps));
  }

  if (!localStorage.getItem(DB_PATIENTS_KEY)) {
    const patients = [
      ...generatePatients('CMP-1041', 24, 501, '2026-06-29T09:15:00'),
      ...generatePatients('CMP-1042', 16, 601, '2026-07-02T11:40:00'),
      ...generatePatients('CMP-1045', 9,  701, '2026-06-30T10:05:00'),
      ...generateAttendedPatients('CMP-1043', [
        { name: 'Baby Anaya', age: 2, gender: 'Female', diagnosis: 'MMR dose administered, no complications.' },
        { name: 'Baby Vihaan', age: 3, gender: 'Male', diagnosis: 'DPT booster administered.' },
        { name: 'Baby Ishita', age: 1, gender: 'Female', diagnosis: 'OPV dose administered, mild fever advised to monitor.' },
        { name: 'Baby Aarav', age: 4, gender: 'Male', diagnosis: 'MMR booster administered, no complications.' }
      ], 801),
      ...generateAttendedPatients('CMP-1044', [
        { name: 'Venkat Rao', age: 68, gender: 'Male', diagnosis: 'Early-stage cataract detected, referred for surgery.' },
        { name: 'Padma Latha', age: 71, gender: 'Female', diagnosis: 'Normal vision, prescribed reading glasses.' },
        { name: 'Narsimha Reddy', age: 64, gender: 'Male', diagnosis: 'Mild glaucoma detected, follow-up recommended.' },
        { name: 'Saroja Devi', age: 69, gender: 'Female', diagnosis: 'Normal vision, no intervention needed.' },
        { name: 'Balaraju Naik', age: 75, gender: 'Male', diagnosis: 'Advanced cataract, surgery scheduled.' }
      ], 901)
    ];
    localStorage.setItem(DB_PATIENTS_KEY, JSON.stringify(patients));
  }
}

const FIRST_NAMES = ['Rahul','Anita','Suresh','Priya','Vijay','Meena','Arun','Neha','Ramesh','Pooja','Karan','Divya','Manoj','Swati','Ajay','Kavita','Deepak','Sunita','Rakesh','Anjali','Vikram','Pallavi','Sanjay','Nisha','Ravi','Shalini','Harish','Geeta'];
const LAST_NAMES = ['Sharma','Deshmukh','Patil','Kulkarni','More','Joshi','Khot','Gaikwad','Jadhav','Shetty','Verma','Reddy','Nair','Iyer','Menon','Rao','Singh','Gupta','Kumar','Chauhan'];

function generatePatients(campId, count, startRegNo, latestISO) {
  const patients = [];
  const latest = new Date(latestISO).getTime();
  for (let i = 0; i < count; i++) {
    const fn = FIRST_NAMES[i % FIRST_NAMES.length];
    const ln = LAST_NAMES[(i * 3 + 1) % LAST_NAMES.length];
    const gender = i % 2 === 0 ? 'Male' : 'Female';
    const age = 18 + ((i * 7 + 5) % 60);
    const phoneSeed = 9000000000 + (startRegNo * 137 + i * 91) % 999999999;
    const phone = String(phoneSeed).slice(0, 10);
    const status = (i % 5 === 4) ? 'Pending' : 'Registered';
    const regNo = startRegNo + count - 1 - i; // higher number = most recent
    const id = 'REG-2026-' + String(regNo).padStart(5, '0');
    const regAt = new Date(latest - i * 24 * 60000).toISOString();
    patients.push({ id, campId, name: `${fn} ${ln}`, age, gender, phone, regAt, status });
  }
  return patients;
}

function generateAttendedPatients(campId, list, startRegNo) {
  return list.map((p, i) => ({
    id: 'REG-2026-' + String(startRegNo + i).padStart(5, '0'),
    campId,
    name: p.name,
    age: p.age,
    gender: p.gender,
    phone: String(9100000000 + startRegNo * 113 + i * 77).slice(0, 10),
    regAt: new Date(new Date(getCampByIdRaw(campId)?.date || '2026-06-15').getTime() - (list.length - i) * 3600000).toISOString(),
    status: 'Attended',
    diagnosis: p.diagnosis
  }));
}

/* Used only during seeding, before the camps array is guaranteed queryable via getCamps() */
function getCampByIdRaw(id) {
  const raw = localStorage.getItem(DB_CAMPS_KEY);
  if (!raw) return null;
  return JSON.parse(raw).find(c => c.id === id);
}

function getCamps() {
  return JSON.parse(localStorage.getItem(DB_CAMPS_KEY) || '[]');
}

function saveCamps(camps) {
  localStorage.setItem(DB_CAMPS_KEY, JSON.stringify(camps));
}

function getCampById(id) {
  return getCamps().find(c => c.id === id);
}

function addCamp(camp) {
  const camps = getCamps();
  camps.unshift(camp);
  saveCamps(camps);
}

function updateCamp(id, updates) {
  const camps = getCamps();
  const idx = camps.findIndex(c => c.id === id);
  if (idx > -1) {
    camps[idx] = { ...camps[idx], ...updates };
    saveCamps(camps);
  }
}

function getPatients() {
  return JSON.parse(localStorage.getItem(DB_PATIENTS_KEY) || '[]');
}

function savePatients(patients) {
  localStorage.setItem(DB_PATIENTS_KEY, JSON.stringify(patients));
}

function getPatientsByCamp(campId) {
  return getPatients().filter(p => p.campId === campId);
}

function nextCampId() {
  const camps = getCamps();
  const nums = camps.map(c => parseInt(c.id.replace('CMP-', ''), 10)).filter(n => !isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 1040) + 1;
  return 'CMP-' + next;
}

function deriveStatus(dateStr) {
  const today = todayISO();
  if (dateStr > today) return 'upcoming';
  if (dateStr === today) return 'ongoing';
  return 'completed';
}

function fmtDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function fmtTime(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

function fmtDateTime(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  const datePart = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const timePart = d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
  return `${datePart}, ${timePart}`;
}

/* ---------- Shared UI wiring ---------- */

function initCommonUI() {
  // Mobile sidebar toggle
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');

  if (menuBtn && sidebar && overlay) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // Generic dropdown toggles
  document.querySelectorAll('[data-dropdown-toggle]').forEach(btn => {
    const targetId = btn.getAttribute('data-dropdown-toggle');
    const panel = document.getElementById(targetId);
    if (!panel) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.dropdown-panel.open').forEach(p => {
        if (p !== panel) p.classList.remove('open');
      });
      panel.classList.toggle('open');
    });
  });

  document.addEventListener('click', (e) => {
    document.querySelectorAll('.dropdown-panel.open').forEach(panel => {
      if (!panel.contains(e.target)) panel.classList.remove('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  seedDatabase();
  initCommonUI();
});
