function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `${taskText} <span onclick="deleteTask(this)">✂️</span>`;
  li.onclick = () => li.classList.toggle("completed");

  document.getElementById("task-list").appendChild(li);
  input.value = "";
}

function deleteTask(span) {
  span.parentElement.remove();
}
document.getElementById("task-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});