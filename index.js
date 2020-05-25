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

    let listCheckboxStatus = document.querySelectorAll('input[type="checkbox"]:checked');
    let tasks = JSON.parse(localStorage.getItem('todos'));
    let itemId = parseInt(event.target.closest('li').dataset.todoid);

    if (event.target.classList.contains("remove")) {
        event.target.closest('li').remove();
        totalTodos.innerText = "Total tasks = " + ((todoList.childNodes.length + +'1') - +'1');
        completedTodos.innerText = "  Completed tasks = " + ((listCheckboxStatus.length + +'1') - +'1');
        let newStorageArray = [];
        for (let i = 0; i < tasks.length; i++) {
            if (itemId !== tasks[i].id) {
                newStorageArray.push(tasks[i]);
            }
            localStorage.setItem('todos', JSON.stringify(newStorageArray));
        }

    }

    if (event.target.classList.contains("tick")) {
        event.target.closest('li').classList.toggle('complete');
        completedTodos.innerText = "  Completed tasks = " + ((listCheckboxStatus.length + +'1') - +'1');
        let newStorageArray = [];
        for (let i = 0; i < tasks.length; i++) {
            if (itemId === tasks[i].id) {
                tasks[i].status = !tasks[i].status;
            }
            newStorageArray.push(tasks[i]);

        }
        localStorage.setItem('todos', JSON.stringify(newStorageArray));
    }
}


function addItemToList(text, status = false, id) {
    if (!todoInput.value && !text) return;

    let listItem = document.createElement('li');
    const listItemRemoveBtn = document.createElement('button');
    const listCheckboxStatus = document.createElement('input');
    const listTextSpan = document.createElement('span');



    listItem.classList.add('todolist__item');

    listItemRemoveBtn.innerText = 'x';
    listItemRemoveBtn.setAttribute('class', 'remove');
    listCheckboxStatus.type = 'checkbox';
    listCheckboxStatus.checked = status;
    status ? listItem.classList.add('complete') : null;
    listCheckboxStatus.setAttribute('class', 'tick');
    itemId = id;
    listItem.setAttribute('data-todoid', id);

    listItem.append(listCheckboxStatus);
    listItem.append(listTextSpan);
    listItem.append(listItemRemoveBtn);





    let tasks = JSON.parse(localStorage.getItem('todos'));
    tasks == null ? tasks = [] : tasks;


    if (todoInput.value) {
        let id = tasks.length;
        listTextSpan.innerText = todoInput.value;
        tasks.push({
            id: id,
            text: todoInput.value,
            status: false
        });
        localStorage.setItem('todos', JSON.stringify(tasks));
        itemId = id;
    } else { listTextSpan.innerText = text; }


    todoInput.value = '';
    todoList.append(listItem);
}

let tasks = JSON.parse(localStorage.getItem('todos'));


for (let i = 0; i < tasks.length; i++) {
    addItemToList(tasks[i].text, tasks[i].status, tasks[i].id);
}
