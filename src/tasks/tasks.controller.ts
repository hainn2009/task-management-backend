import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Get()
    // getTasks(@Query() filterDto: GetTasksFilterDto) {
    //     if (Object.keys.length > 0)
    //         return this.tasksService.getTasksWithFilter(filterDto);
    //     else return this.tasksService.getAllTasks();
    // }

    // @Get('/:id')
    // getTaskByID(@Param('id') id: string) {
    //     return this.tasksService.getTaskByID(id);
    // }
    @Get('/:id')
    getTaskByID(@Param('id') id: string) {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(
        // @Body('title') title: string,
        // @Body('description') description: string,
        @Body() createTaskDto: CreateTaskDto,
    ) {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    }

    // @Patch('/:id')
    // updateTask(
    //     @Param('id') id: string,
    //     // issue here: status can be other than what we can accept
    //     // @Body() updateBody: Partial<Omit<Task, 'id'>>,
    //     @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
    // ) {
    //     return this.tasksService.updateTask(id, UpdateTaskStatusDto);
    // }
}
