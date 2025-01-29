import { IsBoolean, IsOptional } from "class-validator";

export class updateUserSettingsDto {
    @IsOptional()
    @IsBoolean()
    smsEnabled?: boolean;

    @IsOptional()
    @IsBoolean()
    notificationOn?: boolean;
}