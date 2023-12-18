import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    name: String;

    @IsNotEmpty()
    @IsEmail()
    email:String
 }
