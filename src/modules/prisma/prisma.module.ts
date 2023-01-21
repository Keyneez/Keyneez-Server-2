import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//! 전역모듈 : 응집성이 떨어짐 but prisma module은 어디에서든 사용되기 때문에 전역으로 사용

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}