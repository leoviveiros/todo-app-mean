import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const TaskSchema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    checked: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

const TaskModel = model('tasks', TaskSchema);

module.exports = TaskModel;