import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { v4 as uuidv4, validate } from 'uuid';

let users: User[] = [];

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    let user = { id: uuidv4(), ...createUserDto, }
    users.push(user);
    return user;
  }

  findAll() {
    return users;
  }

  findOne(id: String) {
    if(!validate(id)){
      throw new BadRequestException("Invalid UUID");
    }
    let data = users.find(user => user.id === id)
    if(!data){
      throw new NotFoundException("User does not exist");
    }
    return data;
  }

  update(id: String, updateUserDto: UpdateUserDto) {
    if(!validate(id)){
      throw new BadRequestException("Invalid UUID");
    }
    let user = users.findIndex(user => user.id === id)
    if(user == -1){
      throw new NotFoundException("User Not Found")
    }
    return users[user] = {...users[user], ...updateUserDto}
  }

  remove(id: String) {
    if(!validate(id)){
      throw new BadRequestException("Invalid UUID");
    }
    let user = users.findIndex(user => user.id === id)
    if(user == -1){
      throw new NotFoundException("User Not Found")
    }
    users.splice(user,1)
    return;
  }
}
