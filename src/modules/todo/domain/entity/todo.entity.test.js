import test from 'node:test';
import { strict as assert } from 'node:assert';

import Todo from './todo.entity.js';

test('creates a todo instance with minimum props', (t) => {
    const todo = new Todo('id', 'user', 'Name');

    assert.ok(todo);
    assert.equal(todo.id, 'id');
    assert.equal(todo.userId, 'user');
    assert.equal(todo.name, 'Name');
    assert.equal(todo.description, undefined);
    assert.equal(todo.checked, false);
    assert.ok(todo.createdAt);
    assert.ok(todo.updatedAt);
});