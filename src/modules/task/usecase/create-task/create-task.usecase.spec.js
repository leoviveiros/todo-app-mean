const CreateTaskUseCase = require('./create-task.usecase.js');

describe('CreateTaskUsecase Tests', () => {

    const mockTaskGateway = {
        createTask: jest.fn().mockResolvedValue(),
    }

    it('should create a task', async () => {
        const usecase = new CreateTaskUseCase(mockTaskGateway);

        const task = await usecase.execute({
            userId: '123',
            name: 'task name',
            description: 'task description'
        });

        expect(task).toBeDefined();
        expect(task.id).toBeDefined();
        expect(task.name).toBe('task name');
        expect(task.description).toBe('task description');
        expect(task.checked).toBe(false);
        expect(task.createdAt).toBeDefined();
        expect(task.updatedAt).toBeDefined();
    });

    it('should throw an error if no userId is provided', async () => {
        const usecase = new CreateTaskUseCase(mockTaskGateway);

        try {
            await usecase.execute({
                name: 'task name',
                description: 'task description'
            });

            fail('should throw an error');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

});