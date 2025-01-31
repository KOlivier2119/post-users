import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreatePostsDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    title: string;
    
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    userId: number;
}