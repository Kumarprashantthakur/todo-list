let isSaving = false;


const API_BASE = "https://todobackend-ui56.onrender.com";

async function loadTasks() {
  try {
    const res = await fetch(`${API_BASE}/tasks`);
    if (!res.ok) throw new Error("Failed to fetch tasks");

    const tasks = await res.json();
    console.log("Loaded tasks:", tasks);

    const list = document.getElementById("task-list");
    list.innerHTML = "";
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.innerHTML = `${task.text} <span onclick="deleteTask('${task._id}')">✂️</span>`;
      if (task.completed) li.classList.add("completed");
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading tasks:", err);
  }
}

async function addTask() {
  if (isSaving) return;
  isSaving = true;

  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (!text) { isSaving = false; return; }

  try {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    console.log("Add task response:", data); 
    if (!res.ok) {
      alert("❌ Failed to add task");
    } else {

      const list = document.getElementById("task-list");
      const li = document.createElement("li");
      li.innerHTML = `${data.text} <span onclick="deleteTask('${data._id}')">✂️</span>`;
      if (data.completed) li.classList.add("completed");
      list.appendChild(li);
    }
  } catch (err) {
    console.error("Error adding task:", err);
  }

  input.value = "";
  isSaving = false;
}

async function deleteTask(id) {
  try {
    await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });

    document.querySelector(`span[onclick="deleteTask('${id}')"]`).parentElement.remove();
  } catch (err) {
    console.error("Error deleting task:", err);
  }
}

document.getElementById("task-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Initial load
loadTasks();

