const ListTasksInputDtoValidator = require('./list-tasks-input-dto.validator.js');

class ListTasksUseCase {
    #taskGateway;

    /**
     * @param taskGateway - This is the gateway that will be used to communicate with the database.
     */
    constructor(taskGateway) {
        this.#taskGateway = taskGateway;
    }

    /**
     * @param {Object} inputDto 
     * @param {string} inputDto.userId
     * @returns {Promise<Task[]>} a promise that resolves to an array of Task objects.
     */
    execute(inputDto) {
        ListTasksInputDtoValidator.validate(inputDto);

        const { userId } = inputDto;
        
        return this.#taskGateway.listTasks(userId);
    }

}

module.exports = ListTasksUseCase;