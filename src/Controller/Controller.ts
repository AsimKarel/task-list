import express = require('express');
import {auth} from '../Middleware/Authentication'
import { Task } from '../Models/task';
var router = express.Router()

let tasks:Task[] = [];


router.get('/', function (req, res) {
    let response = {'message': 'Welcome'}
    res.send(response)
});


// GET: Returns list of all the tasks created
router.get('/tasks', auth, async function (req, res) {
    res.send(tasks)
});


// POST: Creates task sent throgh JSON body
router.post('/tasks', auth, async function (req, res) {
    let task = req.body as Task;
    if(!task.title) {
        return res.status(400).send("Title Missing");
    }
    if(!task.description) {
        return res.status(400).send("Description Missing");
    }
    else{
        task.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
        tasks.push(task)
        return res.send({'id': task.id})
    }
    
});

// GET: Returns task for which id is provided
router.get('/tasks/:id', auth, async function (req, res) {
    const taskid = req.params.id
    let _tasks = tasks.filter(task => taskid == task.id)
    if(_tasks.length > 0){
        return res.send(tasks.pop())
    } else{
        return res.status(404).send("No Record found");
    }
    
});

// PUT: Updates task for which id is provided with data provided in JSON body
router.put('/tasks/:id', auth, async function (req, res) {
    let task = req.body as Task;

    if(task.id != req.params.id) {
        return res.status(400).send("Incorrect Data");
    }
    if(tasks.findIndex(t=>t.id == task.id) < 0) {
        return res.status(404).send("No Record found");
    }
    if(!task.title) {
        return res.status(400).send("Title Missing");
    }
    if(!task.description) {
        return res.status(400).send("Description Missing");
    }

    tasks = tasks.map(_task => {
        if(task.id == _task.id){
            _task = task
        }
        return _task;
    })
    return res.send(task)
    
});

// DELETE: Deletes task for which id is provided in url
router.delete('/tasks/:id', auth, async function (req, res) {
    const taskid = req.params.id
    if(tasks.findIndex(t=>t.id == taskid) < 0) {
        return res.status(404).send("No Record found");
    }
    tasks = tasks.filter(task => taskid != task.id)
    return res.send({'status': "DELETED"})
});


module.exports = router;
