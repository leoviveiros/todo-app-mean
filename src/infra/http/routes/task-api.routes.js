const { Router } = require('express');
const express = require('express');
const router = express.Router();
const debug = require('debug')('todo:task-api');
const taskUsecases = require('../../../modules/task/factory/task-usecases.factory.js');

router.get('/', (req, res) => {
    debug('GET %s', req.originalUrl);
    res.send('tasks');
})

/**
 * Creates a task
 */
router.post('/', async (req, res, next) => {
    try {
        const createTaskUsecase = taskUsecases.createTaskFactory();
        const body = req.body;

        const task = await createTaskUsecase.execute({
            userId: body.userId,
            name: body.name,
            description: body.description,
        });
    
        res.json(task);
    } catch (error) {
        next(error);
    }
});

/**
 * Deletes a task
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const deleteTaskUsecase = taskUsecases.deleteTaskFactory();
        const { id } = req.params;

        await deleteTaskUsecase.execute({ id });
        
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;