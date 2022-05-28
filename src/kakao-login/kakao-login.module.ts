import { Module } from '@nestjs/common';
import { KakaoLoginController } from './kakao-login.controller';
import { KakaoLoginService } from './kakao-login.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [KakaoLoginController],
  providers: [KakaoLoginService],
})
export class KakaoLoginModule {}
