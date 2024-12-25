import { Injectable, NotFoundException } from '@nestjs/common';
// import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    // getAllTasks() {
    //     return this.tasks;
    // }
    // getTasksWithFilter(filterDto: GetTasksFilterDto) {
    //     const { status, search } = filterDto;
    //     return this.tasks.filter(
    //         (task) =>
    //             (status ? task.status === status : true) &&
    //             (search
    //                 ? task.title.includes(search) ||
    //                   task.description.includes(search)
    //                 : true),
    //     );
    // }
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
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });
        await this.taskRepository.save(task);
        return task;
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
}
