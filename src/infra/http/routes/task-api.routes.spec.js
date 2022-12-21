require('dotenv').config();

const ApiServer = require('../api.js');
const MongoDB = require('../../mongodb/mongodb.js');
const request = require('supertest');

describe('TaskAPI Test Suite', () => {
    
    let httpServer;

    beforeAll(async () => {
        await MongoDB.connect();
        httpServer = ApiServer.start();
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
    });

});