const ListTasksInputDtoValidator = require('./list-tasks-input-dto.validator.js');

describe('ListTasksInputDtoValidator Tests', () => {
    
    it('should validate a valid dto', () => {
        expect(() => ListTasksInputDtoValidator.validate({ userId: '123' })).not.toThrow();
    });

    it('should not validate an invalid dto', () => {
        expect(() => ListTasksInputDtoValidator.validate({})).toThrowError('"userId" is required');        
    });
    
});