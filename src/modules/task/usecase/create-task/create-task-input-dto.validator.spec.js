const CreateTaskInputDtoValidator = require('./create-task-input-dto.validator.js');

describe('CreateTaskInputDtoValidator Tests', () => {
    
    it('should validate a valid dto', () => {
        expect(() => CreateTaskInputDtoValidator.validate({
            userId: 'userId',
            name: 'task name',
            description: 'task description',
        })).not.toThrow();
    });

    it('should not validate an invalid dto', () => {
        expect(() => CreateTaskInputDtoValidator.validate({
            name: 'task name'
        })).toThrowError('"userId" is required');
    });
    
});