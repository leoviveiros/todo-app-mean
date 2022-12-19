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

    it('should update a task', async () => {
        await TaskModel.create({
            _id: '123',
            userId: '456',
            name: 'test task',
            checked: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const task = new Task({
            id: '123',
            userId: '456',
            name: 'updated task',
            description: 'updated description'
        });

        const updateResult = await taskRepository.updateTask(task.id, task);

        expect(updateResult).toBeDefined();
        expect(updateResult.modifiedCount).toBe(1);
        expect(updateResult.upsertedCount).toBe(0);

        const updatedTask = await TaskModel.findById(task.id).exec();

        expect(updatedTask).toBeDefined();
        expect(updatedTask._id).toEqual(task.id);
        expect(updatedTask.name).toEqual(task.name);
        expect(updatedTask.description).toEqual(task.description);
    });

    it('should find task by id', async () => {
        await TaskModel.create({
            _id: '123',
            userId: '456',
            name: 'test task',
            checked: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const task = await taskRepository.findTaskById('123');

        expect(task).toBeDefined();
        expect(task instanceof Task).toEqual(true);
        expect(task.id).toEqual('123');
        expect(task.userId).toEqual('456');
        expect(task.name).toEqual('test task');
        expect(task.checked).toEqual(false);
    });

    it('should return null when trying to find an inexistent task', async () => {
        const task = await taskRepository.findTaskById('xyz');

        expect(task).toBeNull();
    });

    it('should list unchecked tasks', async () => {
        await TaskModel.create([
            {
                _id: '1',
                userId: '456',
                name: 'task 1',
                checked: false,
                createdAt: new Date(2022, 11, 19),
                updatedAt: new Date()
            },
            {
                _id: '2',
                userId: '456',
                name: 'task 2',
                checked: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: '3',
                userId: '456',
                name: 'task 3',
                checked: false,
                createdAt: new Date(2022, 11, 20),
                updatedAt: new Date()
            },
            {
                _id: '4',
                userId: '789',
                name: 'task xyx',
                checked: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);

        const tasks = await taskRepository.listUncheckedTasks('456');

        expect(tasks).toBeDefined();
        expect(tasks.length).toEqual(2);

        expect(tasks[0] instanceof Task).toBe(true);
        expect(tasks[0].id).toEqual('3');
        expect(tasks[0].userId).toEqual('456');

        expect(tasks[1] instanceof Task).toBe(true);
        expect(tasks[1].id).toEqual('1');
        expect(tasks[1].userId).toEqual('456');
    });

    it('should list checked tasks', async () => {
        await TaskModel.create([
            {
                _id: '1',
                userId: '456',
                name: 'task 1',
                checked: true,
                createdAt: new Date(2022, 11, 19),
                updatedAt: new Date()
            },
            {
                _id: '2',
                userId: '456',
                name: 'task 2',
                checked: true,
                createdAt: new Date(2022, 11, 20),
                updatedAt: new Date()
            },
            {
                _id: '3',
                userId: '456',
                name: 'task 3',
                checked: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: '4',
                userId: '789',
                name: 'task xyx',
                checked: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);

        const tasks = await taskRepository.listCheckedTasks('456');

        expect(tasks).toBeDefined();
        expect(tasks.length).toEqual(2);

        expect(tasks[0] instanceof Task).toBe(true);
        expect(tasks[0].id).toEqual('2');
        expect(tasks[0].userId).toEqual('456');

        expect(tasks[1] instanceof Task).toBe(true);
        expect(tasks[1].id).toEqual('1');
        expect(tasks[1].userId).toEqual('456');
    });

    it('should return an empty array when listing tasks', async () => {
        const tasks = await taskRepository.listCheckedTasks('xyz');

        expect(tasks).toBeDefined();
        expect(tasks.length).toEqual(0);
    });

});
