import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { useActionData } from 'react-router-dom';
import { find } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {

    }

    createUsers(createUserData: Prisma.UserCreateInput) {
        return this.prismaService.user.create({
            data: {
                ...createUserData, userSetting: {
                    create: {
                        notificationsOn: false,
                        smsEnabled: true
                    }
                }
            }
        })
    }

    getUser() {
        return this.prismaService.user.findMany({ include: { userSetting: true } });
    }

    getUserById(id: number) {
        const user = this.prismaService.user.findUnique({ where: { id: id }, include: {
            userSetting: {
                select: {
                    notificationsOn: true,
                    smsEnabled: true
                }
            }
        } })
        if (!user) {
            return new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async updateUserById(id: number, data: Prisma.UserUpdateInput) {
        const findUser = await this.getUserById(id);
        if (!findUser) {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }

        if (data.username) {
            const findUser = await this.prismaService.user.findUnique({ where: { username: data.username as string } })
            if (findUser) {
                throw new HttpException('Username Already Taken', HttpStatus.BAD_REQUEST);
            }

            return this.prismaService.user.update({ where: { id: id }, data });
        }
    }

    async deleteUserById(id: number) {
        const findUser = await this.prismaService.user.findUnique({ where: { id: id } });
        if (!findUser) {
            throw new HttpException("User Not Found", HttpStatus.NOT_FOUND);
        }
        return this.prismaService.user.delete({ where: { id: id } });
    }

    async updateUserSettings(userId: number, data: Prisma.UserSettingUpdateInput) {
        const findUser = await this.getUserById(userId);
        if (!findUser) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        if (findUser instanceof HttpException || !findUser.userSetting) {
            throw new HttpException('Bad Request', 400);
        }
       return this.prismaService.userSetting.update({ where: {userId}, data});
    }
}
