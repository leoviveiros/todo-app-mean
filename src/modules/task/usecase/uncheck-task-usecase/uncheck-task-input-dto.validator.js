const Joi = require('joi');

class UncheckTaskInputDtoValidator {

    static schema = Joi.object({
        id: Joi.string().required()
    });

    static validate(dto) {
        const { error } = this.schema.validate(dto);

        if (error) {
            throw `${error}`;
        }
    }

}

module.exports = UncheckTaskInputDtoValidator;