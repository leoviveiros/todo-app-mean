const ListUncheckedTasksInputDtoValidator = require('./list-unchecked-tasks-input-dto.validator.js');

class ListUncheckedTasksUseCase {
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
        ListUncheckedTasksInputDtoValidator.validate(inputDto);

        const { userId } = inputDto;
        
        return this.#taskGateway.listUncheckedTasks(userId);
    }

}

module.exports = ListUncheckedTasksUseCase;