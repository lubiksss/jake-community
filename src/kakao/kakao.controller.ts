import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('kakao')
export class KakaoController {
  @Get('/login')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin() {
    return '여기 안옴';
  }
  @Get('/redirect')
  @UseGuards(AuthGuard('kakao'))
  async redirect(@Req() req) {
    console.log('req시작');
    console.log(req.user);
    console.log('redirect here');
    return 'redirect';
  }
}
