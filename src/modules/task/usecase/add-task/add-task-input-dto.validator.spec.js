const AddTaskInputDtoValidator = require('./add-task-input-dto.validator.js');

describe('AddTaskInputDtoValidator Tests', () => {
    
    it('should validate a valid dto', () => {
        expect(() => AddTaskInputDtoValidator.validate({
            userId: 'userId',
            name: 'task name',
            description: 'task description',
        })).not.toThrow();
    });

    it('should not validate an invalid dto', () => {
        expect(() => AddTaskInputDtoValidator.validate({
            name: 'task name'
        })).toThrowError('"userId" is required');
    });
    
});