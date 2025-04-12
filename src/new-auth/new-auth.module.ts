import { Module } from '@nestjs/common';
import { NewAuthService } from './new-auth.service';
import { UsersModule } from 'src/users/users.module';
import { NewAuthController } from './new-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
        AuthModule,
    ],
    providers: [NewAuthService, JwtStrategy],
    controllers: [NewAuthController],
    exports: [NewAuthService],
})
export class NewAuthModule {}
