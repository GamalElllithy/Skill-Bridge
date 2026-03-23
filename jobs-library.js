document.addEventListener("DOMContentLoaded", () => {
  const root = document.body.getAttribute("data-library-page");
  const key = root === "applied" ? "appliedJobs" : "savedJobs";
  const title = document.getElementById("libraryTitle");
  const copy = document.getElementById("libraryCopy");
  const count = document.getElementById("libraryCount");
  const grid = document.getElementById("libraryGrid");
  const empty = document.getElementById("libraryEmpty");

  const items = getStoredList(key);

  if (title) {
    title.textContent = root === "applied" ? "Applied Jobs" : "Saved Jobs";
  }

  if (copy) {
    copy.textContent = root === "applied"
      ? "كل الوظائف التي قدّمت عليها محفوظة هنا مع الحالة الحالية."
      : "كل الوظائف التي حفظتها لتراجعها لاحقًا موجودة هنا.";
  }

  if (count) {
    count.textContent = `${items.length} ${root === "applied" ? "Applied" : "Saved"}`;
  }

  if (!grid || !empty) return;

  if (!items.length) {
    grid.classList.add("hidden");
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");
  grid.classList.remove("hidden");
  grid.innerHTML = items.map((item) => `
    <article class="library-card">
      <div class="library-head">
        <div>
          <strong>${item.title}</strong>
          <div class="library-meta">${item.company}</div>
        </div>
        <span class="match-pill">${item.match}% Match</span>
      </div>
      <p class="library-meta">${item.location}</p>
      <div class="library-tags">${(item.tagsLabel || []).map((tag) => `<span>${tag}</span>`).join("")}</div>
      ${root === "applied" ? `<span class="status-pill">${item.status || "Pending Review"}</span>` : ""}
      <div class="library-actions">
        <a class="primary-btn" href="smart-jobs.html">Back to Smart Jobs</a>
        ${root === "saved" ? `<button class="ghost-btn" type="button" data-remove-id="${item.id}">Remove</button>` : ""}
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-remove-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-remove-id");
      const next = items.filter((item) => item.id !== id);
      window.localStorage.setItem(key, JSON.stringify(next));
      window.location.reload();
    });
  });
});

function getStoredList(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key) || "[]");
  } catch (error) {
    return [];
  }
}
