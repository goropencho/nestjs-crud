import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username : String;

    @IsNumber()
    @IsNotEmpty()
    age :Number;

    @IsArray()
    @IsString({each: true})
    @IsNotEmpty()
    hobbies : String[];
}
