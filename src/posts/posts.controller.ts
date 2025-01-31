import { Body, Controller, Post, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dtos/CreatePosts.dto';
import { CreateGroupPostDto } from './dtos/CreateGroupPost.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsServices: PostsService) {

    }

    @Post()
    @UsePipes(ValidationPipe)
    createPost(@Body() { userId, ...createPostDto }: CreatePostsDto) {
        return this.postsServices.createPost(userId, createPostDto);
    }

    @Post('posts')
    @UsePipes(ValidationPipe)
    createGroupPost(@Body() { userIds, ...createGroupPost }: CreateGroupPostDto) {
        return this.postsServices.createGroupPost(userIds, createGroupPost)
    }

    @Get('group')
    getGroupPosts() {
        return this.postsServices.getUserPosts();
    }

}
