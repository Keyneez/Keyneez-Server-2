import { Injectable } from '@nestjs/common';
import { rm, sc } from 'src/constants';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateDTO } from './dto/user-create.req.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    async getUserByPhone(user_phone: string) {
        const data = await this.prisma.user.findUnique({
            where: {
                user_phone,
            }
        })
    
        return data;
    }

    async createUser(userCreateDto: UserCreateDTO) {
        const isUser = await this.getUserByPhone(userCreateDto.user_phone);
        
        if (isUser) return rm.ALREADY_PHONE;

        const data = await this.prisma.user.create({
          data: {
            ...userCreateDto
          },
        });
      
        return data;
    };
}
