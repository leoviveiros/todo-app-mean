const Todo = require('./todo.entity.js');

describe('Todo Entity Tests', () => {

    it('creates a todo instance with minimum props', () => {
        const todo = new Todo('1', 'user', 'Name');

        expect(todo).toBeDefined();
        expect(todo.id).toBe('1');
        expect(todo.userId).toBe('user');
        expect(todo.name).toBe('Name');
        expect(todo.description).toBeUndefined();
        expect(todo.checked).toBe(false);
        expect(todo.createdAt).toBeDefined();
        expect(todo.updatedAt).toBeDefined();
    });

    it('creates a todo instance with all props', () => {
        const date = new Date(2022, 0, 1);
        const todo = new Todo('1', 'user', 'Name', 'Description', true, date, date);

        expect(todo).toBeDefined();
        expect(todo.id).toBe('1');
        expect(todo.userId).toBe('user');
        expect(todo.name).toBe('Name');
        expect(todo.description).toBe('Description');
        expect(todo.checked).toBe(true);
        expect(todo.createdAt).toBe(date);
        expect(todo.updatedAt).toBe(date);
    });

});

