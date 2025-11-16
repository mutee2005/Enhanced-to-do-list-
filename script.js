let hearts = 0;

// ---------- Utility ----------
function updateHearts() {
  document.getElementById("heartsDisplay").textContent = `❤️ ${hearts}`;
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ---------- GOALS ----------
document.getElementById("addGoalBtn").addEventListener("click", () => {
  const goalText = document.getElementById("goalInput").value.trim();
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;

  if (!goalText) return;

  const li = document.createElement("li");
  li.className = "card";

  li.innerHTML = `
    <div>
      <strong>${escapeHtml(goalText)}</strong>
      <p class="small-text">From: ${fromDate || "—"} | To: ${toDate || "—"}</p>
    </div>
    <button class="deleteBtn">Delete</button>
  `;

  // toggle completion on card click
  li.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) return;
    if (!li.classList.contains("completed")) {
      li.classList.add("completed");
      hearts++;
    } else {
      li.classList.remove("completed");
      hearts = Math.max(0, hearts - 1);
    }
    updateHearts();
  });

  // delete button
  li.querySelector(".deleteBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    if (li.classList.contains("completed")) {
      hearts = Math.max(0, hearts - 1);
      updateHearts();
    }
    li.remove();
  });

  document.getElementById("goalList").appendChild(li);

  document.getElementById("goalInput").value = "";
  document.getElementById("fromDate").value = "";
  document.getElementById("toDate").value = "";
});

// ---------- TASKS ----------
document.getElementById("addTaskBtn").addEventListener("click", () => {
  const task = document.getElementById("taskInput").value.trim();
  const punish = document.getElementById("punishmentInput").value.trim();

  if (!task) return;

  const li = document.createElement("li");
  li.className = "card";

  li.innerHTML = `
    <div>
      <strong>${escapeHtml(task)}</strong>
      <p class="small-text">Punishment: ${punish || "None"}</p>
    </div>
    <button class="deleteBtn">Delete</button>
  `;

  // toggle completion
  li.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) return;
    if (!li.classList.contains("completed")) {
      li.classList.add("completed");
      hearts++;
    } else {
      li.classList.remove("completed");
      hearts = Math.max(0, hearts - 1);
    }
    updateHearts();
  });

  // delete button
  li.querySelector(".deleteBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    if (li.classList.contains("completed")) {
      hearts = Math.max(0, hearts - 1);
      updateHearts();
    }
    li.remove();
  });

  document.getElementById("taskList").appendChild(li);

  document.getElementById("taskInput").value = "";
  document.getElementById("punishmentInput").value = "";
});
