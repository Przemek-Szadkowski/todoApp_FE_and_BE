const express = require('express');
const { readTasksList, wrtiteToTasksList, findIndexOfTheSameTask } = require('../util');

const DATA_FILE_PATH = './data/tasks.json';

const todoRouter = express.Router();

todoRouter
    .get('/', async(req, res) => {
        const tasksList = await readTasksList(DATA_FILE_PATH);
        res.json(tasksList);
    })
    .post('/', async (req, res) => {

        const taskJsonFromFrontEnd = req.body;
        let tasksList = await readTasksList(DATA_FILE_PATH);
        const index = findIndexOfTheSameTask(tasksList, taskJsonFromFrontEnd);
        
        // *** if index is not -1, task has already exist ↓↓↓
        if(index === -1) {
            // *** add task from frontend to array ↓↓↓
            tasksList.push(taskJsonFromFrontEnd);
            await wrtiteToTasksList(DATA_FILE_PATH, tasksList);
            res.json(tasksList);
        } else {
            // *** if task has already exist null is pass down to front
            // and then in renderTask function there is no array element, so browser can show alert window ***
            res.json(null);
        };

    })
    .patch('/', async (req, res) => {
        
        // zrobić funkcję któa zwróci obiekt z trzema polami, a nazwa funckji to jakieś handleData???
        const taskJsonFromFrontEnd = req.body;
        let tasksList = await readTasksList(DATA_FILE_PATH);
        const index = findIndexOfTheSameTask(tasksList, taskJsonFromFrontEnd);
        
        tasksList[index] = taskJsonFromFrontEnd;
    
        await wrtiteToTasksList(DATA_FILE_PATH, tasksList);

        res.json(tasksList);
    })
    .delete('/', async (req, res) => {

        const taskJsonFromFrontEnd = req.body;
        let tasksList = await readTasksList(DATA_FILE_PATH);
        const index = findIndexOfTheSameTask(tasksList, taskJsonFromFrontEnd);
        
        tasksList.splice(index, 1);
    
        await wrtiteToTasksList(DATA_FILE_PATH, tasksList);

        res.json(tasksList);
    })
    .put('/:sortType', async (req, res) => {
        const sortType = req.body.sortType;
        
        let tasksList = await readTasksList(DATA_FILE_PATH);

        switch(sortType) {
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
    });

module.exports = {
    todoRouter,
}