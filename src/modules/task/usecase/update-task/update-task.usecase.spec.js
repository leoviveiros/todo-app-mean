const Task = require('../../domain/entity/task.entity.js');
const UpdateTaskUseCase = require('./update-task.usecase.js');

describe('UpdateTaskUsecase Tests', () => {

    const mockTaskGateway = {
        updateTask: jest.fn().mockResolvedValue(),
        findTaskById: jest.fn().mockResolvedValue(new Task({
            id: '123',
            userId: '456',
            name: 'task name',
            description: 'task description',
            checked: false
        }))
    }

    it('should update a task', async () => {
        const usecase = new UpdateTaskUseCase(mockTaskGateway);

        const task = await usecase.execute({
            id: '123',
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

    it('should throw an error when task is not found', async () => {
        mockTaskGateway.findTaskById = jest.fn().mockResolvedValue(null);

        const usecase = new UpdateTaskUseCase(mockTaskGateway);

        try {
            await usecase.execute({
                id: 'xyz',
                name: 'task name',
                description: 'task description'
            });

            fail('should throw an error');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

});