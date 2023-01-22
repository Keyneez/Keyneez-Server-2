import { PrismaModule } from './modules/prisma/prisma.module';
import { ContentModule } from './modules/content/content.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [UserModule, ContentModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        'user/signup/pw',
        {path: 'user/signup', method: RequestMethod.PATCH},
      );
  }
}
// export class AppModule {}
