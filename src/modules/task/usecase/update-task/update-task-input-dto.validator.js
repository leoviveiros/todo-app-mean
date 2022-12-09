const Joi = require('joi');

class UpdateTaskInputDtoValidator {

    static schema = Joi.object({
        id: Joi.string().required(),
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

module.exports = UpdateTaskInputDtoValidator;