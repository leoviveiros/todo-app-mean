require('dotenv').config();

const ApiServer = require('../api.js');
const MongoDB = require('../../mongodb/mongodb.js');
const request = require('supertest');

const Task = require('../../../modules/task/domain/entity/task.entity.js');
const TaskRepository = require('../../../modules/task/repository/task.repository.js')

describe('TaskAPI Test Suite', () => {
    
    let httpServer;
    let taskRepository;

    beforeAll(async () => {
        await MongoDB.connect();
        httpServer = ApiServer.start();
        taskRepository = new TaskRepository();
    });

    afterEach(async () => {
        await taskRepository.deleteAllTasks();
    });

    afterAll(async () => {
        await ApiServer.stop();
        await MongoDB.disconnect();
    });

    it('should create a task', async () => {
        const response = await request(httpServer)
            .post('/api/tasks/')
            .send({
                userId: '456789',
                name: 'task name',
                description: 'task description',
            })
            .set('Accept', 'application/json');
        
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();

        const task = response.body;
            
        expect(task.id).toBeDefined();
        expect(task.userId).toBe('456789');
        expect(task.name).toBe('task name');
        expect(task.description).toBe('task description');
        expect(task.checked).toBe(false);
        expect(task.createdAt).toBeDefined();
        expect(task.updatedAt).toBeDefined();

        const createdTask = await taskRepository.findTaskById(task.id);

        expect(createdTask).toBeDefined();
        expect(createdTask.id).toBe(task.id);
    });

    it('should delete a task', async () => {
        const id = '456789';
        const taskToDelete = new Task({
            id,
            userId: '123456',
            name: 'task name',
        });

        await taskRepository.createTask(taskToDelete);

        await request(httpServer)
            .delete(`/api/tasks/${id}`)
            .expect(200);
        
        const deletedTask = await taskRepository.findTaskById(id);

        expect(deletedTask).toBeNull();
    });

    it('should not throw when deleting a not found task', async () => {
        await request(httpServer)
            .delete(`/api/tasks/xyz`)
            .expect(200);
    });

});