<script>
let isSaving = false; 

async function loadTasks() {
  const res = await fetch("https://todobackend-1-ridi.onrender.com/tasks"); 
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

  try {
    const res = await fetch("https://todobackend-1-ridi.onrender.com/tasks", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, completed: false }) 
    });

    if (!res.ok) {
      const errMsg = await res.text();
      console.error("Add task failed:", errMsg);
      alert("❌ Failed to add task: " + errMsg);
    }

    input.value = "";
    await loadTasks();
  } catch (error) {
    console.error("Network error:", error);
    alert("❌ Network error while adding task");
  }

  isSaving = false;
}

async function deleteTask(id) {
  await fetch(`https://todobackend-1-ridi.onrender.com/tasks/${id}`, {
    method: "DELETE"
  });
  loadTasks();
}

document.getElementById("task-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

loadTasks();
</script>

