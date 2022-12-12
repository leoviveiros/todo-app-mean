const ListUncheckedTasksInputDtoValidator = require('./list-unchecked-tasks-input-dto.validator.js');

describe('ListTasksInputDtoValidator Tests', () => {
    
    it('should validate a valid dto', () => {
        expect(() => ListUncheckedTasksInputDtoValidator.validate({ userId: '123' })).not.toThrow();
    });

    it('should not validate an invalid dto', () => {
        expect(() => ListUncheckedTasksInputDtoValidator.validate({})).toThrowError('"userId" is required');        
    });
    
});