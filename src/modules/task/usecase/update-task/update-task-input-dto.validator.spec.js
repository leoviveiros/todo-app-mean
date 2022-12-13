const UpdateTaskInputDtoValidator = require('./update-task-input-dto.validator.js');

describe('UpdateTaskInputDtoValidator Tests', () => {

    it('should validate a valid dto', () => {
        expect(() => UpdateTaskInputDtoValidator.validate({
            id: '123',
            name: 'task name',
            description: 'task description',
        })).not.toThrow();
    });

    it('should not validate an invalid dto', () => {
        expect(() => UpdateTaskInputDtoValidator.validate({})).toThrowError('"id" is required');
        expect(() => UpdateTaskInputDtoValidator.validate({ id: '123' })).toThrowError('"name" is required');
    });

});