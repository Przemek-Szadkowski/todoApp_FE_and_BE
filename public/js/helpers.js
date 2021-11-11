import { ul } from "./elements.js";

// *** function to handle checkboxes ***

async function handleCheck() {
    const isChecked = this.checked;
    const task = this.nextSibling.textContent;
    
    const response = await fetch('/todo', {
        method: 'PATCH',
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

// *** function to handle delete buttons in checkboxes ***

async function deleteTask() {
    const task = this.previousSibling.textContent;
    const response = await fetch('/todo', {
        method: 'DELETE',
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

// *** function to handle sort buttons ***

export async function handleOptionsButtons() {
    const sortType = this.dataset.sort;
    const response = await fetch(`/todo/${sortType}`, {
        method: 'PUT',
        body: JSON.stringify({
            sortType,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    renderTasks(data, ul); 
}

// *** main rendering function ***

export function renderTasks(array, listWrapperElement) {

    if(!array) return alert('These task has already exist!');

    // *** clear previous rendered elements ↓↓↓
    listWrapperElement.innerHTML = '';

    const tasksHtml = array.map(element => {
        return `<li><input type="checkbox" class="check" ${element.isFinished ? "checked" : ""}><span>${element.task}</span><button class="delete">X</button></li>`;
    }).join('');

    listWrapperElement.insertAdjacentHTML('afterbegin', tasksHtml);

    // *** eventlisteners on checkboxes in list of tasks ↓↓↓
    const checkboxes = document.querySelectorAll('.check');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheck);
    });

    // *** eventlisteners on buttons in options ↓↓↓
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', deleteTask);
    })

};

// *** function to get and return one single element ***

export function getElement(selector) {
    const element = document.querySelector(selector);

    if(!element) throw new Error(`Element not found! Element selector: ${selector}`);

    return element;
};

// *** function to get and return elements in groups ***

export function getElementsInParentsElement (selector, parentElement = document) {
    const elements = parentElement.querySelectorAll(selector);

    if(!elements) throw new Error(`Elements not found! Elements selector: ${selector}`);

    return elements;
};