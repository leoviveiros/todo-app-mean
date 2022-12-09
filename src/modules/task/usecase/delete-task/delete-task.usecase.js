const DeleteTaskInputDtoValidator = require('./delete-task-input-dto.validator.js');

class DeleteTaskUseCase {
    #taskGateway;

    constructor(taskGateway) {
        this.#taskGateway = taskGateway;
    }

    /**
     * This function deletes a task from the database.
     * @param {Object} inputDto - The input data transfer object.
     * @param {string} inputDto.id - The task id.
     */
    async execute(inputDto) {
        DeleteTaskInputDtoValidator.validate(inputDto);

        const { id } = inputDto;
        
        await this.#taskGateway.deleteTask(id);
    }

}

module.exports = DeleteTaskUseCase;