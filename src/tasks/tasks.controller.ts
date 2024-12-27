import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto) {
        return this.tasksService.getTasks(filterDto);
    }

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
        @GetUser() user: User,
    ) {
        return this.tasksService.createTask(createTaskDto, user);
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
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
    ) {
        const { status } = UpdateTaskStatusDto;
        if (status) return this.tasksService.updateTaskStatus(id, status);
    }
}
