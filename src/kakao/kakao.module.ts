import { Module } from '@nestjs/common';
import { KakaoController } from './kakao.controller';
import { KakaoStrategy } from './kakao.strategy';

@Module({
  providers: [KakaoStrategy],
  controllers: [KakaoController],
})
export class KakaoModule {}
