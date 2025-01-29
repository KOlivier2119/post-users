import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from 'src/dtos/createUserDto.dto';
import { UpdateUserDto } from 'src/dtos/UpdateUserDto.dto';

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

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateUserById(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
        return this.userServices.updateUserById(id, data);
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe())
    deleteUserById(@Param('id', ParseIntPipe) id: number) {
        this.userServices.deleteUserById(id);
        return "User deleted Successfully";
    }
}
