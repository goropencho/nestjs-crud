import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty()
  hobbies: string[];
}
