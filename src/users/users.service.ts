import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
}
