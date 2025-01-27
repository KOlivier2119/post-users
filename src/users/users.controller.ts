import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from 'src/dtos/createUserDto.dto';

@Controller('users')
export class UsersController {
    constructor(private userServices: UsersService) {
    
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() data: createUserDto) {
        return this.userServices.createUsers(data)
    }

    @Get()
    getUsers() {
        return this.userServices.getUser();
    }

    @Get(':id') 
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userServices.getUserById(id);
    }
}
