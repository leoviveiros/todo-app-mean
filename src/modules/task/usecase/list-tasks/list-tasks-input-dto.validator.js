const Joi = require('joi');

class ListTasksInputDtoValidator {

    static schema = Joi.object({
        userId: Joi.string().required(),        
    });

    static validate(dto) {
        const { error } = this.schema.validate(dto);

        if (error) {
            throw `${error}`;
        }
    }

}

module.exports = ListTasksInputDtoValidator;