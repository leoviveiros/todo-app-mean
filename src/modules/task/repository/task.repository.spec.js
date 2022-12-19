const mongo = require('../../../infra/db/mongodb/mongo-connection.js');
const TaskRepository = require('./task.repository.js');
const TaskModel = require('./task.model.js');
const Task = require('../domain/entity/task.entity.js');

describe('Task Repository Test Suite', () => {

    let taskRepository;

    beforeAll(async () => {
        await mongo.connect();
    });

    afterAll(async () => {
        await mongo.disconnect();
    });

    beforeEach(() => {
        taskRepository = new TaskRepository();
    });

    afterEach(async () => {
        await TaskModel.deleteMany({});
    });

    it('should create a new task', async () => {
        const task = new Task({
            userId: '456',
            name: 'test task',
            description: 'test description'
        });

        await taskRepository.createTask(task);

        const savedTask = await TaskModel.findById(task.id).exec();

        expect(savedTask).not.toBeNull();
        expect(savedTask.id).toEqual(task.id);
        expect(savedTask.userId).toEqual(task.userId);
        expect(savedTask.name).toEqual(task.name);
        expect(savedTask.description).toEqual(task.description);
        expect(savedTask.checked).toEqual(task.checked);
        expect(savedTask.createdAt.getTime()).toEqual(task.createdAt.getTime());
        expect(savedTask.updatedAt.getTime()).toEqual(task.updatedAt.getTime());
    });

    it('should delete a task', async () => {
        const task = await TaskModel.create({
            _id: '123',
            userId: '456',
            name: 'test task',
            checked: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        expect(task).toBeDefined();

        const deleteResult = await taskRepository.deleteTask(task._id);

        expect(deleteResult).toBeDefined();
        expect(deleteResult.deletedCount).toEqual(1);
    });

});
