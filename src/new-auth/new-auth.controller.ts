import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    Request,
    Get,
} from '@nestjs/common';
import { NewAuthService } from './new-auth.service';
import { NewAuthGuard } from './new-auth.guard';
import { JwtNewAuthGuard } from './jwt-new-auth.guard';

@Controller('new-auth')
export class NewAuthController {
    constructor(private newAuthService: NewAuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.newAuthService.signIn(
            signInDto.username,
            signInDto.password,
        );
    }

    // @UseGuards(NewAuthGuard)
    @UseGuards(JwtNewAuthGuard)
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
