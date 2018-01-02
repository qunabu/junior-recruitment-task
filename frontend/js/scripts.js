//Variables
var tasksContainer = document.querySelector('main section ul');
var newTaskForm = document.querySelector('.addTask form');
//tablica z zadaniami
var tasks = [
    'zadanie 1',
    'zadanie 2',
    'zadanie 3',
    'zadanie 4',
    'zadanie 5'
];

//funkcja przygotowująca kod HTML zadania
function prepareTaskHTML(task){
    return '<input type="checkbox">' +
    '<span>' + task + '</span>' +
    '<img src="../assets/trash.png" alt="trash">'
}

//funkcja przełanczająca zadanie między wykonanne/do wykonania
function toggleTaskComplete(task){

}

//funkcja usuwająca zadanie
function deleteTask(task){
    var liToDelete = task.closest('li');
    task.closest('ul').removeChild(liToDelete);
}

//funkcja wyświetlająca zadanie
function showTask(task){
    var taskLi = document.createElement('li');
    taskLi.classList.add('task');
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
        if(task){showTask(task)};
    });
}

//wyświetlanie zadań po załadowaniu DOM
//On DOM load
document.addEventListener('DOMContentLoaded',function(){
    showTasks();
    addNewTask()
});