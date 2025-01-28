import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { useActionData } from 'react-router-dom';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {
  
    }

    createUsers(createUserData: Prisma.UserCreateInput) {
        return this.prismaService.user.create({data: createUserData})
    }

    getUser() {
        return this.prismaService.user.findMany();
    }

    getUserById(id: number) {
        const user = this.prismaService.user.findUnique({ where: { id: id } })
        if(!user) {
            return "User Not Found";
        }
        return user;
    }  

    async updateUserById(id: number, data: Prisma.UserUpdateInput)  {
        const findUser = await this.getUserById(id);
        if(!findUser) {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }

        if(data.username) {
            const findUser = await this.prismaService.user.findUnique({where: { username: data.username as string }})
            if(findUser) {
                throw new HttpException('Username Already Taken', HttpStatus.BAD_REQUEST);
            }

            return this.prismaService.user.update({where: {id: id}, data});
        }
    }
}
