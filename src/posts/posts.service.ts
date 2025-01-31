import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private prismaService: PrismaService) { }
    createPost(userId: number, data: Prisma.PostCreateWithoutUserInput) {
        return this.prismaService.post.create({
            data: {
                title: data.title,
                description: data.description,
                userId: userId
            }
        })
    }

    createGroupPost(userIds: number[], data: Prisma.GroupPostCreateWithoutUsersInput) {
        return this.prismaService.groupPost.create({
            data: {
                ...data,
                users: {
                    create: userIds.map(userId => ({userId}))
                }
            }
        })
    }

    getUserPosts() {
        return this.prismaService.groupPost.findMany( {
            include: {
                users: {
                    select: {
                        user: true
                    }
                }
            }
        });
    }
}
