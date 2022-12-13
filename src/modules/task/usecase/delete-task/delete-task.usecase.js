const DeleteTaskInputDtoValidator = require('./delete-task-input-dto.validator.js');

class DeleteTaskUseCase {
    #taskGateway;

    constructor(taskGateway) {
        this.#taskGateway = taskGateway;
    }

    /**
     * @param {Object} inputDto - The input data transfer object.
     * @param {string} inputDto.id - The task id.
     * @returns {Promise<void>}
     */
    async execute(inputDto) {
        DeleteTaskInputDtoValidator.validate(inputDto);

        const { id } = inputDto;
        
        await this.#taskGateway.deleteTask(id);
    }

}

module.exports = DeleteTaskUseCase;