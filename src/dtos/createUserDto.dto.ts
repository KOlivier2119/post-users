import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    displayName?: string;
}