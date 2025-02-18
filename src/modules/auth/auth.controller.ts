import { Body, Controller, Get, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { UsersDto } from '../users/dto/users.dto';
import { Users } from '../users/users.entity';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/credentials.dto';
import { GetUser } from './dto/get-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.login(authCredentials);
    }

    @UseGuards(AuthGuard())
    @Post('/register')
    async register(@Body() usersDto: UsersDto): Promise<{ accessToken: string }> {
        return await this.authService.register(usersDto);
    }

    @UseGuards(AuthGuard())
    @Get('/me')
    me(@GetUser() user: Users) {
        return user;
    }
}
