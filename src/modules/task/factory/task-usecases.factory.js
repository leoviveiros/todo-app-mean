const CreateTaskUseCase = require('../usecase/create-task/create-task.usecase.js');
const TaskRepository = require('../repository/task.repository.js');

/**
 * @returns CreateTaskUseCase
 */
function createTaskFactory() {
    const repository = new TaskRepository();
    const usecase = new CreateTaskUseCase(repository);

    return usecase;
}

module.exports = {
    createTaskFactory
}