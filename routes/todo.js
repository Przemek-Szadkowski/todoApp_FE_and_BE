const express = require('express');
const { readTasksList, wrtiteToTasksList } = require('../util');

const DATA_FILE_PATH = './data/tasks.json';

const todoRouter = express.Router();

todoRouter
    .post('/add', async (req, res) => {

        const taskJsonFromFrontEnd = req.body;
        
        let tasksList = await readTasksList(DATA_FILE_PATH);

         //if flag is true, task has already exist
        const flag = tasksList.find(task => task.task === taskJsonFromFrontEnd.task);

        if(!flag) {
            tasksList.push(taskJsonFromFrontEnd); //add task from frontend to array
            await wrtiteToTasksList(DATA_FILE_PATH, tasksList);
            res.json(tasksList);
        } else {
            //if task has already exist null is pass down to front and then in renderTask function there is no array element, so browser can show alert window
            res.json(null);
        };

    })
    .post('/changecheck', async (req, res) => {
        
        const taskJsonFromFrontEnd = req.body;
        
        let tasksList = await readTasksList(DATA_FILE_PATH);

        //finding element in list from file
        const index = tasksList.findIndex(task => task.task === taskJsonFromFrontEnd.task);
        
        tasksList[index] = taskJsonFromFrontEnd;
    
        await wrtiteToTasksList(DATA_FILE_PATH, tasksList);

        res.json(tasksList);
    })
    .post('/delete', async (req, res) => {
        const taskJsonFromFrontEnd = req.body;
        
        let tasksList = await readTasksList(DATA_FILE_PATH);

        //finding element in list from file
        const index = tasksList.findIndex(task => task.task === taskJsonFromFrontEnd.task);
        
        tasksList.splice(index, 1);
    
        await wrtiteToTasksList(DATA_FILE_PATH, tasksList);

        res.json(tasksList);
    })
    .post('/:sort', async (req, res) => {
        const sortType = req.body;
        
        let tasksList = await readTasksList(DATA_FILE_PATH);

        switch(sortType.sort) {
            case 'all':
                break;
            case 'active':
                tasksList = tasksList.filter(task => !task.isFinished);
                break;
            case 'completed':
                tasksList = tasksList.filter(task => task.isFinished);
                break;
            case 'clear':
                tasksList = tasksList.filter(task => !task.isFinished);
                await wrtiteToTasksList(DATA_FILE_PATH, tasksList);
                break;
            default:
                break;
        }

        res.json(tasksList);
    })
    .get('/', async(req, res) => {
        const tasksList = await readTasksList(DATA_FILE_PATH);
        res.json(tasksList);
    })

module.exports = {
    todoRouter,
}