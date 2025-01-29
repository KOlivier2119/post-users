import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsOptional()
    displayName?: string;
}