import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosRepository } from './todos.repository';
import { Todo } from './todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
    constructor(private todosRepository: TodosRepository) {}

    getTodos(): Promise<Todo[]> {
        return this.todosRepository.find();
    }

    async getTodo(id: string): Promise<Todo> {
        const existTodo = await this.todosRepository.findOne({ where: { id } });
        if (!existTodo)
            throw new NotFoundException(
                `The todo with id "${id}" was not found`,
            );
        return existTodo;
    }

    createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.todosRepository.createTodo(createTodoDto);
    }

    async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
        const existTodo = await this.getTodo(id);
        const { title, description, status } = updateTodoDto;
        if (title) existTodo.title = title;
        if (description) existTodo.description = description;
        if (status) existTodo.status = status;
        await this.todosRepository.save(existTodo);
        return existTodo;
    }

    async deleteTodo(id: string): Promise<void> {
        const result = await this.todosRepository.deleteTodo(id);
        if (result.affected === 0)
            throw new NotFoundException(`Todo with id '${id}' was not found`);
    }

    getHello(): string {
        return 'Hello World!';
    }

    sum(a: number, b: number): number {
        return a + b;
    }
}
