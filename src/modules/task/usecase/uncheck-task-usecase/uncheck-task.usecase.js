const UncheckTaskInputDtoValidator = require('./uncheck-task-input-dto.validator.js');

class UncheckTaskUseCase {
    #taskGateway;

    constructor(taskGateway) {
        this.#taskGateway = taskGateway;
    }

    async execute(inputDto) {
        UncheckTaskInputDtoValidator.validate(inputDto);

        const { id, userId } = inputDto;

        const task = await this.#taskGateway.findTaskById(id);

        if (!task || task.userId !== userId) {
            throw 'Task not found';
        }

        task.uncheck();

        await this.#taskGateway.updateTask(task.id, task);

        return task.getProperties();
    }

}

module.exports = UncheckTaskUseCase;