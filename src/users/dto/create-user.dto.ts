import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  hobbies: string[];
}
