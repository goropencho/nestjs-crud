import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/users.entity';
import { v4 as uuidv4, validate } from 'uuid';

const users: User[] = [];

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  create(createUserDto: CreateUserDto) {
    const user = { id: uuidv4(), ...createUserDto };
    users.push(user);
    this.logger.log(`User created: ${JSON.stringify(user)}`);
    return user;
  }

  findAll() {
    this.logger.log('Fetching all users');
    return users;
  }

  findOne(id: string) {
    this.logger.log(`Fetching user with ID: ${id}`);
    if (!validate(id)) {
      this.logger.error('Invalid UUID provided');
      throw new BadRequestException('Invalid UUID');
    }
    const data = users.find((user) => user.id === id);
    if (!data) {
      this.logger.warn(`User with ID ${id} does not exist`);
      throw new NotFoundException('User does not exist');
    }
    this.logger.log(`User found: ${JSON.stringify(data)}`);
    return data;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    this.logger.log(`Updating user with ID: ${id}`);
    if (!validate(id)) {
      this.logger.error('Invalid UUID provided');
      throw new BadRequestException('Invalid UUID');
    }
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      this.logger.warn(`User with ID ${id} not found for update`);
      throw new NotFoundException('User Not Found');
    }
    const updatedUser = { ...users[userIndex], ...updateUserDto };
    users[userIndex] = updatedUser;
    this.logger.log(`User updated: ${JSON.stringify(updatedUser)}`);
    return updatedUser;
  }

  remove(id: string) {
    this.logger.log(`Removing user with ID: ${id}`);
    if (!validate(id)) {
      this.logger.error('Invalid UUID provided');
      throw new BadRequestException('Invalid UUID');
    }
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      this.logger.warn(`User with ID ${id} not found for removal`);
      throw new NotFoundException('User Not Found');
    }
    users.splice(userIndex, 1);
    this.logger.log(`User with ID ${id} has been removed`);
    return;
  }
}
