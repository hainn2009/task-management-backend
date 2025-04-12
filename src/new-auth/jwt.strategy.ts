import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/users.repository';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: { username: string }): Promise<User> {
        const { username } = payload;
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) throw new UnauthorizedException();
        return user;
        // return { id: '123', password: '123', username, tasks: [], todos: [] };
    }
}
