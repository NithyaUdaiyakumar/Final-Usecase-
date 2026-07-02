/* =========================================================
   CURONEX â€” Medical Camp Management module
   common.js â€” shared data layer + UI wiring for every page
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
      { id: 'PT-501', campId: 'CMP-1042', name: 'Ramesh Kumar', age: 54, gender: 'Male', phone: '9876543210', tokenNo: 'A-01', regDate: '2026-07-01', status: 'Registered' },
      { id: 'PT-502', campId: 'CMP-1042', name: 'Lakshmi Devi', age: 61, gender: 'Female', phone: '9876543211', tokenNo: 'A-02', regDate: '2026-07-01', status: 'Registered' },
      { id: 'PT-503', campId: 'CMP-1042', name: 'Suresh Babu', age: 47, gender: 'Male', phone: '9876543212', tokenNo: 'A-03', regDate: '2026-07-02', status: 'Registered' },
      { id: 'PT-504', campId: 'CMP-1041', name: 'Priya Sharma', age: 33, gender: 'Female', phone: '9876543213', tokenNo: 'B-01', regDate: '2026-07-02', status: 'Registered' },
      { id: 'PT-505', campId: 'CMP-1041', name: 'Arjun Reddy', age: 29, gender: 'Male', phone: '9876543214', tokenNo: 'B-02', regDate: '2026-07-02', status: 'Registered' },
      { id: 'PT-506', campId: 'CMP-1043', name: 'Baby Anaya', age: 2, gender: 'Female', phone: '9876543215', tokenNo: 'C-01', regDate: '2026-06-18', status: 'Attended', diagnosis: 'MMR dose administered, no complications.' },
      { id: 'PT-507', campId: 'CMP-1043', name: 'Baby Vihaan', age: 3, gender: 'Male', phone: '9876543216', tokenNo: 'C-02', regDate: '2026-06-18', status: 'Attended', diagnosis: 'DPT booster administered.' },
      { id: 'PT-508', campId: 'CMP-1044', name: 'Venkat Rao', age: 68, gender: 'Male', phone: '9876543217', tokenNo: 'D-01', regDate: '2026-06-12', status: 'Attended', diagnosis: 'Early-stage cataract detected, referred for surgery.' },
      { id: 'PT-509', campId: 'CMP-1044', name: 'Padma Latha', age: 71, gender: 'Female', phone: '9876543218', tokenNo: 'D-02', regDate: '2026-06-12', status: 'Attended', diagnosis: 'Normal vision, prescribed reading glasses.' }
    ];
    localStorage.setItem(DB_PATIENTS_KEY, JSON.stringify(patients));
  }
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
