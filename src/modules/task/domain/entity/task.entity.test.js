const Task = require('./task.entity.js');

describe('Task Entity Tests', () => {

    it('should create a task instance with minimum props', () => {
        const task = new Task(undefined, 'userID', 'Name');

        expect(task).toBeDefined();
        expect(task.id).toBeDefined();
        expect(task.userId).toBe('userID');
        expect(task.name).toBe('Name');
        expect(task.description).toBeUndefined();
        expect(task.checked).toBe(false);
        expect(task.createdAt).toBeDefined();
        expect(task.updatedAt).toBeDefined();
    });

    it('should create a task instance with all props', () => {
        const date = new Date(2022, 0, 1);
        const task = new Task('1', 'userID', 'Name', 'Task description', true, date, date);

        expect(task).toBeDefined();
        expect(task.id).toBe('1');
        expect(task.userId).toBe('userID');
        expect(task.name).toBe('Name');
        expect(task.description).toBe('Task description');
        expect(task.checked).toBe(true);
        expect(task.createdAt).toBe(date);
        expect(task.updatedAt).toBe(date);
    });

    it('should create an invalid task', () => {
        expect(() => new Task()).toThrowError();
    });

});

