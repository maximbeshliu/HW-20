const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('todo-add');
const todoList = document.getElementById('todolist');

addButton.addEventListener('click', addItemToList);
todoList.addEventListener('click', handleItemClick);


function handleItemClick(event) {
    const listItemRemoveBtn = document.querySelector(".remove");
    const listCheckboxStatus = document.querySelector('.tick');
    const listItem = document.querySelector('.todolist__item');

    if (event.target === listItemRemoveBtn) {
        listItem.remove();
    }
    if (listCheckboxStatus.checked) {
        listItem.classList.add('complete');
    } else {
        listItem.classList.remove('complete');
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
}