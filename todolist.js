const taskInput  = document.getElementById("taskInput");
const addBtn     = document.getElementById("addBtn");
const taskList   = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const remaining  = document.getElementById("remaining");
const clearBtn   = document.getElementById("clearCompleted");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

function updateCount() {
  remaining.textContent = tasks.filter(t => !t.completed).length;
}

function render() {
  taskList.innerHTML = "";
  emptyState.classList.toggle("visible", tasks.length === 0);
  updateCount();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("div");
    checkbox.classList.add("checkbox");
    if (task.completed) checkbox.classList.add("checked");
    checkbox.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      save();
    });

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "×";
    deleteBtn.addEventListener("click", () => {
      li.classList.add("removing");
      setTimeout(() => {
        tasks.splice(index, 1);
        save();
      }, 200);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.style.borderColor = "rgba(248,113,113,0.5)";
    taskInput.style.boxShadow   = "0 0 0 3px rgba(248,113,113,0.12)";
    setTimeout(() => {
      taskInput.style.borderColor = "";
      taskInput.style.boxShadow   = "";
    }, 700);
    return;
  }
  tasks.push({ text, completed: false });
  taskInput.value = "";
  save();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e => { if (e.key === "Enter") addTask(); });
clearBtn.addEventListener("click", () => {
  tasks = tasks.filter(t => !t.completed);
  save();
});

render();