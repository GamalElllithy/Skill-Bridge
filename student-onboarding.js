const assessmentQuestions = [
  {
    type: "choice",
    label: "Multiple Choice",
    title: "لما تواجه مشكلة معقدة، أول رد فعل عندك بيكون إيه؟",
    description: "الاختيار ده بيوضح طريقة شروعك في حل المشكلات.",
    xp: 80,
    feedback: "إجابتك هنا ترسم هل أنت أقرب للتحليل، التنفيذ، أم التفاعل مع الآخرين.",
    options: [
      { label: "أحللها خطوة خطوة", persona: "analyst", traits: ["logic", "detailed"] },
      { label: "أجرب بسرعة وأتعلم أثناء التنفيذ", persona: "builder", traits: ["fast", "practical"] },
      { label: "أسأل حد وأجمع وجهات نظر", persona: "communicator", traits: ["social", "team"] },
      { label: "أفكر في حل جديد غير متوقع", persona: "creator", traits: ["creative", "flexible"] }
    ]
  },
  {
    type: "scenario",
    label: "Scenario",
    title: "مديرك طلب منك مهمة صعبة في وقت قليل. ماذا ستفعل؟",
    description: "ده موقف واقعي يكشف أسلوب العمل تحت الضغط.",
    xp: 90,
    feedback: "القرار تحت الضغط يكشف أسلوبك الحقيقي أكثر من الإجابات النظرية.",
    options: [
      { label: "أقسم المهمة لمراحل وأرتب الأولويات", persona: "analyst", traits: ["structured", "logic"] },
      { label: "أبدأ فورًا وأعدل الطريق أثناء الشغل", persona: "builder", traits: ["fast", "execution"] },
      { label: "أتواصل مع الفريق وأطلب الموارد المناسبة", persona: "communicator", traits: ["team", "social"] },
      { label: "أفكر في طريقة مختصرة أو مبتكرة تنجز المطلوب", persona: "creator", traits: ["creative", "flexible"] }
    ]
  },
  {
    type: "slider",
    label: "Slider",
    title: "قد إيه بتحب الشغل الجماعي؟",
    description: "حرّك المؤشر من 0 إلى 100.",
    xp: 70,
    feedback: "درجة ميولك للتعاون تساعدنا نفهم بيئة العمل المناسبة لك."
  },
  {
    type: "either",
    label: "Either / Or",
    title: "أقرب لك أكثر:",
    description: "اختر الشخصية المهنية الأقرب لك الآن.",
    xp: 70,
    feedback: "هذا السؤال يفرق بين الميول التحليلية والميول الاجتماعية بسرعة.",
    options: [
      { label: "أرقام وبيانات", persona: "analyst", traits: ["logic", "solo"] },
      { label: "ناس وتواصل", persona: "communicator", traits: ["social", "team"] }
    ]
  },
  {
    type: "ranking",
    label: "Ranking",
    title: "رتّب هذه الأشياء من الأكثر أهمية للأقل بالنسبة لك",
    description: "اضغط العناصر بالترتيب الذي يناسبك.",
    xp: 110,
    feedback: "الأولويات المهنية تعطينا صورة أوضح عن نوع المسار والبيئة المناسبة.",
    items: ["التعلم", "الحرية", "الاستقرار", "المال"]
  },
  {
    type: "speed",
    label: "Speed Question",
    title: "اختيار سريع: ماذا تفضّل في الشغل؟",
    description: "عندك 5 ثوانٍ فقط للاختيار.",
    xp: 120,
    feedback: "رد الفعل السريع يساعدنا نشوف ميلك الطبيعي قبل التفكير الطويل.",
    options: [
      { label: "الدقة", persona: "analyst", traits: ["detailed"] },
      { label: "السرعة", persona: "builder", traits: ["fast"] },
      { label: "الإبداع", persona: "creator", traits: ["creative"] },
      { label: "التواصل", persona: "communicator", traits: ["social"] }
    ],
    duration: 5
  }
];

const resultMap = {
  analyst: {
    title: "أنت: Data Explorer 🔥",
    copy: "واضح إنك تميل لفهم الأنظمة والأنماط قبل اتخاذ القرار، وهذا يضعك قريبًا من مسارات التحليل، البيانات، وحل المشكلات المعقدة.",
    personality: "أنت شخص تحليلي بتميل لفهم الأنظمة، وترتاح عندما تكون الأمور قابلة للقياس والتنظيم.",
    strengths: ["Problem Solving", "Logic", "Deep Focus"],
    weaknesses: ["Communication", "Speed Under Pressure"],
    paths: ["Data Analyst", "Backend Developer", "Business Intelligence"],
    next: "ابدأ Python ثم SQL، وبعدها ابنِ مشروع Dashboard على بيانات حقيقية.",
    styles: "Thinking Style: منطقي + دقيق. Work Style: Solo / Structured.",
    dna: [
      { label: "Analytical", value: 82 },
      { label: "Creative", value: 44 },
      { label: "Social", value: 58 }
    ]
  },
  builder: {
    title: "أنت: Builder Mindset 🚀",
    copy: "إجاباتك بتوضح إنك تميل للحركة والتنفيذ، وتتعلم بسرعة من التجربة أكثر من التحليل الطويل.",
    personality: "أنت عملي، سريع، وتحب رؤية أثر مباشر لما تفعله بدل البقاء طويلًا في مرحلة التفكير.",
    strengths: ["Execution", "Speed", "Ownership"],
    weaknesses: ["Patience", "Detail Depth"],
    paths: ["Software Engineering", "Operations", "Product Execution"],
    next: "ابدأ بمشروع عملي صغير كل أسبوع، مع أساس قوي في البرمجة أو العمليات.",
    styles: "Thinking Style: سريع + عملي. Work Style: Flexible / Action-first.",
    dna: [
      { label: "Analytical", value: 60 },
      { label: "Creative", value: 52 },
      { label: "Social", value: 49 }
    ]
  },
  creator: {
    title: "أنت: Creative Strategist ✨",
    copy: "تميل للحلول غير التقليدية، وتحب أن تجعل الأشياء أوضح وأجمل وأكثر تأثيرًا.",
    personality: "أنت مبدع وتفكر في الإمكانات والزوايا الجديدة قبل أن تقبل الحل المعتاد.",
    strengths: ["Creativity", "Experience Thinking", "Idea Generation"],
    weaknesses: ["Routine", "Rigid Structure"],
    paths: ["UI/UX", "Product Design", "Brand Strategy"],
    next: "ابدأ Case Study واضحة أو تصميم تجربة صغيرة تربط الإبداع بهدف عملي.",
    styles: "Thinking Style: إبداعي + مرن. Work Style: Flexible / Insight-driven.",
    dna: [
      { label: "Analytical", value: 48 },
      { label: "Creative", value: 84 },
      { label: "Social", value: 61 }
    ]
  },
  communicator: {
    title: "أنت: People Connector 🤝",
    copy: "واضح إنك ترتاح أكثر عندما تتحرك مع الناس، وتربط الأهداف بالأشخاص والطاقة الجماعية.",
    personality: "أنت اجتماعي وتميل للتأثير والتنسيق، وتستمد قوتك من التعاون والتواصل الواضح.",
    strengths: ["Communication", "Leadership", "Team Alignment"],
    weaknesses: ["Deep Solo Work", "Technical Depth"],
    paths: ["Marketing", "Business Development", "Product Management"],
    next: "ابدأ بفهم أساسيات التحليل أو المنتج بجانب تقوية مهارات التواصل والقيادة.",
    styles: "Thinking Style: اجتماعي + سريع. Work Style: Team / Flexible.",
    dna: [
      { label: "Analytical", value: 54 },
      { label: "Creative", value: 60 },
      { label: "Social", value: 86 }
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setupReveal();
  setupAssessment();
});

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
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

function setupAssessment() {
  const intro = document.getElementById("introScreen");
  const shell = document.getElementById("assessmentShell");
  const resultScreen = document.getElementById("resultScreen");
  const start = document.getElementById("startAssessment");
  const prev = document.getElementById("prevQuestion");
  const next = document.getElementById("nextQuestion");
  const body = document.getElementById("questionBody");
  const title = document.getElementById("questionTitle");
  const desc = document.getElementById("questionDescription");
  const type = document.getElementById("questionType");
  const progressPercent = document.getElementById("progressPercent");
  const counter = document.getElementById("questionCounter");
  const progressBar = document.getElementById("progressBar");
  const xpValue = document.getElementById("xpValue");
  const feedback = document.getElementById("dynamicFeedback");
  const timerEl = document.getElementById("speedTimer");
  if (!intro || !shell || !resultScreen || !start || !prev || !next || !body || !title || !desc || !type || !progressPercent || !counter || !progressBar || !xpValue || !feedback || !timerEl) return;

  let current = 0;
  let xp = 0;
  let speedTimerId = null;
  const scores = { analyst: 0, builder: 0, creator: 0, communicator: 0 };
  const answers = [];

  start.addEventListener("click", () => {
    intro.classList.add("hidden");
    shell.classList.remove("hidden");
    renderQuestion();
  });

  prev.addEventListener("click", () => {
    if (current === 0) return;
    current -= 1;
    renderQuestion();
  });

  next.addEventListener("click", () => {
    if (!validateCurrentAnswer()) return;
    current += 1;
    if (current >= assessmentQuestions.length) {
      renderResult();
      return;
    }
    renderQuestion();
  });

  function renderQuestion() {
    clearInterval(speedTimerId);
    const question = assessmentQuestions[current];
    const progress = Math.round(((current + 1) / assessmentQuestions.length) * 100);
    type.textContent = question.label;
    title.textContent = question.title;
    desc.textContent = question.description;
    counter.textContent = `سؤال ${current + 1} من ${assessmentQuestions.length}`;
    progressPercent.textContent = `${progress}%`;
    progressBar.style.width = `${progress}%`;
    xpValue.textContent = `+${xp} XP`;
    feedback.textContent = question.feedback;
    prev.classList.toggle("hidden", current === 0);
    timerEl.textContent = "";

    const saved = answers[current];
    if (question.type === "choice" || question.type === "scenario") {
      body.innerHTML = question.options.map((option, index) => `<button class="option-btn ${saved?.index === index ? "selected" : ""}" type="button" data-choice-index="${index}">${option.label}</button>`).join("");
    } else if (question.type === "slider") {
      const value = saved?.value ?? 50;
      body.innerHTML = `<div class="slider-shell"><input type="range" min="0" max="100" value="${value}" id="teamSlider"><span class="slider-value" id="sliderValue">${value}%</span></div>`;
      const slider = document.getElementById("teamSlider");
      const sliderValue = document.getElementById("sliderValue");
      slider.addEventListener("input", () => {
        sliderValue.textContent = `${slider.value}%`;
        answers[current] = { value: Number(slider.value) };
      });
      answers[current] = { value: Number(value) };
    } else if (question.type === "either") {
      body.innerHTML = `<div class="either-grid">${question.options.map((option, index) => `<button class="either-btn ${saved?.index === index ? "selected" : ""}" type="button" data-choice-index="${index}">${option.label}</button>`).join("")}</div>`;
    } else if (question.type === "ranking") {
      const ordered = saved?.order || [];
      body.innerHTML = `<div class="rank-grid">${question.items.map((item) => `<button class="rank-btn ${ordered.includes(item) ? "selected" : ""}" type="button" data-rank-item="${item}">${item}</button>`).join("")}</div><div class="rank-preview" id="rankPreview">${ordered.length ? `ترتيبك الحالي: ${ordered.join(" → ")}` : "اضغط العناصر حسب الترتيب الذي يناسبك"}</div>`;
    } else if (question.type === "speed") {
      body.innerHTML = `<div class="speed-grid">${question.options.map((option, index) => `<button class="option-btn ${saved?.index === index ? "selected" : ""}" type="button" data-choice-index="${index}">${option.label}</button>`).join("")}</div>`;
      let remaining = question.duration;
      timerEl.textContent = `⏱ ${remaining}s`;
      speedTimerId = setInterval(() => {
        remaining -= 1;
        timerEl.textContent = `⏱ ${remaining}s`;
        if (remaining <= 0) {
          clearInterval(speedTimerId);
          if (!answers[current]) {
            answers[current] = { skipped: true };
            current += 1;
            if (current >= assessmentQuestions.length) renderResult();
            else renderQuestion();
          }
        }
      }, 1000);
    }

    bindQuestionEvents(question);
  }

  function bindQuestionEvents(question) {
    body.querySelectorAll("[data-choice-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.getAttribute("data-choice-index"));
        answers[current] = { index };
        body.querySelectorAll("[data-choice-index]").forEach((item) => item.classList.toggle("selected", item === button));
        feedback.textContent = "إجابتك بتوضح إن عندك نمط واضح في هذا المسار 👀";
        if (question.type === "speed") {
          clearInterval(speedTimerId);
          next.click();
        }
      });
    });

    body.querySelectorAll("[data-rank-item]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.getAttribute("data-rank-item");
        const currentOrder = answers[current]?.order ? [...answers[current].order] : [];
        if (currentOrder.includes(item)) return;
        currentOrder.push(item);
        answers[current] = { order: currentOrder };
        button.classList.add("selected");
        const preview = document.getElementById("rankPreview");
        if (preview) preview.textContent = `ترتيبك الحالي: ${currentOrder.join(" → ")}`;
      });
    });
  }

  function validateCurrentAnswer() {
    const question = assessmentQuestions[current];
    const answer = answers[current];
    if (!answer) return false;
    if (question.type === "ranking" && (!answer.order || answer.order.length !== question.items.length)) return false;
    if (answer.applied) return true;

    xp += question.xp;
    xpValue.textContent = `+${xp} XP`;

    if ((question.type === "choice" || question.type === "scenario" || question.type === "either" || question.type === "speed") && typeof answer.index === "number") {
      const selected = question.options[answer.index];
      if (selected?.persona) scores[selected.persona] += 1;
    }

    if (question.type === "slider") {
      const value = Number(answer.value || 0);
      if (value >= 60) scores.communicator += 1;
      else scores.analyst += 1;
    }

    if (question.type === "ranking") {
      const first = answer.order[0];
      if (first === "التعلم") scores.analyst += 1;
      if (first === "الحرية") scores.creator += 1;
      if (first === "الاستقرار") scores.builder += 1;
      if (first === "المال") scores.communicator += 1;
    }

    answer.applied = true;
    return true;
  }

  function renderResult() {
    shell.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    const persona = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "analyst";
    const result = resultMap[persona];
    const assessmentState = {
      persona,
      title: result.title,
      copy: result.copy,
      personality: result.personality,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      paths: result.paths,
      next: result.next,
      styles: result.styles,
      dna: result.dna,
      xp,
      completedAt: new Date().toISOString()
    };

    try {
      window.localStorage.setItem("skillbridgeAssessmentResult", JSON.stringify(assessmentState));
    } catch (error) {
      console.warn("Unable to persist assessment result", error);
    }

    document.getElementById("resultHeroTitle").textContent = result.title;
    document.getElementById("resultHeroCopy").textContent = result.copy;
    document.getElementById("resultPersonality").textContent = result.personality;
    document.getElementById("resultStrengths").innerHTML = result.strengths.map((item) => `<li>${item}</li>`).join("");
    document.getElementById("resultWeaknesses").innerHTML = result.weaknesses.map((item) => `<li>${item}</li>`).join("");
    document.getElementById("resultPaths").innerHTML = result.paths.map((item) => `<li>${item}</li>`).join("");
    document.getElementById("resultNextStep").textContent = result.next;
    document.getElementById("resultStyles").textContent = result.styles;
    document.getElementById("resultDnaBars").innerHTML = result.dna.map((bar) => `<div class="dna-bar"><div class="dna-bar-head"><span>${bar.label}</span><span>${bar.value}%</span></div><div class="dna-bar-track"><span style="width:${bar.value}%"></span></div></div>`).join("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
