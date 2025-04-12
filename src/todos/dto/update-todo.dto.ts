import { IsEnum } from 'class-validator';
import { TodoStatus } from '../todo-status.enum';

export class UpdateTodoDto {
    @IsEnum(TodoStatus)
    status?: TodoStatus;

    title?: string;

    description?: string;
}
