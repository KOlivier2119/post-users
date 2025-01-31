import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dtos/CreatePosts.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsServices: PostsService) {

    }

    @Post()
    @UsePipes(ValidationPipe)
    createPost(@Body() {userId, ...createPostDto}: CreatePostsDto) {
       return this.postsServices.createPost(userId, createPostDto);
    }
}
