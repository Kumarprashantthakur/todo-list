let isSaving = false;
const API_URL = "https://todobackend-1-ridi.onrender.com/tasks";

async function loadTasks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to load tasks");

    const tasks = await res.json();
    const list = document.getElementById("task-list");
    list.innerHTML = "";

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.innerHTML = `${task.text} <span onclick="deleteTask('${task._id}')">✂️</span>`;
      if (task.completed) li.classList.add("completed");
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

async function addTask() {
  if (isSaving) return; 
  isSaving = true;

  const input = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const originalBtnText = addBtn.innerText;

  // Show saving state
  addBtn.innerText = "Saving...";
  addBtn.disabled = true;

  const text = input.value.trim();
  if (!text) {
    resetButton(addBtn, originalBtnText);
    return;
  }

  try {
    const res = await fetch(API_URL, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, completed: false })
    });

    if (!res.ok) {
      const errMsg = await res.text();
      console.error("Add task failed:", errMsg);
      alert("❌ Failed to add task: " + errMsg);
    } else {
      input.value = "";
      await loadTasks();
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("❌ Network error while adding task");
  }

  resetButton(addBtn, originalBtnText);
}

function resetButton(button, text) {
  button.innerText = text;
  button.disabled = false;
  isSaving = false;
}

async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await loadTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// Enter key also triggers addTask
document.getElementById("task-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

loadTasks();
