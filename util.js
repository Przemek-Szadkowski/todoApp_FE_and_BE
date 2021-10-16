const { readFile, writeFile } = require('fs').promises;

const readTasksList = async (path) => {
    let tasks;
    try {
        const data = await readFile(path, 'utf-8')
        tasks = [...JSON.parse(data)];
    } catch(err) {
        if(err.code === "ENOENT") {
            tasks = []; //if there are no tasks in json file, set tasksList to empty array
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

module.exports = {
    readTasksList,
    wrtiteToTasksList,
};