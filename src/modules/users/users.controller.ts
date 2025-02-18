import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { UpdateStatusDto, UserSearchCriteriaDto } from './dto/users.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('search')
    async getUsersByCriteria(@Query() criteria: UserSearchCriteriaDto): Promise<Users[]> {
        return await this.usersService.getUsersByCriteria(criteria);
    }
    @Patch(':id/status')
    async updateStatus(@Param('id') userId: number, @Body() updateStatusDto: UpdateStatusDto): Promise<Users> {
        return await this.usersService.updateUser(userId, updateStatusDto);
    }

    @Get()
    async getAllUsers(): Promise<Users[]> {
        return await this.usersService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<Users> {
        return await this.usersService.getUserById(id);
    }
}
