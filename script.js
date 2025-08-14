let isSaving = false; 

async function loadTasks() {
  const res = await fetch("http://localhost:5000/tasks");
  const tasks = await res.json();
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `${task.text} <span onclick="deleteTask('${task._id}')">✂️</span>`;
    if (task.completed) li.classList.add("completed");
    list.appendChild(li);
  });
}

async function addTask() {
  if (isSaving) return; 
  isSaving = true;

  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (!text) { isSaving = false; return; }

  const res = await fetch("http://localhost:5000/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  if (!res.ok) {
    alert("❌ Failed to add task");
  }

  input.value = "";
  await loadTasks();
  isSaving = false;
}

async function deleteTask(id) {
  await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
  loadTasks();
}


document.getElementById("task-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

loadTasks();
