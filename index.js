const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('todo-add');
const todoList = document.getElementById('todolist');
const characterCount = document.getElementById("counter");
const totalTodos = document.getElementById('total-todos');
const completedTodos = document.getElementById('completed-todos');


addButton.addEventListener('click', addItemToList);
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
        completedTodos.innerText = " vs Completed tasks = " + (((listCheckboxStatus.length + +'1') - +'1') - +'1');
    }

    if (event.target.classList.contains("tick")) {
        listItem.classList.toggle('complete');
        completedTodos.innerText = " vs Completed tasks = " + ((listCheckboxStatus.length + +'1') - +'1');
        return;
    }
}


function addItemToList() {
    if (!todoInput.value) return;

    const listItem = document.createElement('li');
    const listItemRemoveBtn = document.createElement('button');
    const listCheckboxStatus = document.createElement('input');
    const listTextSpan = document.createElement('span');

    listItem.classList.add('todolist__item');

    listItemRemoveBtn.innerText = 'x';
    listItemRemoveBtn.setAttribute('class', 'remove');
    listTextSpan.innerText = todoInput.value;
    listCheckboxStatus.type = 'checkbox';
    listCheckboxStatus.setAttribute('class', 'tick');

    listItem.append(listCheckboxStatus);
    listItem.append(listTextSpan);
    listItem.append(listItemRemoveBtn);

    todoInput.value = '';
    todoList.append(listItem);

    if (event.target === addButton) {
        characterCount.innerText = '';
        totalTodos.innerText = "Total tasks = " + todoList.childNodes.length;
        return;
    }
}



