const Task = require('../../domain/entity/task.entity.js');
const AddTaskInputDtoValidator = require('./add-task-input-dto.validator.js');

class AddTaskUseCase {
    #taskGateway;

    constructor(taskGateway) {
        this.#taskGateway = taskGateway;
    }

    async execute(inputDto) {
        AddTaskInputDtoValidator.validate(inputDto);

        const {userId, name, description} = inputDto;

        const task = new Task(undefined, userId, name, description);

        await this.#taskGateway.addTask(task);

        return task.getProperties();
    }

}

module.exports = AddTaskUseCase;