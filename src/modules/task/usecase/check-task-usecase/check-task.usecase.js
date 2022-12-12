const CheckTaskInputDtoValidator = require('./check-task-input-dto.validator.js');

class CheckTaskUseCase {
    #taskGateway;

    constructor(taskGateway) {
        this.#taskGateway = taskGateway;
    }

    async execute(inputDto) {
        CheckTaskInputDtoValidator.validate(inputDto);

        const { id, userId } = inputDto;

        const task = await this.#taskGateway.findTaskById(id);

        if (!task || task.userId !== userId) {
            throw 'Task not found';
        }

        task.check();

        await this.#taskGateway.updateTask(task.id, task);

        return task.getProperties();
    }

}

module.exports = CheckTaskUseCase;