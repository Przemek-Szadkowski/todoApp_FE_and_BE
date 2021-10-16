import { renderTasks, handleOptionsButtons } from "./helpers.js";
import { ul, taskInput, form, optionButtons } from "./elements.js";


//rendering tasks when page is loading - START

window.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/todo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    renderTasks(data, ul);   
});

//rendering tasks when page is loading - END

//form element logic - front

form.addEventListener('submit', async event => {
    event.preventDefault();
    
    const task = taskInput.value;
    
    if(task) {
        const response = await fetch('/todo/add', {
            method: 'POST',
            body: JSON.stringify({
                task,
                isFinished: false,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        renderTasks(data, ul);    
    } else {
        alert('Type your task!');
    }

    form.reset();
});

//eventlisteners on options buttons

optionButtons.forEach(btn => {
    btn.addEventListener('click', handleOptionsButtons);
})