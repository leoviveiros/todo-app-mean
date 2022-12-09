class NotImplementedException extends Error {
    constructor() {
        super('Not implemented');
    }
}

class TaskGateway {

    createTask(task) {
        throw new NotImplementedException();
    }

    deleteTask(taskId) {
        throw new NotImplementedException();
    }

    updateTask(taskId, task) {
        throw new NotImplementedException();
    }

    findTaskById(taskId) {
        throw new NotImplementedException();
    }
}