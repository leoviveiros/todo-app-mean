const DeleteTaskInputDtoValidator = require('./delete-task-input-dto.validator.js');

describe('DeleteTaskInputDtoValidator Tests', () => {
    
    it('should validate a valid dto', () => {
        expect(() => DeleteTaskInputDtoValidator.validate({ id: '123' })).not.toThrow();
    });

    it('should not validate an invalid dto', () => {
        expect(() => DeleteTaskInputDtoValidator.validate({})).toThrowError('"id" is required');        
    });
    
});