const ASSESSMENT_KEY = "skillbridgeAssessmentResult";
const PASSPORT_KEY = "skillbridgeTalentPassport";
const STUDENT_NOTIFICATIONS_KEY = "skillbridgeStudentNotifications";

document.addEventListener("DOMContentLoaded", () => {
  setupTopbar();
  setupDropdowns();
  setupReveal();
  hydrateDashboard();
  setupStudentNotifications();
  renderStudentAnalytics();
});

function setupTopbar() {
  const topbar = document.getElementById("studentTopbar");
  const toggle = document.querySelector("[data-menu-toggle]");

  if (toggle && topbar) {
    toggle.addEventListener("click", () => {
      topbar.classList.toggle("is-open");
    });
  }

  if (topbar) {
    window.addEventListener("scroll", () => {
      topbar.classList.toggle("is-scrolled", window.scrollY > 24);
    });
  }
}

function setupDropdowns() {
  const triggers = document.querySelectorAll("[data-dropdown-trigger]");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const targetId = trigger.getAttribute("data-dropdown-trigger");
      const target = document.getElementById(targetId);

      document.querySelectorAll(".dropdown-panel").forEach((panel) => {
        if (panel !== target) panel.classList.remove("is-open");
      });

      target?.classList.toggle("is-open");
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-dropdown-trigger]") || event.target.closest(".dropdown-panel")) return;
    document.querySelectorAll(".dropdown-panel").forEach((panel) => {
      panel.classList.remove("is-open");
    });
  });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (typeof IntersectionObserver === "undefined") {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  items.forEach((item) => observer.observe(item));
}

function hydrateDashboard() {
  const stored = getStoredJson(ASSESSMENT_KEY, null);
  const passport = getStoredJson(PASSPORT_KEY, {});

  if (!stored && !passport) return;

  const persona = stored?.persona || "analyst";
  const xp = Number(passport.xp || stored?.xp || 620);
  const xpTarget = 1500;
  const xpPercent = clamp(Math.round((xp / xpTarget) * 100), 18, 100);
  const learningProgress = Number(passport.learningProgress || 60);
  const trackMap = {
    analyst: "Data Analysis Track",
    builder: "Software Engineering Track",
    creator: "Product Design Track",
    communicator: "Business Track"
  };
  const badgeMap = {
    analyst: "Level 3 Analyzer",
    builder: "Level 3 Builder",
    creator: "Level 3 Creator",
    communicator: "Level 3 Connector"
  };

  replaceText(".xp-pill strong", "Level 3");
  replaceText(".xp-pill span", `${badgeMap[persona] || passport.levelLabel || "Explorer"} • ${xp} XP`);
  replaceText(".sidebar-user p", passport.track || trackMap[persona] || "Talent Track");
  replaceText(".level-badge", passport.levelLabel || badgeMap[persona] || "Level 3 Explorer");
  replaceText(".xp-head span", `${xp} / ${xpTarget}`);
  setSelectorWidth(".xp-progress .progress-track span", `${xpPercent}%`);

  if (stored?.title) replaceText(".hero-card h2", stored.title);
  if (stored?.copy) replaceText(".hero-card > p", stored.copy);

  replaceText(".hero-progress .progress-head span", `${learningProgress}%`);
  setSelectorWidth(".hero-progress .progress-track span", `${learningProgress}%`);

  if (Array.isArray(stored?.dna)) {
    replaceMetricRow(0, stored.dna[0]);
    replaceMetricRow(1, stored.dna[1]);
    replaceMetricRow(2, stored.dna[2]);
  }

  const nextStep = extractActionTitle(stored?.next || passport.nextGoal);
  if (nextStep) replaceText(".next-step-box strong", nextStep);
  if (stored?.next || passport.nextGoal) replaceText(".next-step-box p", stored?.next || passport.nextGoal);

  updateJourneyPills(learningProgress);
  updateAchievementState(passport);
}

function setupStudentNotifications() {
  const fab = document.getElementById("studentNotificationFab");
  const panel = document.getElementById("studentNotificationPanel");
  const markAll = document.getElementById("studentMarkAllRead");
  const notifications = ensureStudentNotifications();

  renderStudentNotifications(notifications);

  fab?.addEventListener("click", (event) => {
    event.stopPropagation();
    panel?.classList.toggle("hidden");
  });

  markAll?.addEventListener("click", () => {
    const updated = readStudentNotifications().map((item) => ({ ...item, read: true }));
    writeStudentNotifications(updated);
    renderStudentNotifications(updated);
    showToast("تم تعليم كل الإشعارات كمقروءة.");
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".notification-center")) return;
    panel?.classList.add("hidden");
  });
}

function ensureStudentNotifications() {
  const passport = getStoredJson(PASSPORT_KEY, {});
  const assessment = getStoredJson(ASSESSMENT_KEY, {});
  const existing = readStudentNotifications();
  const defaults = buildStudentNotificationDefaults(passport, assessment);
  const merged = mergeNotifications(existing, defaults);
  writeStudentNotifications(merged);
  return merged;
}

function buildStudentNotificationDefaults(passport, assessment) {
  const strengths = Array.isArray(assessment.strengths) && assessment.strengths.length
    ? assessment.strengths
    : ["Python", "Problem Solving"];
  const gaps = Array.isArray(assessment.weaknesses) && assessment.weaknesses.length
    ? assessment.weaknesses
    : ["React", "SQL Advanced"];
  const applications = Array.isArray(passport.applications) ? passport.applications : [];
  const savedJobs = Array.isArray(passport.savedJobs) ? passport.savedJobs : [];
  const completedSteps = Array.isArray(passport.completedSteps) ? passport.completedSteps : [];

  return [
    {
      id: "student-match-job",
      title: "New job matches your profile",
      message: `${guessTrackRole(passport, assessment)} – ${clamp(Number(passport.jobReadiness || 78) + 7, 72, 92)}% Match`,
      type: "success",
      time: "الآن",
      link: "smart-jobs.html",
      read: false
    },
    {
      id: "student-match-update",
      title: "Match % update",
      message: `إكمال ${completedSteps[completedSteps.length - 1] ? formatStepName(completedSteps[completedSteps.length - 1]) : strengths[0]} رفع جاهزيتك إلى ${clamp(Number(passport.jobReadiness || 68) + 6, 68, 95)}%`,
      type: "info",
      time: "منذ قليل",
      link: "learning-path.html",
      read: false
    },
    {
      id: "student-gap-reminder",
      title: "Smart reminder",
      message: `نوصي بتعلم ${gaps[0]} لأن ده سيرفع فرص قبولك في وظائف مشابهة.`,
      type: "reminder",
      time: "اليوم",
      link: "learning-path.html",
      read: applications.length > 0
    },
    {
      id: "student-saved-jobs",
      title: "Saved jobs ready",
      message: savedJobs.length ? `عندك ${savedJobs.length} وظيفة محفوظة جاهزة للمراجعة والتقديم.` : "ابدأ بحفظ أول وظيفة مناسبة حتى تبني Shortlist ذكية.",
      type: "info",
      time: "اليوم",
      link: "saved-jobs.html",
      read: savedJobs.length === 0
    }
  ];
}

function renderStudentNotifications(notifications) {
  const visibleNotifications = notifications.filter((item) => !item.dismissed);
  const unread = visibleNotifications.filter((item) => !item.read).length;
  const trigger = document.getElementById("studentNotificationsTrigger");
  const count = document.getElementById("studentNotificationCount");
  const topbarList = document.getElementById("studentNotificationsList");
  const feed = document.getElementById("studentNotificationFeed");
  const updatesList = document.getElementById("studentUpdatesList");

  if (trigger) trigger.setAttribute("data-badge", String(unread));
  if (count) count.textContent = String(unread);

  if (topbarList) {
    topbarList.innerHTML = visibleNotifications.slice(0, 3).map((item) => `
      <a class="dropdown-note" href="${item.link}">
        <strong>${item.title}</strong>
        <span>${item.message}</span>
      </a>
    `).join("");
  }

  if (feed) {
    feed.innerHTML = visibleNotifications.map((item) => `
      <article class="notification-item ${item.type} ${item.read ? "" : "unread"}" data-notification-id="${item.id}">
        <div class="notification-item-head">
          <strong>${item.title}</strong>
          <small>${item.time}</small>
        </div>
        <p>${item.message}</p>
        <div class="notification-actions">
          <a href="${item.link}">Open</a>
          <button class="notification-dismiss" type="button" data-action="dismiss">Dismiss</button>
          ${item.read ? "" : '<button class="notification-clear" type="button" data-action="read">Mark read</button>'}
        </div>
      </article>
    `).join("");

    bindNotificationActions(feed, renderStudentNotifications, writeStudentNotifications);
  }

  if (updatesList) {
    updatesList.innerHTML = visibleNotifications.slice(0, 3).map((item) => `
      <a class="update-item" href="${item.link}">
        <strong>${item.title}</strong>
        <span>${item.time}</span>
      </a>
    `).join("");
  }
}

function renderStudentAnalytics() {
  const passport = getStoredJson(PASSPORT_KEY, {});
  const assessment = getStoredJson(ASSESSMENT_KEY, {});
  const xp = Number(passport.xp || 620);
  const xpTarget = 1000;
  const xpPercent = clamp(Math.round((xp / xpTarget) * 100), 12, 100);
  const completedSteps = Array.isArray(passport.completedSteps) ? passport.completedSteps : [];
  const applications = Array.isArray(passport.applications) ? passport.applications : [];
  const badges = Array.isArray(passport.badges) ? passport.badges : ["Explorer", "Analyzer"];
  const weaknesses = Array.isArray(assessment.weaknesses) && assessment.weaknesses.length
    ? assessment.weaknesses
    : ["SQL Advanced", "Communication", "API Thinking"];

  const growthChart = document.getElementById("studentGrowthChart");
  if (growthChart) {
    const milestones = [
      { label: "Assessment", value: 35 },
      { label: "Learning", value: clamp(35 + completedSteps.length * 18, 35, 82) },
      { label: "Projects", value: clamp(48 + (passport.projects?.length || 2) * 8, 40, 88) },
      { label: "Apply", value: clamp(55 + applications.length * 10, 50, 96) }
    ];

    growthChart.innerHTML = milestones.map((item) => `
      <div class="timeline-bar">
        <div class="timeline-bar-head">
          <strong>${item.label}</strong>
          <span>${item.value}%</span>
        </div>
        <div class="mini-progress"><span style="width:${item.value}%"></span></div>
      </div>
    `).join("");
  }

  const gapChart = document.getElementById("studentGapChart");
  if (gapChart) {
    gapChart.innerHTML = weaknesses.slice(0, 3).map((item, index) => {
      const priority = index === 0 ? "high" : index === 1 ? "medium" : "low";
      const value = index === 0 ? 84 : index === 1 ? 66 : 48;
      return `
        <div class="gap-row ${priority}">
          <div class="gap-head">
            <strong>${item}</strong>
            <span>${priority === "high" ? "High Priority" : priority === "medium" ? "Medium" : "Low"}</span>
          </div>
          <div class="mini-progress"><span style="width:${value}%"></span></div>
        </div>
      `;
    }).join("");
  }

  const ring = document.getElementById("studentXpRing");
  if (ring) {
    const circumference = 289.03;
    ring.style.strokeDashoffset = `${circumference - (circumference * xpPercent) / 100}`;
  }
  replaceTextById("studentXpPercent", `${xpPercent}%`);

  const badgeSummary = document.getElementById("studentBadgeSummary");
  if (badgeSummary) {
    badgeSummary.innerHTML = `
      <div class="badge-stat"><strong>${badges.length}</strong><span>Unlocked Badges</span></div>
      <div class="badge-stat"><strong>${completedSteps.length}</strong><span>Completed Steps</span></div>
      <div class="badge-stat"><strong>${applications.length}</strong><span>Applied Jobs</span></div>
      <div class="badge-stat"><strong>${xp}</strong><span>Total XP</span></div>
    `;
  }
}

function bindNotificationActions(container, renderFn, writeFn) {
  container.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const action = button.getAttribute("data-action");
      const item = button.closest("[data-notification-id]");
      const id = item?.getAttribute("data-notification-id");
      if (!id) return;

      let notifications = readStudentNotifications();
      if (action === "read") {
        notifications = notifications.map((note) => note.id === id ? { ...note, read: true } : note);
      }
      if (action === "dismiss") {
        notifications = notifications.map((note) => note.id === id ? { ...note, dismissed: true } : note);
      }

      writeFn(notifications);
      renderFn(notifications);
    });
  });
}

function readStudentNotifications() {
  return getStoredJson(STUDENT_NOTIFICATIONS_KEY, []);
}

function writeStudentNotifications(items) {
  window.localStorage.setItem(STUDENT_NOTIFICATIONS_KEY, JSON.stringify(items));
}

function mergeNotifications(existing, defaults) {
  const map = new Map();
  defaults.forEach((item) => map.set(item.id, item));
  existing.forEach((item) => {
    map.set(item.id, { ...map.get(item.id), ...item });
  });
  return Array.from(map.values());
}

function replaceMetricRow(index, item) {
  if (!item) return;
  const rows = document.querySelectorAll(".metric-row");
  const row = rows[index];
  if (!row) return;
  const label = row.querySelector(".metric-head strong");
  const value = row.querySelector(".metric-head span");
  const bar = row.querySelector(".progress-track span");
  if (label) label.textContent = item.label;
  if (value) value.textContent = `${item.value}%`;
  if (bar) bar.style.width = `${item.value}%`;
}

function updateJourneyPills(progress) {
  const pills = document.querySelectorAll(".journey-pill");
  pills.forEach((pill) => pill.classList.remove("done", "active"));
  if (pills[0]) pills[0].classList.add("done");
  if (pills[1] && progress >= 50) pills[1].classList.add("active");
  if (pills[2] && progress >= 80) pills[2].classList.add("active");
  if (pills[3] && progress >= 100) pills[3].classList.add("done");
}

function updateAchievementState(passport) {
  const items = document.querySelectorAll(".achievement-item");
  const hasProject = (passport.projects?.length || 0) > 0;
  const hasApplication = (passport.applications?.length || 0) > 0;

  if (items[2] && hasProject) items[2].classList.add("unlocked");
  if (items[3] && hasApplication) items[3].classList.add("unlocked");
}

function guessTrackRole(passport, assessment) {
  return passport.track || assessment.fullTitle || assessment.careerPath || "Frontend Developer";
}

function formatStepName(stepId) {
  if (stepId === "foundations") return "Step 1";
  if (stepId === "practice") return "Step 2";
  if (stepId === "advanced") return "Step 3";
  return stepId;
}

function extractActionTitle(text) {
  if (!text) return "ابدأ خطوتك التالية";
  const match = text.match(/ابدأ[^،.]+/);
  return match ? match[0] : text;
}

function getStoredJson(key, fallback) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function replaceText(selector, value) {
  const el = document.querySelector(selector);
  if (el && value !== undefined && value !== null && value !== "") {
    el.textContent = value;
  }
}

function replaceTextById(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) {
    el.textContent = value;
  }
}

function setSelectorWidth(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.style.width = value;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function showToast(message) {
  const toast = document.getElementById("studentDashboardToast");
  if (!toast || !message) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}
