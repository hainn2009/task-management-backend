import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatus } from './todo-status.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosRepository extends Repository<Todo> {
    constructor(private dataSource: DataSource) {
        super(Todo, dataSource.createEntityManager());
    }

    async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
        const { title, description } = createTodoDto;
        const todo = this.create({
            title,
            description,
            status: TodoStatus.OPEN,
        });
        return this.save(todo);
    }

    async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo | null> {
        await this.update(id, todo);
        return this.findOneBy({ id });
    }

    async deleteTodo(id: string): Promise<DeleteResult> {
        return this.delete({ id });
    }
}
