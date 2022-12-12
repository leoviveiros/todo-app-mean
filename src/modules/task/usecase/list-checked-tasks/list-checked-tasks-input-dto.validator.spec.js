const ListCheckedTasksInputDtoValidator = require('./list-checked-tasks-input-dto.validator.js');

describe('ListCheckedTasksInputDtoValidator Tests', () => {
    
    it('should validate a valid dto', () => {
        expect(() => ListCheckedTasksInputDtoValidator.validate({ userId: '123' })).not.toThrow();
    });

    it('should not validate an invalid dto', () => {
        expect(() => ListCheckedTasksInputDtoValidator.validate({})).toThrowError('"userId" is required');        
    });
    
});