import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCreateDTO } from './dto/user-create.req.dto';
import { UserService } from './user.service';
import { rm, sc } from "../../constants";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    create(@Body() createUserDto: UserCreateDTO) {
      return this.userService.createUser(createUserDto);
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
