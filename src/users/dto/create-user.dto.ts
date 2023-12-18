import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: String;

    @IsNotEmpty()
    @IsEmail()
    email:String
}
