import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { TodosRepository } from './todos.repository';

describe('TodosService', () => {
    let todosService: TodosService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TodosService,
                {
                    provide: TodosRepository,
                    useValue: {}, // mock repository
                },
            ],
        }).compile();

        todosService = module.get<TodosService>(TodosService);
    });

    it('should return "Hello World!"', () => {
        expect(todosService.getHello()).toBe('Hello World!');
    });

    it('should sum two numbers correctly', () => {
        expect(todosService.sum(2, 3)).toBe(5);
    });
});
