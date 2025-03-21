import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ImagesModule } from './images/images.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { SavedImagesModule } from './saved-images/saved-images.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ImagesModule,
    UsersModule,
    CommentsModule,
    SavedImagesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
