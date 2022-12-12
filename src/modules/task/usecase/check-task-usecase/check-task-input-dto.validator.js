const Joi = require('joi');

class CheckTaskInputDtoValidator {

    static schema = Joi.object({
        id: Joi.string().required(),
        userId: Joi.string().required()        
    });

    static validate(dto) {
        const { error } = this.schema.validate(dto);

        if (error) {
            throw `${error}`;
        }
    }

}

module.exports = CheckTaskInputDtoValidator;