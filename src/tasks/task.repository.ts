import { Task } from './task.entity';
import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { User } from 'src/auth/user.entity';

// @EntityRepository(Task)
// export class TaskRepository extends Repository<Task> {}

@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async findAll(): Promise<Task[]> {
        return this.find();
    }

    async findOneById(id: number): Promise<Task> {
        return this.findOneById(id);
    }

    // async createTask(task: Partial<Task>): Promise<Task> {
    //     const newTask = this.create(task);
    //     return this.save(newTask);
    // }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
        });
        await this.save(task);
        return task;
    }

    async updateTask(id: number, task: Partial<Task>): Promise<Task> {
        await this.update(id, task);
        return this.findOneById(id);
    }

    async deleteTask(id: number): Promise<void> {
        await this.delete(id);
    }
}
