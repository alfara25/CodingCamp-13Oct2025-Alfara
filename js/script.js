let tasksDb = [];

function addTask() {
  const taskInput = document.getElementById("todo-input");
  const taskDate = document.getElementById("todo-date");

  if (validateInput(taskInput.value, taskDate.value)) {
    const newTask = {
      task: taskInput.value,
      date: taskDate.value,
    };
    /// Add the new task to the tasks database
    tasksDb.push(newTask);

    taskInput.value = "";
    taskDate.value = "";

    renderTasks();
  }
}

function renderTasks(filteredTasks = null) {
  const taskList = document.getElementById("todo-tbody");
  const taskCountElemment = document.getElementById("task-count");
  taskList.innerHTML = "";

  const data = filteredTasks || tasksDb;

  if (data.length === 0) {
    taskList.innerHTML = `<tr><td colspan="3">No task added yet</td></tr>`;
    taskCountElemment.textContent = "0";
    return;
  }
  // Render each task
  data.forEach((taskObj, index) => {
    taskList.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${taskObj.task}</td>
            <td>${taskObj.date}</td>
        </tr>
    `;
  });

  taskCountElemment.innerHTML = `
  <div class="flex flex-col items-center">
    <span class="text-4xl font-bold">${data.length}</span>
    <br>
    <span class="text-base font-medium">Task(s) Left</span>
  </div>
`;
}

function filterTasks() {
  const filterDate = document.getElementById("filter-date").value;
  if (filterDate === "") {
    renderTasks();
    return;
  }
  const filteredTasks = tasksDb.filter((tasks) => tasks.date === filterDate);
  renderTasks(filteredTasks);
}

function clearFilter() {
  document.getElementById("filter-date").value = "";
  renderTasks();
}

function clearAllTasks() {
  tasksDb = [];
  renderTasks();
}

function validateInput(task, date) {
  if (task.trim() === "" || date.trim() === "") {
    alert("Please fill in both the task and due date.");
    return false;
  }
  return true;
}
