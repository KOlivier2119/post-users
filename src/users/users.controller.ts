import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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
}
