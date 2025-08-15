const API_URL = "http://localhost:5000/tasks"; 


async function loadTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch tasks");

    const tasks = await res.json();

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.text;

      const delBtn = document.createElement("span");
      delBtn.textContent = " ✂️";
      delBtn.style.cursor = "pointer";
      delBtn.onclick = () => deleteTask(task._id);

      li.appendChild(delBtn);
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading tasks:", err);
  }
}

async function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (!text) return;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      const errData = await res.json();
      alert(errData.error || "Failed to add task");
      return;
    }

    input.value = "";
    loadTasks();
  } catch (err) {
    console.error("Error adding task:", err);
  }
}


async function deleteTask(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");

    loadTasks();
  } catch (err) {
    console.error("Error deleting task:", err);
  }
}


document.getElementById("task-input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});


loadTasks();
