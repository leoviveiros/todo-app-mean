const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    _id: String,
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    checked: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

const TaskModel = mongoose.model('tasks', TaskSchema);

module.exports = TaskModel;