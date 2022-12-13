const UncheckTaskInputDtoValidator = require('./uncheck-task-input-dto.validator.js');

describe('UncheckTaskInputDtoValidator Tests', () => {

    it('should validate a valid dto', () => {
        expect(() => UncheckTaskInputDtoValidator.validate({
            id: '123'
        })).not.toThrow();
    });

    it('should not validate an invalid dto', () => {
        expect(() => UncheckTaskInputDtoValidator.validate({})).toThrowError('"id" is required');
    });

});