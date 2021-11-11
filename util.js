const { readFile, writeFile } = require('fs').promises;

const readTasksList = async (path) => {
    let tasks;
    try {
        const data = await readFile(path, 'utf-8')
        tasks = [...JSON.parse(data)];
    } catch(err) {
        if(err.code === "ENOENT") {
            // *** if there are no tasks in json file, set tasksList to empty array ↓↓↓
            tasks = [];
        } else {
            console.log(err);
        }
    }
    return tasks;
};

const wrtiteToTasksList = async (path, list) => {
    try {
        await writeFile(path, JSON.stringify(list));
    } catch(err) {
        console.log(err);
    }
};

const findIndexOfTheSameTask = (tasksList, taskJsonFromFrontEnd) => {
    return tasksList.findIndex(task => task.task === taskJsonFromFrontEnd.task);
};

module.exports = {
    readTasksList,
    wrtiteToTasksList,
    findIndexOfTheSameTask,
};