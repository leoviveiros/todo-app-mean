const TaskValidator = require('./task.validator.js');
const omit = require('lodash/omit');

describe('TaskValidator Tests', () => {

    let task;

    beforeEach(() => {
        task = {
            id: '1',
            userId: '123',
            name: 'Task name',
            description: 'Task description',
            checked: false,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
    })

    it('should create a valid task instance with minimum props', () => {
        expect(() => TaskValidator.validate(task)).not.toThrow();
        expect(() => TaskValidator.validate(omit(task, 'description'))).not.toThrow();
    });

    it('should create an invalid task', () => {
        expect(() => TaskValidator.validate({})).toThrowError('"id" is required');
        expect(() => TaskValidator.validate(omit(task, 'userId'))).toThrowError('"userId" is required');
        expect(() => TaskValidator.validate(omit(task, 'name'))).toThrowError('"name" is required');
        expect(() => TaskValidator.validate(omit(task, 'checked'))).toThrowError('"checked" is required');
        expect(() => TaskValidator.validate(omit(task, 'createdAt'))).toThrowError('"createdAt" is required');
        expect(() => TaskValidator.validate(omit(task, 'updatedAt'))).toThrowError('"updatedAt" is required');
    });

});