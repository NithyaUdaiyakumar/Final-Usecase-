// ===== Sample Camp Data =====
// In a real app this would come from an API. Kept here as a mock dataset.
const CAMP_DATA = [
  { id: "CMP-2025-00045", name: "Healthy Hearts Camp",   type: "Cardiology",    date: "2025-05-28", city: "Pune",       status: "Upcoming",  registrations: 125 },
  { id: "CMP-2025-00044", name: "Diabetes Awareness Camp", type: "General",     date: "2025-05-20", city: "Nagpur",     status: "Completed", registrations: 210 },
  { id: "CMP-2025-00043", name: "Women's Health Camp",   type: "Gynecology",    date: "2025-05-18", city: "Mumbai",     status: "Completed", registrations: 178 },
  { id: "CMP-2025-00042", name: "Eye Check-up Camp",     type: "Ophthalmology", date: "2025-05-25", city: "Nashik",     status: "Ongoing",   registrations: 96  },
  { id: "CMP-2025-00041", name: "Child Health Camp",     type: "Pediatrics",    date: "2025-06-02", city: "Aurangabad", status: "Upcoming",  registrations: 142 },
  { id: "CMP-2025-00040", name: "Dental Care Camp",      type: "Dentistry",     date: "2025-05-15", city: "Thane",      status: "Completed", registrations: 160 },
  { id: "CMP-2025-00039", name: "Orthopedic Camp",       type: "Orthopedics",   date: "2025-05-30", city: "Kolhapur",   status: "Upcoming",  registrations: 110 },
  { id: "CMP-2025-00038", name: "General Health Camp",   type: "General",       date: "2025-05-12", city: "Solapur",    status: "Completed", registrations: 234 },
  { id: "CMP-2025-00037", name: "Skin Care Camp",        type: "Dermatology",   date: "2025-05-22", city: "Pune",       status: "Ongoing",   registrations: 88  },
  { id: "CMP-2025-00036", name: "Blood Donation Camp",   type: "General",       date: "2025-06-05", city: "Mumbai",     status: "Upcoming",  registrations: 75  },
  { id: "CMP-2025-00035", name: "Cancer Screening Camp", type: "Oncology",      date: "2025-05-10", city: "Nagpur",     status: "Completed", registrations: 145 },
  { id: "CMP-2025-00034", name: "Mental Wellness Camp",  type: "Psychiatry",    date: "2025-06-08", city: "Mumbai",     status: "Upcoming",  registrations: 60  },
  { id: "CMP-2025-00033", name: "Maternity Care Camp",   type: "Gynecology",    date: "2025-05-08", city: "Nashik",     status: "Completed", registrations: 132 },
  { id: "CMP-2025-00032", name: "Vaccination Drive",     type: "General",       date: "2025-05-26", city: "Pune",       status: "Ongoing",   registrations: 300 },
  { id: "CMP-2025-00031", name: "Bone Density Camp",     type: "Orthopedics",   date: "2025-06-10", city: "Thane",      status: "Upcoming",  registrations: 54  },
  { id: "CMP-2025-00030", name: "ENT Check-up Camp",     type: "ENT",           date: "2025-05-05", city: "Solapur",    status: "Completed", registrations: 98  },
  { id: "CMP-2025-00029", name: "Diabetic Foot Camp",    type: "Endocrinology", date: "2025-05-14", city: "Kolhapur",   status: "Completed", registrations: 87  },
  { id: "CMP-2025-00028", name: "Kidney Health Camp",    type: "Nephrology",    date: "2025-06-12", city: "Nagpur",     status: "Upcoming",  registrations: 70  },
  { id: "CMP-2025-00027", name: "Heart Screening Camp",  type: "Cardiology",    date: "2025-05-24", city: "Mumbai",     status: "Ongoing",   registrations: 115 },
  { id: "CMP-2025-00026", name: "Physiotherapy Camp",    type: "Physiotherapy", date: "2025-05-06", city: "Aurangabad", status: "Completed", registrations: 66  },
  { id: "CMP-2025-00025", name: "Nutrition Awareness Camp", type: "General",    date: "2025-06-14", city: "Pune",       status: "Upcoming",  registrations: 90  },
  { id: "CMP-2025-00024", name: "Immunization Camp",     type: "Pediatrics",    date: "2025-05-16", city: "Thane",      status: "Completed", registrations: 180 },
  { id: "CMP-2025-00023", name: "Allergy Testing Camp",  type: "General",       date: "2025-05-29", city: "Nashik",     status: "Ongoing",   registrations: 45  },
  { id: "CMP-2025-00022", name: "Thyroid Screening Camp", type: "Endocrinology", date: "2025-06-01", city: "Solapur",   status: "Upcoming",  registrations: 58  },
  { id: "CMP-2025-00021", name: "Senior Citizen Health Camp", type: "Geriatrics", date: "2025-05-09", city: "Kolhapur", status: "Completed", registrations: 122 }
];

// ===== State =====
let state = {
  search: "",
  status: "all",
  page: 1,
  pageSize: 10
};

// ===== DOM references =====
const searchInput   = document.getElementById("searchInput");
const statusFilter  = document.getElementById("statusFilter");
const pageSizeSelect = document.getElementById("pageSizeSelect");
const tableBody      = document.getElementById("campTableBody");
const emptyState     = document.getElementById("emptyState");
const resultsText    = document.getElementById("resultsText");
const paginationEl   = document.getElementById("pagination");
const sidebar        = document.getElementById("sidebar");
const sidebarToggle  = document.getElementById("sidebarToggle");
const modalOverlay   = document.getElementById("modalOverlay");
const modalBody      = document.getElementById("modalBody");
const modalClose     = document.getElementById("modalClose");

// ===== Helpers =====

/** Escape any HTML-significant characters to prevent injection when rendering user-derived text. */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(isoDate) {
  const d = new Date(isoDate + "T00:00:00");
  if (isNaN(d.getTime())) return isoDate; // fallback if parsing ever fails
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function badgeClass(status) {
  switch (status) {
    case "Upcoming":  return "badge badge-upcoming";
    case "Completed": return "badge badge-completed";
    case "Ongoing":   return "badge badge-ongoing";
    default:          return "badge";
  }
}

/** Basic input validation/sanitization for the search field. */
function sanitizeSearchTerm(raw) {
  if (typeof raw !== "string") return "";
  // Trim whitespace and cap length to guard against pathological input.
  return raw.trim().slice(0, 100).toLowerCase();
}

/** Validate that the page size chosen is one of the allowed, numeric options. */
function sanitizePageSize(raw) {
  const allowed = [10, 25, 50];
  const num = parseInt(raw, 10);
  return allowed.includes(num) ? num : 10;
}

/** Validate the status filter against the known set of statuses. */
function sanitizeStatus(raw) {
  const allowed = ["all", "Upcoming", "Ongoing", "Completed"];
  return allowed.includes(raw) ? raw : "all";
}

// ===== Core filtering =====
function getFilteredData() {
  const term = state.search;
  return CAMP_DATA.filter(camp => {
    const matchesSearch =
      term === "" ||
      camp.id.toLowerCase().includes(term) ||
      camp.name.toLowerCase().includes(term);
    const matchesStatus = state.status === "all" || camp.status === state.status;
    return matchesSearch && matchesStatus;
  });
}

// ===== Render =====
function render() {
  const filtered = getFilteredData();
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / state.pageSize));

  // Clamp page in case filters shrank the result set below current page.
  if (state.page > totalPages) state.page = totalPages;
  if (state.page < 1) state.page = 1;

  const startIdx = (state.page - 1) * state.pageSize;
  const pageItems = filtered.slice(startIdx, startIdx + state.pageSize);

  // Table rows
  if (pageItems.length === 0) {
    tableBody.innerHTML = "";
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
    tableBody.innerHTML = pageItems.map(camp => `
      <tr>
        <td class="camp-id">${escapeHTML(camp.id)}</td>
        <td class="camp-name">${escapeHTML(camp.name)}</td>
        <td>${escapeHTML(camp.type)}</td>
        <td>${formatDate(camp.date)}</td>
        <td>${escapeHTML(camp.city)}</td>
        <td><span class="${badgeClass(camp.status)}">${escapeHTML(camp.status)}</span></td>
        <td>${camp.registrations}</td>
        <td>
          <button class="view-btn" data-id="${escapeHTML(camp.id)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/></svg>
            View
          </button>
        </td>
      </tr>
    `).join("");
  }

  // Results text
  const from = totalItems === 0 ? 0 : startIdx + 1;
  const to = Math.min(startIdx + state.pageSize, totalItems);
  resultsText.textContent = `Showing ${from} to ${to} of ${totalItems} camp${totalItems === 1 ? "" : "s"}`;

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  paginationEl.innerHTML = "";

  const prevBtn = document.createElement("button");
  prevBtn.className = "page-btn";
  prevBtn.innerHTML = "&lsaquo;";
  prevBtn.disabled = state.page === 1;
  prevBtn.setAttribute("aria-label", "Previous page");
  prevBtn.addEventListener("click", () => goToPage(state.page - 1));
  paginationEl.appendChild(prevBtn);

  // Show up to 5 page numbers with basic windowing so pagination doesn't
  // overflow for large result sets.
  const maxButtons = 5;
  let startPage = Math.max(1, state.page - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  startPage = Math.max(1, endPage - maxButtons + 1);

  for (let p = startPage; p <= endPage; p++) {
    const btn = document.createElement("button");
    btn.className = "page-btn" + (p === state.page ? " active" : "");
    btn.textContent = p;
    btn.setAttribute("aria-current", p === state.page ? "page" : "false");
    btn.addEventListener("click", () => goToPage(p));
    paginationEl.appendChild(btn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.className = "page-btn";
  nextBtn.innerHTML = "&rsaquo;";
  nextBtn.disabled = state.page === totalPages;
  nextBtn.setAttribute("aria-label", "Next page");
  nextBtn.addEventListener("click", () => goToPage(state.page + 1));
  paginationEl.appendChild(nextBtn);
}

function goToPage(page) {
  const filtered = getFilteredData();
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
  // Validate requested page is within bounds before applying it.
  if (page < 1 || page > totalPages) return;
  state.page = page;
  render();
}

// ===== Event listeners =====

let searchDebounce;
searchInput.addEventListener("input", (e) => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    state.search = sanitizeSearchTerm(e.target.value);
    state.page = 1; // reset to first page on new search
    render();
  }, 200);
});

statusFilter.addEventListener("change", (e) => {
  state.status = sanitizeStatus(e.target.value);
  state.page = 1;
  render();
});

pageSizeSelect.addEventListener("change", (e) => {
  state.pageSize = sanitizePageSize(e.target.value);
  state.page = 1;
  render();
});

tableBody.addEventListener("click", (e) => {
  const btn = e.target.closest(".view-btn");
  if (!btn) return;
  const campId = btn.dataset.id;
  const camp = CAMP_DATA.find(c => c.id === campId);
  if (camp) openModal(camp);
});

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// ===== Modal =====
function openModal(camp) {
  modalBody.innerHTML = `
    <div class="detail-row"><span>Camp ID</span><span>${escapeHTML(camp.id)}</span></div>
    <div class="detail-row"><span>Camp Name</span><span>${escapeHTML(camp.name)}</span></div>
    <div class="detail-row"><span>Camp Type</span><span>${escapeHTML(camp.type)}</span></div>
    <div class="detail-row"><span>Date</span><span>${formatDate(camp.date)}</span></div>
    <div class="detail-row"><span>City</span><span>${escapeHTML(camp.city)}</span></div>
    <div class="detail-row"><span>Status</span><span><span class="${badgeClass(camp.status)}">${escapeHTML(camp.status)}</span></span></div>
    <div class="detail-row"><span>Total Registrations</span><span>${camp.registrations}</span></div>
  `;
  modalOverlay.hidden = false;
}

function closeModal() {
  modalOverlay.hidden = true;
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalOverlay.hidden) closeModal();
});

// ===== Init =====
render();
