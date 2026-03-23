const PASSPORT_KEY = "skillbridgeTalentPassport";
const ROLE_KEY = "skillbridgeUserRole";
const DEFAULT_JOB_READINESS = 22;

document.addEventListener("DOMContentLoaded", () => {
  setupMenu("studentAuthTopbar");
  setupReveal();
  setupViewSwitch("[data-student-auth]");
  setupPasswordToggles();
  setupStudentLogin();
  setupStudentWizard();
  setupToasts();
});

function setupMenu(id) {
  const topbar = document.getElementById(id);
  const toggle = document.querySelector("[data-menu-toggle]");
  if (!topbar || !toggle) return;
  toggle.addEventListener("click", () => topbar.classList.toggle("is-open"));
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (typeof IntersectionObserver === "undefined") {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  items.forEach((item) => observer.observe(item));
}

function setupViewSwitch(rootSelector) {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const buttons = root.querySelectorAll("[data-auth-view]");
  const panels = root.querySelectorAll("[data-auth-panel]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-auth-view");
      buttons.forEach((item) => item.classList.toggle("active", item === button));
      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.getAttribute("data-auth-panel") === target);
      });
    });
  });
}

function setupPasswordToggles() {
  document.querySelectorAll("[data-toggle-password]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.querySelector(button.getAttribute("data-toggle-password"));
      if (!input) return;

      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      button.textContent = isPassword ? "إخفاء" : "إظهار";
    });
  });
}

function setupStudentLogin() {
  const submit = document.querySelector('.auth-view[data-auth-panel="login"] .submit-btn');
  const name = document.getElementById("studentLoginName");
  const email = document.getElementById("studentLoginEmail");
  const password = document.getElementById("studentLoginPassword");

  if (!submit || !name || !email || !password) return;

  submit.addEventListener("click", () => {
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (!nameValue || !emailValue || !passwordValue) {
      showToast("أكمل الاسم والإيميل وكلمة المرور أولًا.");
      return;
    }

    if (!isValidEmail(emailValue)) {
      showToast("الإيميل غير صحيح.");
      email.focus();
      return;
    }

    if (passwordValue.length < 6) {
      showToast("كلمة المرور قصيرة جدًا.");
      password.focus();
      return;
    }

    window.localStorage.setItem(ROLE_KEY, "student");

    const passport = mergePassport({
      name: nameValue,
      email: emailValue,
      status: "Available",
      track: "Talent in Progress",
      avatar: getInitials(nameValue),
      jobReadiness: getCurrentPassport().jobReadiness || DEFAULT_JOB_READINESS,
      welcomeState: "login"
    });

    runSmartWelcome(passport.name, "login");
  });
}

function setupStudentWizard() {
  const steps = Array.from(document.querySelectorAll(".signup-step"));
  const next = document.querySelector("[data-next-step]");
  const prev = document.querySelector("[data-prev-step]");
  const finish = document.querySelector("[data-finish-step]");
  const label = document.querySelector("[data-progress-label]");
  const bar = document.querySelector("[data-progress-bar]");
  const copy = document.querySelector("[data-progress-copy]");

  if (!steps.length || !next || !prev || !finish || !label || !bar || !copy) return;

  const stepMessages = [
    "خطوة واحدة أقرب لرحلتك المهنية.",
    "ممتاز، الآن نعرف مسارك ومهاراتك.",
    "جميل، بقي أن نبني حضورك المهني.",
    "آخر خطوة قبل بدء التحليل الذكي."
  ];

  let current = 0;

  const validateStep = () => {
    const activeStep = steps[current];
    const fields = activeStep.querySelectorAll("input, select, textarea");

    for (const field of fields) {
      const value = field.value.trim();
      const id = field.id || "";

      if (!value) {
        showToast("من فضلك أكمل الحقول المطلوبة قبل الانتقال.");
        field.focus();
        return false;
      }

      if (id === "studentEmail" && !isValidEmail(value)) {
        showToast("البريد الإلكتروني غير صحيح.");
        field.focus();
        return false;
      }

      if (id === "studentPassword" && value.length < 8) {
        showToast("كلمة المرور يجب أن تكون 8 أحرف على الأقل.");
        field.focus();
        return false;
      }

      if (id === "studentConfirmPassword") {
        const password = document.getElementById("studentPassword");
        if (password && value !== password.value.trim()) {
          showToast("تأكيد كلمة المرور غير مطابق.");
          field.focus();
          return false;
        }
      }

      if (id === "studentCaptcha" && value.toUpperCase() !== "SKILLBRIDGE") {
        showToast("تأكيد الأمان غير صحيح.");
        field.focus();
        return false;
      }
    }

    return true;
  };

  const render = () => {
    steps.forEach((step, index) => step.classList.toggle("active", index === current));
    label.textContent = `Step ${current + 1} / ${steps.length}`;
    bar.style.width = `${((current + 1) / steps.length) * 100}%`;
    copy.textContent = stepMessages[current];
    prev.classList.toggle("hidden", current === 0);
    next.classList.toggle("hidden", current === steps.length - 1);
    finish.classList.toggle("hidden", current !== steps.length - 1);
  };

  next.addEventListener("click", () => {
    if (!validateStep()) return;
    if (current < steps.length - 1) {
      current += 1;
      render();
    }
  });

  prev.addEventListener("click", () => {
    if (current > 0) {
      current -= 1;
      render();
    }
  });

  finish.addEventListener("click", (event) => {
    event.preventDefault();

    if (!validateStep()) return;

    const name = document.getElementById("studentName")?.value.trim() || "Student";
    const email = document.getElementById("studentEmail")?.value.trim() || "";
    const track = document.getElementById("studentTrack")?.value.trim() || "Talent in Progress";
    const level = document.getElementById("studentLevel")?.value.trim() || "Bachelor";
    const skills = splitTags(document.getElementById("studentSkills")?.value);
    const experience = document.getElementById("studentExperience")?.value.trim() || "";
    const avatarInput = document.getElementById("studentAvatar")?.value.trim() || "";
    const status = document.getElementById("studentStatus")?.value.trim() || "Available";
    const about = document.getElementById("studentAbout")?.value.trim() || "";
    const opportunity = document.getElementById("studentOpportunity")?.value.trim() || "Internship";
    const location = document.getElementById("studentLocation")?.value.trim() || "Remote";

    window.localStorage.setItem(ROLE_KEY, "student");

    const passport = mergePassport({
      name,
      email,
      track,
      academicLevel: level,
      skills,
      status,
      about,
      location,
      opportunity,
      experience,
      avatar: avatarInput || getInitials(name),
      welcomeState: "signup",
      jobReadiness: Math.max(getCurrentPassport().jobReadiness || DEFAULT_JOB_READINESS, 28)
    });

    if (experience && !passport.projects.length) {
      passport.projects.push({
        title: "Starter Experience",
        summary: experience
      });
      savePassport(passport);
    }

    runSmartWelcome(passport.name, "signup");
  });

  render();
}

function setupToasts() {
  const toast = document.getElementById("studentAuthToast");
  const buttons = document.querySelectorAll("[data-toast]");
  if (!toast || !buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const message = button.getAttribute("data-toast");
      if (message) showToast(message);
    });
  });
}

function runSmartWelcome(name, mode) {
  const overlay = document.getElementById("smartAuthOverlay");
  const title = document.getElementById("overlayTitle");
  const subtitle = document.getElementById("overlaySubtitle");
  const copy = document.getElementById("overlayCopy");

  if (!overlay || !title || !subtitle || !copy) {
    window.location.href = "student-onboarding.html";
    return;
  }

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  copy.classList.remove("is-welcome");

  title.textContent = "Creating your Talent DNA...";
  subtitle.textContent = "خلينا نحفظ رحلتك ونبني لك مسار خاص";

  setTimeout(() => {
    copy.classList.add("is-welcome");
    title.textContent = `Welcome, ${name} 👋`;
    subtitle.textContent = mode === "signup"
      ? "بدأنا نبني Talent Passport خاص بك... جاهز تكمل؟"
      : getSmartWelcomeLine();
  }, 1350);

  setTimeout(() => {
    window.location.href = "student-onboarding.html";
  }, 2850);
}

function getSmartWelcomeLine() {
  const passport = getCurrentPassport();
  const count = Number(passport.loginCount || 1);

  if (count > 3) return "رجعت تاني؟ خلينا نكمل ونرفع جاهزيتك للشغل.";
  if (count > 1) return "أهلا بعودتك، قربت توصل لأول فرصة قوية.";
  return "بدأنا نبني مسارك... جاهز تكمل؟";
}

function getCurrentPassport() {
  try {
    return JSON.parse(window.localStorage.getItem(PASSPORT_KEY) || "null") || {};
  } catch (error) {
    return {};
  }
}

function mergePassport(partial) {
  const current = getCurrentPassport();
  const name = partial.name || current.name || "Student";
  const skills = Array.isArray(partial.skills)
    ? partial.skills
    : Array.isArray(current.skills)
      ? current.skills
      : [];

  const next = {
    name,
    email: partial.email || current.email || "",
    track: partial.track || current.track || "Talent in Progress",
    academicLevel: partial.academicLevel || current.academicLevel || "",
    status: partial.status || current.status || "Available",
    about: partial.about || current.about || "أنا في بداية رحلة احترافية مبنية على التعلم الذكي والتحليل العملي.",
    location: partial.location || current.location || "Remote",
    opportunity: partial.opportunity || current.opportunity || "Internship",
    experience: partial.experience || current.experience || "",
    avatar: partial.avatar || current.avatar || getInitials(name),
    personality: current.personality || "Explorer in Progress",
    careerPath: current.careerPath || partial.track || "Career Path in Progress",
    skills,
    strengths: Array.isArray(current.strengths) ? current.strengths : skills.slice(0, 3),
    weaknesses: Array.isArray(current.weaknesses) ? current.weaknesses : ["Communication", "Speed"],
    badges: Array.isArray(current.badges) && current.badges.length ? current.badges : ["Explorer"],
    xp: typeof current.xp === "number" ? current.xp : 120,
    level: typeof current.level === "number" ? current.level : 1,
    levelLabel: current.levelLabel || "Level 1 — Beginner",
    jobReadiness: partial.jobReadiness || current.jobReadiness || DEFAULT_JOB_READINESS,
    savedJobs: Array.isArray(current.savedJobs) ? current.savedJobs : [],
    applications: Array.isArray(current.applications) ? current.applications : [],
    learningProgress: typeof current.learningProgress === "number" ? current.learningProgress : 0,
    completedSteps: Array.isArray(current.completedSteps) ? current.completedSteps : [],
    projects: Array.isArray(current.projects) ? current.projects : [],
    certificates: Array.isArray(current.certificates) ? current.certificates : [],
    loginCount: Number(current.loginCount || 0) + 1,
    lastSeenAt: new Date().toISOString(),
    welcomeState: partial.welcomeState || current.welcomeState || "signup"
  };

  savePassport(next);
  return next;
}

function savePassport(passport) {
  window.localStorage.setItem(PASSPORT_KEY, JSON.stringify(passport));
}

function splitTags(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function showToast(message) {
  const toast = document.getElementById("studentAuthToast");
  if (!toast || !message) return;

  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}
