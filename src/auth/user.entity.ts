import { Task } from 'src/tasks/task.entity';
import { Todo } from 'src/todos/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ unique: true })
    username: string;
    @Column()
    password: string;
    @OneToMany(() => Task, (task) => task.user, { eager: true })
    tasks: Task[];

    @OneToMany(() => Todo, (todo) => todo.user, { eager: true })
    todos: Todo[];
}
