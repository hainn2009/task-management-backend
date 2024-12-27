import { Injectable, NotFoundException } from '@nestjs/common';
// import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        // @InjectRepository(Task)
        // private taskRepository: Repository<Task>,

        @InjectRepository(TaskRepository)
        private readonly taskRepository: TaskRepository,
    ) {}

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.taskRepository.createQueryBuilder('task');
        if (status) query.andWhere('task.status = :status', { status });
        if (search)
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
                { search: `%${search}%` },
            );
        const tasks = await query.getMany();
        return tasks;
    }
    // getTaskByID(id: string) {
    //     const existTask = this.tasks.find((task) => task.id === id);
    //     if (!existTask)
    //         throw new NotFoundException(`Task with id "${id}" not found`);
    //     return existTask;
    // }
    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findOneBy({ id });
        if (!found)
            throw new NotFoundException(`Task with id "${id}" not found`);
        return found;
    }
    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }
    // deleteTask(id: string) {
    //     const existTask = this.getTaskByID(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== existTask.id);
    //     return existTask;
    // }
    async deleteTask(id: string) {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0)
            throw new NotFoundException(`Task with id "${id}" not found`);
    }
    // updateTask(id: string, updateBody: Partial<Omit<Task, 'id'>>) {
    //     const existTask = this.getTaskByID(id);
    //     if (existTask) {
    //         if (updateBody.title) existTask.title = updateBody.title;
    //         if (updateBody.description)
    //             existTask.description = updateBody.description;
    //         if (updateBody.status) existTask.status = updateBody.status;
    //     }
    //     return existTask;
    // }
    async updateTaskStatus(id: string, status: TaskStatus) {
        const task = await this.getTaskById(id);
        task.status = status;
        this.taskRepository.save(task);
        return task;
    }
}
