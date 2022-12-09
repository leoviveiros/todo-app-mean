const UpdateTaskInputDtoValidator = require('./update-task-input-dto.validator.js');

class UpdateTaskUseCase {
    #taskGateway;

    constructor(taskGateway) {
        this.#taskGateway = taskGateway;
    }

    async execute(inputDto) {
        UpdateTaskInputDtoValidator.validate(inputDto);

        const { id, userId, name, description } = inputDto;
        
        const task = await this.#taskGateway.findTaskById(id);

        if (!task || task.userId !== userId) {
            throw 'Task not found';
        }

        task.name = name;
        task.description = description;

        await this.#taskGateway.updateTask(task);

        return task.getProperties();
    }

}

module.exports = UpdateTaskUseCase;