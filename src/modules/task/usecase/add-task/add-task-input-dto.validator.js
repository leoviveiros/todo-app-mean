const Joi = require('joi');

class AddTaskInputDtoValidator {

    static schema = Joi.object({
        userId: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string()
    });

    static validate(dto) {
        const { error } = this.schema.validate(dto);

        if (error) {
            throw `${error}`;
        }
    }

}

module.exports = AddTaskInputDtoValidator;