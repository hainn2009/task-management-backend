import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // TODO This will enable CORS for all routes, should remove this in production
    app.enableCors();
    // app.enableCors({
    //     // frontend url
    //     origin: 'https://task-management-frontend-b15b.onrender.com',
    //     credentials: true,
    //   });
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.setGlobalPrefix('api'); // Set a global prefix for all routes
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
