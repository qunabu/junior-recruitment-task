//funkcja tworząca tablicę zadań
async function tasks() {
    const headers = new Headers({ 
        'Content-Type': 'text/plain' 
    }); 
      
    const request = new Request({ 
        method: 'GET',  
        headers: headers 
    }); 

    await fetch('https://todo-simple-api.herokuapp.com/todos?page=1&page_size=10', request) 
        .then(response => response.json())
        .then(json=>json.data)
        .then(items=>Array.from(items.map(item=>({
            id: item.id,
            title: item.title,
            isComplete: item.isComplete
        }))))
        .then(arrayTasks=>{
            console.log(arrayTasks);
            return tasks = arrayTasks;
            })
        .catch(error=>console.log(error)); 
    };

    //Variables
    var tasksContainer = document.querySelector('main section ul');
    var newTaskForm = document.querySelector('.addTask form');

    //funkcja przygotowująca kod HTML zadania
    function prepareTaskHTML(task){
        // var checked = '';
        if(task.isComplete){
            var checked = 'checked';
            var imgTrash = '<img src="../assets/trash-done.png" alt="trash">';
        } else {
            var imgTrash = '<img src="../assets/trash.png" alt="trash done">';
        }
        return '<div class="input"><input type="checkbox"' + checked + '></div>' +
        '<span>' + (task.title || task) + '</span>' +
        imgTrash
    }

    //funkcja przełączająca zadanie między wykonanne/do wykonania
    function toggleTaskComplete(task){
        // console.log(task);
        // var inputToToggle = task.setAttribute('checked', 'checked');
        var liToToggle = task.closest('li');
        var imgToToggle = task.closest('img');
        
        liToToggle.classList.add('done');
        console.log(imgToToggle);
    }

    //funkcja usuwająca zadanie
    function deleteTask(task){
        console.log(task);
        
        var liToDelete = task.closest('li');
        // task.closest('ul').removeChild(liToDelete);

        var idTaskToDelete = liToDelete.id;
        // console.log(idTaskToDelete);
        fetch('https://todo-simple-api.herokuapp.com/todos/' + idTaskToDelete, {
        method: 'DELETE'
      })
      .then(task.closest('ul').removeChild(liToDelete))
    }
 
    //funkcja wyświetlająca zadanie
    function showTask(task){
        console.log(task);
        var taskLi = document.createElement('li');
        taskLi.setAttribute('id',task.id || '1');
        taskLi.classList.add('task');
        if(task.isComplete){
            taskLi.classList.add('done');
        }

        taskLi.innerHTML = prepareTaskHTML(task);

        //Event toggle
        var toggleCompleteCheckbox = taskLi.querySelector('input[type=checkbox]');
        toggleCompleteCheckbox.addEventListener('click', function(){
            toggleTaskComplete(this);
        });
        
        //Event delete
        var deleteButton = taskLi.querySelector('img');
        deleteButton.addEventListener('click', function(){
            deleteTask(this);
        });

        //Add task to DOM
        tasksContainer.appendChild(taskLi);
    }

    //funkcja wyświetlająca listę zadań
    function showTasks(){
        tasks.forEach(function(task){
            showTask(task);
        })
    }

    //Add new task events
    //Dodawanie nowego zadania
    function addNewTask(){

        //On submit
        newTaskForm.addEventListener('submit', function(event){
            event.preventDefault();
            var task = this.querySelector('input[type=text]').value;

            if(task){
                
                const headers = new Headers({ 
                    'Content-Type': 'text/plain' 
                }); 
                  
                const request = new Request({ 
                    "title": task,
                    "description": "description",
                    "isComplete": false,  
                    method: 'POST',
                    headers: headers 
                }); 
                const path = 'https://todo-simple-api.herokuapp.com';
                const parameter = ':/todos';
            
                fetch(path + parameter, request) 
                    .then(response=>console.log(response))
                    .catch(error=>console.log(error));

                showTask(task)
            };
        });
    }

    //wyświetlanie zadań po załadowaniu DOM
    //On DOM load
    document.addEventListener('DOMContentLoaded',async function(){
        await tasks();
        showTasks();
        addNewTask()
    });