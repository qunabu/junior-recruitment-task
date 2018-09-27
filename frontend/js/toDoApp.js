class ToDoApp {
  constructor() {
    this.url = 'http://localhost:3200/';
    this.init();
    this.getNewTask();
    this.getTasks();
  }

  init() {
    this.addTaskBtn = document.getElementsByClassName('add-task')[0];
    this.newTaskInput = document.getElementById('new-task-content');
    this.tasksList = document.getElementsByClassName('tasks-list')[0];
    this.errorAlert = document.getElementsByClassName('error')[0];
  }

  getTasks() {
    fetch(this.url)
      .then(resp => resp.json())
      .then(tasks => {
        console.log(tasks);
        this.tasksList.innerHTML = '';
        tasks.map((task, index) => {
          this.tasksList.innerHTML += this.drawTask(task);
        })
        this.isDone = document.querySelectorAll('input[type=checkbox]');
        this.toggleTaskStatus(this.isDone);
      })
      .catch(error => console.error('Error:', error));
  }

  toggleTaskStatus(checkboxList) {
    let newTaskStatus = {
      finished: null
    }
    checkboxList.forEach(taskStatus => {
      taskStatus.addEventListener('change', (e) => {
        let taskStatus = e.target.checked
        if (taskStatus) {
          newTaskStatus.finished = true;
        } else {
          newTaskStatus.finished = false;
        }
        fetch(`${this.url}updateTask/${e.target.id}`, {
          method: 'PUT',
          body: JSON.stringify(newTaskStatus),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(res => {
            console.log('Success:', JSON.stringify(res))
            this.getTasks();
          })
          .catch(error => console.error('Error:', error));
      })
    })
  }

  deleteTask(taskNode) {
    fetch(this.url + `deleteTask/${taskNode.id}`, {
      method: 'delete'
    })
      .then(res => res.json())
      .then(res => {
        console.log('Success:', res.message + JSON.stringify(res.newTask));
        this.getTasks();
      })
      .catch(error => console.error('Error:', error));
  }

  createTask(taskContent) {
    fetch(this.url + `newTask/${taskContent}`, {
      method: 'POST',
      body: taskContent
    })
      .then(res => res.json()
        .then(res => {
          if(res.err) {
            console.log('ERROR:' + res.err);
          } else {
            console.log('SUCCESS Task added: ' + JSON.stringify(res));
            this.getTasks();
          }
          
        })
      )
      .catch(error => console.log('Error:', error));
  }

  drawTask(task) {
    let taskHTML = `
      <div class="task">
      <div class="box">
        ${this.drawTaskStatus(task)}
      </div>
      <div class="content">
        ${this.drawTaskContent(task)}
      </div>
      <div id="${task._id}" onclick="toDoApp.deleteTask(this)" class="delete">${this.drawTaskTrashIcon(task)}</div>
      </div>
    `
    return taskHTML;
  }

  drawTaskStatus(task) {
    if (task.finished) {
      return `<input type="checkbox" name="isComplete" id="${task._id}" checked>`;
    } else {
      return `<input type="checkbox" name="isComplete" id="${task._id}">`;
    }
  }

  drawTaskContent(task) {
    if (task.finished) {
      return `<p class="finished">${task.content}</p>`;
    } else {
      return `<p>${task.content}</p>`;
    }
  }

  drawTaskTrashIcon(task) {
    if (task.finished) {
      return `<img class="finished" src="./img/trash.png" alt="" srcset="">`
    } else {
      return `<img src="./img/trash.png" alt="" srcset="">`
    }
  }

  getNewTask() {
    this.addTaskBtn.addEventListener('click', () => {
      const newTaskContent = this.newTaskInput.value;
      if (this.validateNewTaskContent(newTaskContent)) {
        this.createTask(newTaskContent);
        this.newTaskInput.value = '';
      }
    });
  }

  validateNewTaskContent(newTaskContent) {
    newTaskContent = newTaskContent.trim();
    if (newTaskContent.length < 3) {
      this.errorAlert.style.display = 'block';
      setTimeout(() => {
        this.errorAlert.style.display = 'none';
      }, 3000);
      return false;
    } else {
      return true;
    }
  }
}
const toDoApp = new ToDoApp();