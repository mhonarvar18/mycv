import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(email: string, password: string) {
    const user = this.userRepository.create({email, password});
    return await this.userRepository.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    
    const user = await this.userRepository.findOne({
      where: { id }
    });
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user;
  }

  async find(email: string) {
    const users = await this.userRepository.find({
      where: { email }
    });
    return users;
  }

  async update(id: number, attributes: Partial<User>) {
    const user = await this.getUserOrFail(id);
    Object.assign(user, attributes);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.getUserOrFail(id);
    return await this.userRepository.remove(user);
  }

  private async getUserOrFail(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found')
    }
    return user;
  }
}
