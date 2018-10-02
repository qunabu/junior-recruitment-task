let tasks = [];
const taskList = document.querySelector(".tasks");
const addBtn = document.querySelector(".task-input-add");
let deleteBtns;
let tasksDone;

function getAllTasks() {
  const url = "https://qunabu.com/api/todos";
  fetch(url)
    .then(data => {
      return data.json();
    })
    .then(response => {
      tasks = response.todos;
      insertTaskToList();
      addDelteBtnToList();
      addCheckboxesToList();
    });
}
function createGottenTask(content) {
  const li = document.createElement("li");
  li.className = "row row-task";
  li.innerHTML = `
        <input type="checkbox" class="task-done-btn">
        <div class="task-content">${content}</div>
        <img src="./img/trash.png" alt="Task remove icon" class="task-remove">
    `;
  return li;
}
function insertTaskToList() {
  tasks.forEach(task => {
    taskList.appendChild(createGottenTask(task.Content));
  });
}
function addCheckboxesToList() {
  tasksDone = document.querySelectorAll(".task-done-btn");
  tasksDone.forEach((checkbox, key) => {
    checkbox.addEventListener("change", addClassTaskDone.bind(this, key));
  });
}
function addDelteBtnToList() {
  deleteBtns = document.querySelectorAll(".task-remove");
  deleteBtns.forEach((btn, key) => {
    btn.addEventListener("click", deleteTask.bind(this, key));
  });
}
function addNewTask() {
  let inputValue = document.querySelector(".task-input-field").value;
  if (inputValue != "") {
    document.querySelector(".alert").style.display = "none";
    fetch("https://qunabu.com/api/todos", {
      method: "POST",
      body: JSON.stringify({
        Content: `${inputValue}`,
        Finished: "0",
        Sort: "0"
      })
    })
      .then(data => {
        return data.json();
      })
      .then(response => {
        tasks.push({
          ID: Number(`${response.ID}`),
          Content: `${inputValue}`,
          Finished: "0",
          Sort: "0"
        });
      });
    taskList.appendChild(createGottenTask(inputValue));
    addDelteBtnToList();
    addCheckboxesToList();
    clearInputField();
  } else {
    document.querySelector(".alert").style.display = "flex";
  }
}
function clearInputField() {
  document.querySelector(".task-input-field").value = "";
}
const deleteTask = function(id, event) {
  const todosID = tasks[id].ID;
  const url = `https://qunabu.com/api/todo/${todosID} `;

  fetch(url, {
    method: "DELETE"
  })
    .then(data => {
      return data.json();
    })
    .then(response => {
      tasks.splice(todosID, 1);
      [...deleteBtns].splice(response.ID, 1);
    });
  event.target.parentNode.remove();
};

const addClassTaskDone = function(id, event) {
  event.target.nextSibling.nextSibling.classList.toggle("task-done");
};
document.addEventListener("DOMContentLoaded", getAllTasks);
addBtn.addEventListener("click", addNewTask);
