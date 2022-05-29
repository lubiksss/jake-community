import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { KakaoModule } from './kakao/kakao.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule, AuthModule, KakaoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
