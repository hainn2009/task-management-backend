import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService) {}

    @Get()
    getTodos() {
        return this.todosService.getTodos();
    }

    @Get('/:id')
    getTodo(@Param('id') id: string) {
        return this.todosService.getTodo(id);
    }

    @Post()
    createTodo(@Body() createTodoDto: CreateTodoDto) {
        return this.todosService.createTodo(createTodoDto);
    }

    @Patch('/:id')
    updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todosService.updateTodo(id, updateTodoDto);
    }

    @Delete('/:id')
    deleteTodo(@Param('id') id: string) {
        return this.todosService.deleteTodo(id);
    }
}
