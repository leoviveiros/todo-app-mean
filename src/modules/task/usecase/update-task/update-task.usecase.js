const UpdateTaskInputDtoValidator = require('./update-task-input-dto.validator.js');

class UpdateTaskUseCase {
    #taskGateway;

    constructor(taskGateway) {
        this.#taskGateway = taskGateway;
    }

    /**
     * @param {Object} inputDto 
     * @param {string} inputDto.id
     * @param {string} inputDto.name
     * @param {string} inputDto.description
     * @returns {Promise<Task>}
     */
    async execute(inputDto) {
        UpdateTaskInputDtoValidator.validate(inputDto);

        const { id, name, description } = inputDto;
        
        const task = await this.#taskGateway.findTaskById(id);

        if (!task) {
            throw 'Task not found';
        }

        task.name = name;
        task.description = description;

        await this.#taskGateway.updateTask(task.id, task);

        return task.getProperties();
    }

}

module.exports = UpdateTaskUseCase;