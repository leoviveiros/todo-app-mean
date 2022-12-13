const Task = require('../../domain/entity/task.entity.js');
const CreateTaskInputDtoValidator = require('./create-task-input-dto.validator.js');

class CreateTaskUseCase {
    #taskGateway;

    constructor(taskGateway) {
        this.#taskGateway = taskGateway;
    }

    async execute(inputDto) {
        CreateTaskInputDtoValidator.validate(inputDto);

        const task = new Task(inputDto);

        await this.#taskGateway.createTask(task);

        return task.getProperties();
    }

}

module.exports = CreateTaskUseCase;