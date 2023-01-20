import { ContentModule } from './modules/content/content.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, ContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
