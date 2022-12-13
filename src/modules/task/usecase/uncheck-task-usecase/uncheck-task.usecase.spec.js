const Task = require('../../domain/entity/task.entity.js');
const UncheckTaskUseCase = require('./uncheck-task.usecase.js');

describe('UncheckTaskUsecase Tests', () => {

    const mockTaskGateway = {
        updateTask: jest.fn().mockResolvedValue(),
        findTaskById: jest.fn().mockResolvedValue(new Task({
            id: '123',
            userId: '456',
            name: 'task name',
            description: 'task description',
            checked: true
        }))
    }

    it('should uncheck a task', async () => {
        const usecase = new UncheckTaskUseCase(mockTaskGateway);

        const task = await usecase.execute({ id: '123' });

        expect(task).toBeDefined();
        expect(task.id).toBe('123');
        expect(task.userId).toBe('456');
        expect(task.name).toBe('task name');
        expect(task.description).toBe('task description');
        expect(task.checked).toBe(false);
        expect(task.createdAt).toBeDefined();
        expect(task.updatedAt.getTime()).toBeGreaterThan(task.createdAt.getTime());
    });

    it('should throw an error when task is not found', async () => {
        mockTaskGateway.findTaskById = jest.fn().mockResolvedValue(null);

        const usecase = new UncheckTaskUseCase(mockTaskGateway);

        try {
            await usecase.execute({ id: '123' });

            fail('should throw an error');
        } catch (error) {
            expect(error).toMatch('Task not found');
        }
    });

});