const ListCheckedTasksUseCase = require('./list-checked-tasks.usecase.js');

describe('ListCheckedTasksUsecase Tests', () => {

    const mockTaskGateway = {
        listCheckedTasks: jest.fn().mockResolvedValue([{
            id: '123',
            userId: '456',
            name: 'task name',
            description: 'task description',
            checked: true,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }]),
    }

    it('should list checked tasks from an user', async () => {
        const usecase = new ListCheckedTasksUseCase(mockTaskGateway);

        const tasks = await usecase.execute({
            userId: '456'
        });

        const [task] = tasks;

        expect(task).toBeDefined();
        expect(task.id).toBe('123');
        expect(task.userId).toBe('456');
        expect(task.name).toBe('task name');
        expect(task.description).toBe('task description');
        expect(task.checked).toBe(true);
        expect(task.createdAt).toBeDefined();
        expect(task.updatedAt).toBeDefined();
    });

    it('should throw an error if no userId is provided', async () => {
        const usecase = new ListCheckedTasksUseCase(mockTaskGateway);

        try {
            await usecase.execute({});

            fail('should throw an error');
        } catch (error) {
            expect(error).toMatch('"userId" is required');
        }
    });

});