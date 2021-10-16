import { ul } from "./elements.js";

async function handleCheck() {
    const isChecked = this.checked;
    const task = this.nextSibling.textContent;
    
    const response = await fetch('/todo/changecheck', {
        method: 'POST',
        body: JSON.stringify({
            task,
            isFinished: isChecked
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    renderTasks(data, ul); 
}

async function deleteTask() {
    const task = this.previousSibling.textContent;
    const response = await fetch('/todo/delete', {
        method: 'POST',
        body: JSON.stringify({
            task,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    renderTasks(data, ul); 
}

export async function handleOptionsButtons() {
    const sortType = this.dataset.sort;
    const response = await fetch(`/todo/${sortType}`, {
        method: 'POST',
        body: JSON.stringify({
            sort: sortType,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    renderTasks(data, ul); 
}

//main rendering function

export function renderTasks(array, listWrapperElement) {

    if(!array) return alert('These task has already exist!');

    listWrapperElement.innerHTML = ''; //clear previous rendered elements
    console.log(array);

    const tasksHtml = array.map(element => {
        return `<li><input type="checkbox" class="check" ${element.isFinished ? "checked" : ""}><span>${element.task}</span><button class="delete">X</button></li>`;
    }).join('');

    listWrapperElement.insertAdjacentHTML('afterbegin', tasksHtml);

    //eventlisteners on checkboxes in list of tasks

    const checkboxes = document.querySelectorAll('.check');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheck);
    });

    //eventlisteners on buttons in options

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', deleteTask);
    })

};