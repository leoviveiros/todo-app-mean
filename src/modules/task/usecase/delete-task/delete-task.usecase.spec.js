const DeleteTaskUseCase = require('./delete-task.usecase.js');

describe('DeleteTaskUsecase Tests', () => {

    const mockTaskGateway = {
        deleteTask: jest.fn().mockResolvedValue(),
    }

    it('should delete a task', async () => {
        const usecase = new DeleteTaskUseCase(mockTaskGateway);

        await usecase.execute({
            id: '123'
        });
    });

    it('should throw an error if no id is provided', async () => {
        const usecase = new DeleteTaskUseCase(mockTaskGateway);

        try {
            await usecase.execute({});

            fail('should throw an error');
        } catch (error) {
            expect(error).toMatch('"id" is required');
        }
    });

});