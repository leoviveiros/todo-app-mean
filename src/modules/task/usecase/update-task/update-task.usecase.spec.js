const Task = require('../../domain/entity/task.entity.js');
const UpdateTaskUseCase = require('./update-task.usecase.js');

describe('UpdateTaskUsecase Tests', () => {

    const mockTaskGateway = {
        updateTask: jest.fn().mockResolvedValue(),
        findTaskById: jest.fn().mockResolvedValue(new Task( '123', '456', 'task name', 'task description', false ))
    }

    it('should update a task', async () => {
        const usecase = new UpdateTaskUseCase(mockTaskGateway);

        const task = await usecase.execute({
            id: '123',
            userId: '456',
            name: 'edited task name',
            description: 'edited task description'
        });

        expect(task).toBeDefined();
        expect(task.id).toBe('123');
        expect(task.userId).toBe('456');
        expect(task.name).toBe('edited task name');
        expect(task.description).toBe('edited task description');
        expect(task.checked).toBe(false);
        expect(task.createdAt).toBeDefined();
        expect(task.updatedAt).toBeDefined();
    });

    it('should throw an error if no id is provided', async () => {
        const usecase = new UpdateTaskUseCase(mockTaskGateway);

        try {
            await usecase.execute({
                userId: '456',
                name: 'task name',
                description: 'task description'
            });

            fail('should throw an error');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should throw an error if wrong userId is provided', async () => {
        const usecase = new UpdateTaskUseCase(mockTaskGateway);

        try {
            await usecase.execute({
                id: '123',
                userId: '789',
                name: 'task name',
                description: 'task description'
            });

            fail('should throw an error');
        } catch (error) {
            expect(error).toMatch('Task not found');
        }
    });

});