import { IsString, IsPhoneNumber } from "class-validator";

export class UserCreateDTO{
    @IsString()
    user_name: string;

    @IsString()
	user_birth: string;

    @IsString()
	user_gender: string;

    @IsPhoneNumber()
    @IsString()
	user_phone: string;
}