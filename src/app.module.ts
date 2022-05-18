import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
