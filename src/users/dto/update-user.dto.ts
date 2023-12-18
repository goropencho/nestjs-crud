import { IsNotEmpty, IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    username : String;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    age :Number;

    @IsOptional()
    @IsString({each: true})
    @IsNotEmpty()
    hobbies : String[];
 }
