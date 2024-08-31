import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(Users) private repo: Repository<Users>){}

  create(name:string,lastName:string,email:string,password:string,credits:number,countryOfOrigin:string) {
   const user =this.repo.create({name,lastName,email,password,credits,countryOfOrigin})
   return this.repo.save(user)
  }

  async findOne(id: number): Promise<Users | null> {
    const users = await this.repo.findOneBy({ id });
      if (!id) {
        return null;
      }
       return users;
    }
 findAll(){
 return this.repo.find()
 }
  find(email: string) {
   
    return this.repo.find({ where: { email } });
  }

  async update( users:Users,attrs: Partial<Users>) {
    
      if (!users) {
      throw new NotFoundException('User not found');
      }
      Object.assign(users, attrs);
      try {
        const updatedFlight = await this.repo.save(users);
      return updatedFlight;
      }
      catch{
        throw new BadRequestException('Could not update user');
      }
    }

   
    async remove(id: number, currentUser: Users): Promise<void> {
      const userIdToDelete = id ?? currentUser.id;
      const userToDelete = await this.findOne(userIdToDelete);
    
      if (!userToDelete) {
        throw new NotFoundException('User not found');
      }
    
      if (currentUser.IsAdmin || currentUser.id === userIdToDelete) {
        try {
          await this.repo.remove(userToDelete);
        } catch {
          throw new BadRequestException('Could not remove user');
        }
      } else {
        throw new ForbiddenException('You are not allowed to delete this user');
      }
    }
}
