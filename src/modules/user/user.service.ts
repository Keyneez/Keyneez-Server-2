import { Injectable } from '@nestjs/common';
import { rm, sc } from 'src/constants';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateDTO } from './dto/user-create.req.dto';
import jwt from "jsonwebtoken";
import { tokenType } from "src/constants";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}
    //* 받아온 user_key를 담는 access token 생성
    async sign(user_key: number){
        const payload = {
          user_key,
        };
    
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "2h" });
        return accessToken;
      };
      
    
      //* token 검사
      async verify (token: string) {
        let decoded: string | jwt.JwtPayload;
    
        try {
          decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (error: any) {
          if (error.message === "jwt expired") {
            return tokenType.TOKEN_EXPIRED;
          } else if (error.message === "invalid token") {
            return tokenType.TOKEN_INVALID;
          } else {
            return tokenType.TOKEN_INVALID;
          }
        }
    
        return decoded;
      };
    async getUserByPhone(user_phone: string) {
        const data = await this.prisma.user.findUnique({
            where: {
                user_phone,
            }
        })
    
        return data;
    }

    async createUser(userCreateDto: UserCreateDTO) {

        const data = await this.prisma.user.create({
          data: {
            ...userCreateDto
          },
        });
      
        return data;
    };
}
