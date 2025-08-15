let tasks = [];

function loadTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    const delBtn = document.createElement("span");
    delBtn.textContent = "✂️";
    delBtn.style.cursor = "pointer";
    delBtn.onclick = () => deleteTask(index);

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text });
  loadTasks();
  input.value = "";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  loadTasks();
}

document.getElementById("task-input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

loadTasks();

