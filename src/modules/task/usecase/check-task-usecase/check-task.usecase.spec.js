const Task = require('../../domain/entity/task.entity.js');
const CheckTaskUseCase = require('./check-task.usecase.js');

describe('UpdateTaskUsecase Tests', () => {

    const mockTaskGateway = {
        updateTask: jest.fn().mockResolvedValue(),
        findTaskById: jest.fn().mockResolvedValue(new Task( '123', '456', 'task name', 'task description', false ))
    }

    it('should check a task', async () => {
        const usecase = new CheckTaskUseCase(mockTaskGateway);

        const task = await usecase.execute({
            id: '123',
            userId: '456'
        });

        expect(task).toBeDefined();
        expect(task.id).toBe('123');
        expect(task.userId).toBe('456');
        expect(task.name).toBe('task name');
        expect(task.description).toBe('task description');
        expect(task.checked).toBe(true);
        expect(task.createdAt).toBeDefined();
        expect(task.updatedAt.getTime()).toBeGreaterThan(task.createdAt.getTime());
    });

    it('should throw an error if wrong userId is provided', async () => {
        const usecase = new CheckTaskUseCase(mockTaskGateway);

        try {
            await usecase.execute({
                id: '123',
                userId: '789'
            });

            fail('should throw an error');
        } catch (error) {
            expect(error).toMatch('Task not found');
        }
    });

});