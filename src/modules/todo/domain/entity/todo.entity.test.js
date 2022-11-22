import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import Todo from './todo.entity.js';

describe('Todo Entity Tests', () => {

    it('creates a todo instance with minimum props', () => {
        const todo = new Todo('1', 'user', 'Name');

        assert.ok(todo);
        assert.equal(todo.id, '1');
        assert.equal(todo.userId, 'user');
        assert.equal(todo.name, 'Name');
        assert.equal(todo.description, undefined);
        assert.equal(todo.checked, false);
        assert.ok(todo.createdAt);
        assert.ok(todo.updatedAt);
    });

    it('creates a todo instance with all props', () => {
        const date = new Date(2022, 0, 1);
        const todo = new Todo('1', 'user', 'Name', 'Description', true, date, date);

        assert.ok(todo);
        assert.equal(todo.id, '1');
        assert.equal(todo.userId, 'user');
        assert.equal(todo.name, 'Name');
        assert.equal(todo.description, 'Description');
        assert.equal(todo.checked, true);
        assert.equal(todo.createdAt, date);
        assert.equal(todo.updatedAt, date);
    });

});

