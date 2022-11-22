import Joi from 'joi';

export default class TodoValidator {

    static schema = Joi.object({
        id: Joi.string().required(),
        userId: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        checked: Joi.boolean().required(),
        createdAt: Joi.date().required(),
        updatedAt: Joi.date().required()
    });

    static validate(todo) {
        const { error } = this.schema.validate(todo);

        if (error) {
            throw `${error}`;
        }
    }

}