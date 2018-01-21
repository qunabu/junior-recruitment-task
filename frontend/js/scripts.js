//funkcja tworząca tablicę zadań
async function tasks() {
    // const headers = new Headers({
    //     'Content-Type': 'text/plain'
    // });
    //  
    // const request = new Request({
    //     method: 'GET',
    //     headers: headers
    // });

    await fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        // .then(res=>console.log(res))
        .then(items=>Array.from(items.map(item=>({
            task: item.task,
            isdone: item.isdone
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
        if(task.isdone){
            var checked = 'checked';
            var imgTrash = '<img src="../assets/trash-done.png" alt="trash">';
        } else {
            var imgTrash = '<img src="../assets/trash.png" alt="trash done">';
        }
        return '<div class="input"><input type="checkbox"' + checked + '></div>' +
        '<span>' + (task.task || task) + '</span>' +
        imgTrash
    }

    //funkcja przełączająca zadanie między wykonanne/do wykonania
    function toggleTaskComplete(task){
        console.log('task: ' + task);

        // var liToDelete = task.closest('li');
        // task.closest('ul').removeChild(liToDelete);
        // console.log(liToDelete);

        // var taskToDelete = liToDelete.getElementsByTagName('span').item(0).textContent;
        // console.log(taskToDelete);


        var liToToggle = task.closest('li');
        var imgToToggle = liToToggle.querySelector('img');
        var taskToToggle = liToToggle.getElementsByTagName('span').item(0).textContent;
        console.log(taskToToggle);
        console.log(liToToggle);
        console.log(imgToToggle);

        let data = {};
        data.update = taskToToggle;

        if(liToToggle.className === "task"){
            liToToggle.classList.add('done');
            $(imgToToggle).attr("src", "img/trash-done.png");


            $.ajax({
                type: 'POST',
                headers: { "Content-Type": "application/json" },
                url: 'http://localhost:3000/update1',
                data: JSON.stringify(data),
                error: function (err) {
                    console.log(err);
                }
            });

        } else {
            liToToggle.classList.remove('done');
            $(imgToToggle).attr("src", "img/trash.png")

            $.ajax({
                type: 'POST',
                headers: { "Content-Type": "application/json" },
                url: 'http://localhost:3000/update2',
                data: JSON.stringify(data),
                error: function (err) {
                    console.log(err);
                }
            });

        }

        // liToToggle.className==="task"
        //     ? $(imgToToggle).attr("src", "img/trash-done.png")
        //     : $(imgToToggle).attr("src", "img/trash.png");
        //
        // liToToggle.className==="task"
        //     ? liToToggle.classList.add('done')
        //     : liToToggle.classList.remove('done');

    }

    //funkcja usuwająca zadanie
    function deleteTask(task){
        console.log('task: ' + task);
        
        var liToDelete = task.closest('li');
        // task.closest('ul').removeChild(liToDelete);
        console.log(liToDelete);

        var taskToDelete = liToDelete.getElementsByTagName('span').item(0).textContent;
        console.log(taskToDelete);

        // fetch('http://localhost:3000/delete', {
        // method: 'DELETE'
        //   })
        //   .then(task.closest('ul').removeChild(liToDelete))

        let data = {};
        data.delete = taskToDelete;

        $.ajax({
            type: 'POST',
            headers: { "Content-Type": "application/json" },
            url: 'http://localhost:3000/delete',
            data: JSON.stringify(data),
            success: task.closest('ul').removeChild(liToDelete),
            error: function (err) {
                console.log(err);
            }

        });
    }
 
    //funkcja wyświetlająca zadanie
    function showTask(task){
        console.log(task);
        var taskLi = document.createElement('li');
        // taskLi.setAttribute('id',task.id || '1');
        taskLi.classList.add('task');
        if(task.isdone){
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
                
                // const headers = new Headers({
                //     'Content-Type': 'application/json'
                // });
                //  
                // const request = new Request({
                //     "task": task,
                //     "isdone": 0,
                //     method: 'POST',
                //     headers: headers
                // });
                // const path = 'http://localhost:3000';
                // const parameter = '/tasks';
                //
                // // fetch(path + parameter, request)
                // //     .then(response=>console.log(response))
                // //     .catch(error=>console.log(error));
                //
                // fetch('http://localhost:3000/tasks',{
                //     method: 'post',
                //     // body: 'task=nowezadanie&isdone=0'
                //     task: JSON.stringify(task)
                // })


                let data = {};
                data.task = task;
                data.isdone = 0;

                $.ajax({
                    type: 'POST',
                    headers: { "Content-Type": "application/json" },
                    url: 'http://localhost:3000/tasks',
                    data: JSON.stringify(data),
                    error: function (err) {
                        console.log(err);
                    }
                });



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