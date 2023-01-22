import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, BadRequestException } from '@nestjs/common';
import { validationResult } from "express-validator";
import { UserCreateDTO } from './dto/user-create.req.dto';
import { UserService } from './user.service';
import { rm, sc } from "../../constants";
import { NextFunction } from 'express';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    async createUser(@Body() userCreateDto: UserCreateDTO, req: Request, res: Response, next: NextFunction) {

      const isUser = await this.userService.getUserByPhone(userCreateDto.user_phone);

      console.log(isUser);

      if (isUser) throw new HttpException(rm.ALREADY_PHONE, sc.ACCEPTED);

      const data = await this.userService.createUser(userCreateDto);

      userCreateDto.user_birth = "20" + userCreateDto.user_birth;
      const accessToken = this.userService.sign(data.user_key)   

      const user = {
        user_name: data.user_name,
        user_phone: data.user_phone,
        accessToken,
      };

      return user
    }
  
    // @Get()
    // findAll() {
    //   return this.userService.findAll();
    // }
  
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.userService.findOne(+id);
    // }
  
    // @Patch(':id')
    // update(@Param('id') id: string, @Body()) {
    //   return this.userService.update(+id);
    // }
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.userService.remove(+id);
    // }
}
