const heroMessages = [
  "90%من الطلاب لا يعرفون مهاراتهم الحقيقيه",
  "ابدأ رحلتك بذكاء",
  "SkillBridge يفهمك قبل ما يرشحك"
];

const quizMicroFeedback = {
  data: ["اختيار منطقي 👌", "واضح إنك بتحب التنظيم", "أنت تميل للوضوح والقياس"],
  design: ["واضح إن عندك حس بصري", "أنت تميل للتجربة والشكل", "اختيارك فيه لمسة إبداع"],
  business: ["واضح إنك تتحرك مع الناس", "عندك ميل للتأثير", "أنت أقرب للأدوار القيادية"]
};

const loadingMessages = [
  "Analyzing your skills...",
  "Building your Talent DNA...",
  "Matching you with opportunities..."
];

const QUICK_ASSESSMENT_KEY = "skillbridgeAssessmentResult";

const quizQuestions = [
  {
    question: "تفضل العمل مع:",
    options: [
      { label: "أرقام", track: "data" },
      { label: "تصميم", track: "design" },
      { label: "أشخاص", track: "business" }
    ]
  },
  {
    question: "أنت أكثر:",
    options: [
      { label: "تحليلي", track: "data" },
      { label: "مبدع", track: "design" },
      { label: "قيادي", track: "business" }
    ]
  },
  {
    question: "أكثر مهمة تستمتع بها:",
    options: [
      { label: "حل مشكلة معقدة", track: "data" },
      { label: "بناء تجربة جميلة", track: "design" },
      { label: "تنظيم الفريق واتخاذ القرار", track: "business" }
    ]
  }
];

const quizResults = {
  data: {
    title: "أنت مناسب لمجال Data بنسبة 82%",
    fullTitle: "أنت مناسب لـ Data Analysis بنسبة 82%",
    description: "طريقتك تميل للتحليل، قراءة الأنماط، وتحويل المعلومات إلى قرارات واضحة.",
    personalized: "من طريقة تفكيرك واضح إنك بتميل لتحليل الأنماط أكتر من التعامل المستمر مع الناس، وده بيخليك أقرب جدًا لمجالات زي Data Analysis. أنت غالبًا ترتاح لما الأمور تبقى قابلة للقياس، ولما تشوف مشكلة وتحولها لخطوات واضحة.",
    skills: ["Python", "SQL", "تحليل البيانات"],
    strengths: ["تفكير تحليلي", "ملاحظة التفاصيل", "راحة مع الأرقام"],
    paths: ["Data Analysis", "Business Intelligence", "AI Foundations"],
    nextStep: "ابدأ بتعلم Python ثم نفّذ مشروع Dashboard صغير على بيانات حقيقية.",
    retentionHooks: [
      "في 3 فرص مناسبة ليك متاحة دلوقتي",
      "في Dashboard فيها تحليل أعمق ليك",
      "أنت شبه 72% من Data Analysts"
    ],
    dnaBars: [
      { label: "Analysis", value: 82 },
      { label: "Focus", value: 76 },
      { label: "Execution", value: 68 }
    ]
  },
  design: {
    title: "أنت مناسب لمجال Design بنسبة 79%",
    fullTitle: "أنت مناسب لـ Product Design بنسبة 79%",
    description: "إجاباتك تشير إلى حس بصري قوي وقدرة على تحويل الأفكار إلى تجارب مفهومة وجذابة.",
    personalized: "واضح إنك بتميل لصناعة تجربة يشعر بها الناس، مش مجرد تنفيذ شكل حلو. أنت غالبًا تلاحظ الانطباع العام بسرعة، وتفكر في كيف تجعل الشيء أوضح وأسهل وأكثر جاذبية.",
    skills: ["UI Design", "UX Thinking", "Visual Storytelling"],
    strengths: ["حس بصري", "تفكير إبداعي", "تبسيط التجربة"],
    paths: ["Product Design", "UI/UX", "Brand Experience"],
    nextStep: "ابدأ بتحليل تطبيقات تحبها ثم صمّم Case Study بسيطة لواجهة واحدة.",
    retentionHooks: [
      "في Dashboard فيها تحليل أعمق لأسلوبك الإبداعي",
      "في 3 مسارات Design مناسبة ليك",
      "في مقارنة بينك وبين مصممين شبهك"
    ],
    dnaBars: [
      { label: "Creativity", value: 79 },
      { label: "Empathy", value: 72 },
      { label: "Visual Sense", value: 84 }
    ]
  },
  business: {
    title: "أنت مناسب لمجال Business بنسبة 76%",
    fullTitle: "أنت مناسب لـ Business & Operations بنسبة 76%",
    description: "لديك ميل للتواصل، القيادة، وتحريك الفرق نحو أهداف واضحة.",
    personalized: "إجاباتك توضح إنك تميل للحركة، التأثير، وربط الناس بهدف واضح. أنت غالبًا تشعر بقيمتك أكثر عندما يكون لديك دور في اتخاذ القرار أو تنظيم الفوضى وتحويلها إلى اتجاه مفهوم.",
    skills: ["Communication", "Leadership", "Strategic Thinking"],
    strengths: ["القيادة", "التواصل", "تنظيم الأولويات"],
    paths: ["Operations", "Business Development", "Product Management"],
    nextStep: "ابدأ بتعلم أساسيات إدارة المنتجات أو العمليات وطبّقها في مشروع فريق صغير.",
    retentionHooks: [
      "في Dashboard فيها تحليل أعمق لأسلوب قيادتك",
      "في فرص مناسبة ليك حسب طريقة شغلك مع الناس",
      "في مقارنة بينك وبين أصحاب المسارات التشغيلية"
    ],
    dnaBars: [
      { label: "Leadership", value: 76 },
      { label: "Communication", value: 82 },
      { label: "Strategy", value: 71 }
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setupLoadingScreen();
  setupHeader();
  setupReveal();
  setupHeroTicker();
  setupJourneyDock();
  setupQuiz();
});

function setupLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");
  const loadingMessage = document.getElementById("loadingMessage");
  const loadingBar = document.getElementById("loadingBar");

  if (!loadingScreen || !loadingMessage || !loadingBar) return;

  let messageIndex = 0;
  let progress = 0;

  const messageInterval = window.setInterval(() => {
    messageIndex = (messageIndex + 1) % loadingMessages.length;
    loadingMessage.textContent = loadingMessages[messageIndex];
  }, 850);

  const progressInterval = window.setInterval(() => {
    progress += 4;
    loadingBar.style.width = `${Math.min(progress, 100)}%`;

    if (progress >= 100) {
      window.clearInterval(progressInterval);
      window.clearInterval(messageInterval);
      loadingScreen.classList.add("is-hidden");
    }
  }, 70);
}

function setupHeader() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = navMenu ? navMenu.querySelectorAll("a") : [];

  if (toggle && header) {
    toggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("scroll", () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupHeroTicker() {
  const target = document.getElementById("heroDynamicText");
  if (!target) return;

  let index = 0;
  window.setInterval(() => {
    index = (index + 1) % heroMessages.length;
    target.textContent = heroMessages[index];
  }, 2200);
}

function setupJourneyDock() {
  const checkpoints = [
    { selector: "#quiz", percent: 30, label: "أنت في بداية الرحلة" },
    { selector: ".dashboard-preview", percent: 60, label: "تم فتح الـ Dashboard" },
    { selector: "#learning", percent: 80, label: "أنت قريب من فتح الفرص الكاملة" }
  ];

  checkpoints.forEach((checkpoint) => {
    const element = document.querySelector(checkpoint.selector);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const percentEl = document.getElementById("journeyPercent");
          const labelEl = document.getElementById("journeyLabel");
          const barEl = document.getElementById("journeyBar");
          if (percentEl) percentEl.textContent = `${checkpoint.percent}%`;
          if (labelEl) labelEl.textContent = checkpoint.label;
          if (barEl) barEl.style.width = `${checkpoint.percent}%`;
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
  });
}

function setupQuiz() {
  const questionEl = document.getElementById("quizQuestion");
  const optionsEl = document.getElementById("quizOptions");
  const progressEl = document.getElementById("quizProgress");
  const stageEl = document.getElementById("quizStage");
  const resultEl = document.getElementById("quizResult");
  const resultOverlay = document.getElementById("resultOverlay");
  const resultBackdrop = document.getElementById("resultBackdrop");
  const resultClose = document.getElementById("resultClose");
  const resultTitle = document.getElementById("resultTitle");
  const resultAiCopy = document.getElementById("resultAiCopy");
  const resultStrengths = document.getElementById("resultStrengths");
  const resultPaths = document.getElementById("resultPaths");
  const resultNextStep = document.getElementById("resultNextStep");
  const resultProgressText = document.getElementById("resultProgressText");
  const resultHooks = document.getElementById("resultHooks");
  const dnaBars = document.getElementById("dnaBars");
  const quizFeedback = document.getElementById("quizFeedback");
  const journeyPercent = document.getElementById("journeyPercent");
  const journeyLabel = document.getElementById("journeyLabel");
  const journeyBar = document.getElementById("journeyBar");

  if (!questionEl || !optionsEl || !progressEl || !stageEl || !resultEl) return;

  let currentIndex = 0;
  const scores = { data: 0, design: 0, business: 0 };

  function setJourneyProgress(percent, label) {
    if (journeyPercent) journeyPercent.textContent = `${percent}%`;
    if (journeyLabel) journeyLabel.textContent = label;
    if (journeyBar) journeyBar.style.width = `${percent}%`;
  }

  function renderQuestion() {
    const currentQuestion = quizQuestions[currentIndex];
    const progressValue = ((currentIndex + 1) / quizQuestions.length) * 100;

    stageEl.textContent = `سؤال ${currentIndex + 1} من ${quizQuestions.length}`;
    questionEl.textContent = currentQuestion.question;
    progressEl.style.width = `${progressValue}%`;
    resultEl.classList.add("hidden");
    if (quizFeedback) quizFeedback.textContent = "كل اختيار هنا يقربنا لصورتك الحقيقية.";
    setJourneyProgress(30, "أنت في بداية الرحلة");

    optionsEl.innerHTML = currentQuestion.options
      .map(
        (option, index) => `
          <button class="quiz-option" type="button" data-option-index="${index}">
            ${option.label}
          </button>
        `
      )
      .join("");
  }

  function renderResult() {
    const bestTrack = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const result = quizResults[bestTrack];
    persistQuickAssessment(bestTrack, result);

    stageEl.textContent = "النتيجة جاهزة";
    questionEl.textContent = result.title;
    progressEl.style.width = "100%";
    optionsEl.innerHTML = "";
    resultEl.classList.remove("hidden");
    resultEl.innerHTML = `
      <p>${result.description}</p>
      <div class="result-boxes">
        <div class="result-box">
          <strong>Skills الأساسية</strong>
          <ul class="result-list">
            ${result.skills.map((skill) => `<li>${skill}</li>`).join("")}
          </ul>
        </div>
        <div class="result-box">
          <strong>مجالات مناسبة</strong>
          <ul class="result-list">
            ${result.paths.map((path) => `<li>${path}</li>`).join("")}
          </ul>
        </div>
      </div>
      <div class="result-actions">
        <a class="btn btn-primary" href="student-auth.html">ابدأ رحلتك الآن</a>
        <a class="btn btn-ghost" href="student-auth.html">جرب التحليل الكامل</a>
      </div>
    `;

    showResultOverlay(result);
  }

  function showResultOverlay(result) {
    if (
      !resultOverlay ||
      !resultTitle ||
      !resultAiCopy ||
      !resultStrengths ||
      !resultPaths ||
      !resultNextStep ||
      !resultProgressText ||
      !resultHooks ||
      !dnaBars
    ) {
      return;
    }

    resultTitle.textContent = result.fullTitle;
    resultAiCopy.textContent = result.personalized;
    resultStrengths.innerHTML = result.strengths.map((item) => `<li>${item}</li>`).join("");
    resultPaths.innerHTML = result.paths.map((item) => `<li>${item}</li>`).join("");
    resultNextStep.textContent = result.nextStep;
    resultProgressText.textContent = "أنت خلصت 30% من رحلتك";
    resultHooks.innerHTML = result.retentionHooks.map((item) => `<li>${item}</li>`).join("");
    dnaBars.innerHTML = result.dnaBars
      .map(
        (item) => `
          <div class="dna-bar">
            <div class="dna-bar-head">
              <span>${item.label}</span>
              <span>${item.value}%</span>
            </div>
            <div class="dna-bar-track"><span style="width:${item.value}%"></span></div>
          </div>
        `
      )
      .join("");
    resultOverlay.classList.remove("hidden");
    resultOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setJourneyProgress(30, "تم فتح نتيجة Talent DNA");
  }

  function closeResultOverlay() {
    if (!resultOverlay) return;
    resultOverlay.classList.add("hidden");
    resultOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  resultClose?.addEventListener("click", closeResultOverlay);
  resultBackdrop?.addEventListener("click", closeResultOverlay);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeResultOverlay();
  });

  optionsEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-option-index]");
    if (!button) return;

    const optionIndex = Number(button.dataset.optionIndex);
    const selectedOption = quizQuestions[currentIndex].options[optionIndex];
    scores[selectedOption.track] += 1;
    if (quizFeedback) {
      const feedbackSet = quizMicroFeedback[selectedOption.track];
      quizFeedback.textContent = feedbackSet[Math.min(currentIndex, feedbackSet.length - 1)];
    }
    currentIndex += 1;

    if (currentIndex >= quizQuestions.length) {
      renderResult();
      return;
    }

    renderQuestion();
  });

  renderQuestion();
}

function persistQuickAssessment(track, result) {
  const personaMap = {
    data: "analyst",
    design: "creator",
    business: "communicator"
  };

  const weaknessMap = {
    data: ["Communication", "Speed Under Pressure"],
    design: ["Routine", "Rigid Structure"],
    business: ["Technical Depth", "Deep Solo Work"]
  };

  const stylesMap = {
    data: "Thinking Style: Analytical. Work Style: Structured / Insight-driven.",
    design: "Thinking Style: Creative. Work Style: Flexible / Experience-driven.",
    business: "Thinking Style: Social. Work Style: Team / Action-driven."
  };

  const assessmentState = {
    persona: personaMap[track] || "analyst",
    careerPath: result.fullTitle,
    title: result.title,
    fullTitle: result.fullTitle,
    copy: result.personalized,
    personality: result.description,
    strengths: result.strengths,
    weaknesses: weaknessMap[track] || ["Communication", "Focus"],
    paths: result.paths,
    next: result.nextStep,
    styles: stylesMap[track] || stylesMap.data,
    dna: result.dnaBars.map((item) => ({
      label: item.label,
      value: item.value
    })),
    completedAt: new Date().toISOString(),
    source: "quick-quiz"
  };

  try {
    window.localStorage.setItem(QUICK_ASSESSMENT_KEY, JSON.stringify(assessmentState));
  } catch (error) {
    console.warn("Unable to persist quick assessment result", error);
  }
}
