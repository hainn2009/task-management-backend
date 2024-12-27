import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'superSecrect',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [AuthService, UserRepository, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService, UserRepository, JwtStrategy, PassportModule],
})
export class AuthModule {}
