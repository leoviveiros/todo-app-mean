const UncheckTaskInputDtoValidator = require('./uncheck-task-input-dto.validator.js');

class UncheckTaskUseCase {
    #taskGateway;

    constructor(taskGateway) {
        this.#taskGateway = taskGateway;
    }

    async execute(inputDto) {
        UncheckTaskInputDtoValidator.validate(inputDto);

        const { id } = inputDto;

        const task = await this.#taskGateway.findTaskById(id);

        if (!task) {
            throw 'Task not found';
        }

        task.uncheck();

        await this.#taskGateway.updateTask(task.id, task);

        return task.getProperties();
    }

}

module.exports = UncheckTaskUseCase;