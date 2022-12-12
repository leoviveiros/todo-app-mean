const CheckTaskInputDtoValidator = require('./check-task-input-dto.validator.js');

describe('CheckTaskInputDtoValidator Tests', () => {
    
    it('should validate a valid dto', () => {
        expect(() => CheckTaskInputDtoValidator.validate({
            id: '123',
            userId: '456',            
        })).not.toThrow();
    });

    it('should not validate an invalid dto', () => {
        expect(() => CheckTaskInputDtoValidator.validate({})).toThrowError('"id" is required');
        expect(() => CheckTaskInputDtoValidator.validate({ id: '123' })).toThrowError('"userId" is required');
    });
    
});