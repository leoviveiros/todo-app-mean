const Task = require('./task.entity.js');

describe('Task Entity Tests', () => {

    it('should create a task instance with minimum props', () => {
        const task = new Task({
            userId: '456',
            name: 'task name'
        });

        expect(task).toBeDefined();
        expect(task.id).toBeDefined();
        expect(task.userId).toBe('456');
        expect(task.name).toBe('task name');
        expect(task.description).toBeUndefined();
        expect(task.checked).toBe(false);
        expect(task.createdAt).toBeDefined();
        expect(task.updatedAt).toBeDefined();
    });

    it('should create a task instance with all props', () => {
        const date = new Date(2022, 0, 1);
        const task = new Task({
            id: '123',
            userId: '456',
            name: 'task name',
            description: 'task description',
            checked: true,
            createdAt: date,
            updatedAt: date
        });

        expect(task).toBeDefined();
        expect(task.id).toBe('123');
        expect(task.userId).toBe('456');
        expect(task.name).toBe('task name');
        expect(task.description).toBe('task description');
        expect(task.checked).toBe(true);
        expect(task.createdAt).toBe(date);
        expect(task.updatedAt).toBe(date);
    });

    it('should create an invalid task', () => {
        expect(() => new Task()).toThrowError();
    });

    it('should check a task', () => {
        const date = new Date(2022, 0, 1);
        const task = new Task({
            id: '123',
            userId: '456',
            name: 'task name',
            description: 'task description',
            checked: false,
            createdAt: date,
            updatedAt: date
        });

        task.check();

        expect(task.checked).toBe(true);
        expect(task.updatedAt.getTime()).toBeGreaterThan(date.getTime());
    });

    it('should not check a checked task', () => {
        const task = new Task({
            userId: '456',
            name: 'task name',
            checked: true
        });

        expect(() => task.check()).toThrow('already checked');
    });

    it('should uncheck a task', () => {
        const date = new Date(2022, 0, 1);
        const task = new Task({
            id: '123',
            userId: '456',
            name: 'task name',
            description: 'task description',
            checked: true,
            createdAt: date,
            updatedAt: date
        });

        task.uncheck();

        expect(task.checked).toBe(false);
        expect(task.updatedAt.getTime()).toBeGreaterThan(date.getTime());
    });

    it('should not uncheck a unchecked task', () => {
        const task = new Task({
            userId: '456',
            name: 'task name',
            checked: false
        });

        expect(() => task.uncheck()).toThrow('already unchecked');
    });

});

