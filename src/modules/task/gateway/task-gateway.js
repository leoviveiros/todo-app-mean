class NotImplementedException extends Error {
    constructor() {
        super('Not implemented');
    }
}

class TaskGateway {

    /**
     * @param {Task} task - The task to create.
     * @returns {Promise<Task>} - The created task
     */
    createTask(task) {
        throw new NotImplementedException();
    }

    /**
     * @param {string} taskId - The id of the task to delete.
     * @returns {Promise<void>}
     */
    deleteTask(taskId) {
        throw new NotImplementedException();
    }

    /**
     * @param {string} taskId - The id of the task to update.
     * @param {Task} task - The task to update.
     * @returns {Promise<Task>} The updated task
     */
    updateTask(taskId, task) {
        throw new NotImplementedException();
    }

    /**
     * @param {string} taskId - The id of the task to find.
     * @returns {Promise<Task | undefined>} 
     */
    findTaskById(taskId) {
        throw new NotImplementedException();
    }

    /**
     * @param {string} userId
     * @returns {Promise<Task[]>} a promise that resolves to an array of Tasks.
     */
    listUncheckedTasks(userId) {
        throw new NotImplementedException();
    }

    /**
     * @param {string} userId
     * @returns {Promise<Task[]>} a promise that resolves to an array of Tasks.
     */
    listCheckedTasks(userId) {
        throw new NotImplementedException();
    }
    
}