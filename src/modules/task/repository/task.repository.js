const assert = require('node:assert');
const Task = require('../domain/entity/task.entity.js');
const TaskGateway = require('../gateway/task-gateway.js');
const TaskModel = require('./task.model.js');;

class TaskRepository extends TaskGateway {

    constructor() {
        super();
    }
    
    #taskFromModel(data) {
        return new Task({
            id: data._id,
            userId: data.userId,
            name: data.name,
            description: data.description,
            checked: data.checked,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        });
    }

    /**
     * @param {Task} task - The task to create.
     * @returns {Promise<Task>} - The created task
     */
    createTask(task) {
        assert(task instanceof Task);
        return TaskModel.create(task.getProperties());
    }

    /**
     * @param {string} taskId - The id of the task to delete.
     * @returns {Promise<void>}
     */
    deleteTask(taskId) {
        return TaskModel.deleteOne({ _id: taskId });
    }

    /**
     * @param {string} taskId - The id of the task to update.
     * @param {Task} task - The task to update.
     * @returns {Promise<Task>} The updated task
     */
    updateTask(taskId, task) {
        assert(task instanceof Task);
        return TaskModel.replaceOne({ _id: taskId }, task.getProperties());
    }

    /**
     * @param {string} taskId - The id of the task to find.
     * @returns {Promise<Task | undefined>}
     */
    async findTaskById(taskId) {
        const data = await TaskModel.findOne({ _id: taskId });

        return data ?? this.#taskFromModel(data);
    }

    async #listUserTasks(userId, checked) {
        const result = await TaskModel.find({ userId, checked })
            .sort({ createdAt: -1 });

        return result.map(this.#taskFromModel);
    }

    /**
     * @param {string} userId
     * @returns {Promise<Task[]>} a promise that resolves to an array of Tasks.
     */
    listUncheckedTasks(userId) {
        return this.#listUserTasks(userId, false);
    }

    /**
     * @param {string} userId
     * @returns {Promise<Task[]>} a promise that resolves to an array of Tasks.
     */
    listCheckedTasks(userId) {
        return this.#listUserTasks(userId, true);
    }

}

module.exports = TaskRepository;