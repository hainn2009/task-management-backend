import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/users.repository';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class NewAuthService {
    constructor(
        // private userService: UsersService,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}
    async signIn(username: string, pass: string): Promise<any> {
        // khong dung userService hard code nua
        // const user = await this.userService.findOne(username);
        const user = await this.userRepository.findOne({ where: { username } });
        if (user && (await bcrypt.compare(pass, user.password))) {
            // const payload = { sub: user.id, username: user.username };
            const payload: any = { username };
            const access_token = this.jwtService.sign(payload);
            return { username, access_token };
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }

        // const payload = { sub: user.id, username: user.username };
        // return {
        //     access_token: await this.jwtService.signAsync(payload),
        // };
    }
}
