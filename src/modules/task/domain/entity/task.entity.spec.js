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

    it('should check a task', () => {
        const date = new Date(2022, 0, 1);
        const task = new Task('1', 'userID', 'Name', 'Task description', false, date, date);

        task.check();

        expect(task.checked).toBe(true);
        expect(task.updatedAt.getTime()).toBeGreaterThan(date.getTime());
    });

    it('should not check a checked task', () => {
        const task = new Task('1', 'userID', 'Name', 'Task description', true);

        expect(() => task.check()).toThrow('already checked');        
    });

    it('should uncheck a task', () => {
        const date = new Date(2022, 0, 1);
        const task = new Task('1', 'userID', 'Name', 'Task description', true, date, date);

        task.uncheck();

        expect(task.checked).toBe(false);
        expect(task.updatedAt.getTime()).toBeGreaterThan(date.getTime());
    });

    it('should not uncheck a unchecked task', () => {
        const task = new Task('1', 'userID', 'Name', 'Task description', false);

        expect(() => task.uncheck()).toThrow('already unchecked');
    });

});

