import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { NewAuthModule } from './new-auth/new-auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
    imports: [
        TasksModule,
        ConfigModule.forRoot({
            isGlobal: true
        }),
        // TypeOrmModule.forRoot({
        //     type: 'postgres',
        //     host: `${DATABASE_HOST}`,
        //     port: 5432,
        //     username: 'postgres',
        //     password: 'postgres',
        //     database: 'task-management',
        //     autoLoadEntities: true,
        //     synchronize: true,
        // }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DATABASE_HOST'),
                port: configService.get<number>('DATABASE_PORT'),
                username: configService.get<string>('DATABASE_USER'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                autoLoadEntities: true,
                synchronize: true, // Use `false` in production
            }),
        }),
        AuthModule,
        TodosModule,
        // NewAuthModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
