import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { v4 as uuidv4, validate } from 'uuid';

const users: User[] = [];

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const user = { id: uuidv4(), ...createUserDto };
    users.push(user);
    return user;
  }

  findAll() {
    return users;
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const data = users.find((user) => user.id === id);
    if (!data) {
      throw new NotFoundException('User does not exist');
    }
    return data;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const user = users.findIndex((user) => user.id === id);
    if (user == -1) {
      throw new NotFoundException('User Not Found');
    }
    return (users[user] = { ...users[user], ...updateUserDto });
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const user = users.findIndex((user) => user.id === id);
    if (user == -1) {
      throw new NotFoundException('User Not Found');
    }
    users.splice(user, 1);
    return;
  }
}
