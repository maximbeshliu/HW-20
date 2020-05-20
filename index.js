const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('todo-add');
const todoList = document.getElementById('todolist');
const characterCount = document.getElementById("counter");
const totalTodos = document.getElementById('total-todos');
const completedTodos = document.getElementById('completed-todos');


addButton.addEventListener('click', addItemToList);
addButton.addEventListener('click', function () {
    if (event.target === addButton) {
        characterCount.innerText = '';
        totalTodos.innerText = "Total tasks = " + todoList.childNodes.length;
    }
});
todoList.addEventListener('click', handleItemClick);
todoInput.addEventListener('keydown', handleInputBarCharacter);


function handleInputBarCharacter(event) {
    characterCount.innerText = "Character count = " + (event.target.value.length + +'1');

    if (event.target.value.length === 0) {
        characterCount.innerText = '';
        return;
    }
}

function handleItemClick(event) {
    let listItem = event.target.closest('li');

    let listCheckboxStatus = document.querySelectorAll('input[type="checkbox"]:checked');

    if (event.target.classList.contains("remove")) {
        listItem.remove();
        totalTodos.innerText = "Total tasks = " + ((todoList.childNodes.length + +'1') - +'1');
        completedTodos.innerText = " vs Completed tasks = " + ((listCheckboxStatus.length + +'1') - +'1');
        ////Remove from localstorage 
        let tasks = JSON.parse(localStorage.getItem('todos'));
        for (let i = 0; i < tasks.length; i++) {
            tasks.splice(tasks[i].id, 1);
        }
        localStorage.setItem('todos', JSON.stringify(tasks));
    }

    if (event.target.classList.contains("tick")) {
        listItem.classList.toggle('complete');
        completedTodos.innerText = " vs Completed tasks = " + ((listCheckboxStatus.length + +'1') - +'1');
        return;
    }
}


function addItemToList(text, status = false) {
    if (!todoInput.value && !text) return;

    const listItem = document.createElement('li');
    const listItemRemoveBtn = document.createElement('button');
    const listCheckboxStatus = document.createElement('input');
    const listTextSpan = document.createElement('span');



    listItem.classList.add('todolist__item');

    listItemRemoveBtn.innerText = 'x';
    listItemRemoveBtn.setAttribute('class', 'remove');
    if (todoInput.value) {
        listTextSpan.innerText = todoInput.value;
    } else { listTextSpan.innerText = text; }
    listCheckboxStatus.type = 'checkbox';
    listCheckboxStatus.checked = status;
    listCheckboxStatus.setAttribute('class', 'tick');

    listItem.append(listCheckboxStatus);
    listItem.append(listTextSpan);
    listItem.append(listItemRemoveBtn);




    let tasks = JSON.parse(localStorage.getItem('todos'));
    tasks == null ? tasks = [] : tasks;
    tasks.push({
        id: tasks.length,
        text: todoInput.value,
        status: false
    });
    localStorage.setItem('todos', JSON.stringify(tasks));


    todoInput.value = '';
    todoList.append(listItem);
}

let tasks = JSON.parse(localStorage.getItem('todos'));


for (let i = 0; i < tasks.length; i++) {
    addItemToList(tasks[i].text, tasks[i].status);
}
