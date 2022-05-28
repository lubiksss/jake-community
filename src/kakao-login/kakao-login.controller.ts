import { Controller, Get, Query, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Controller('kakao')
export class KakaoLoginController {
  constructor(private httpService: HttpService) {}
  private ACCESS_TOKEN;

  @Get('/')
  home(): string {
    return `
      <div>
        <h1>카카오 로그인</h1>
        <form action="/kakao/login" method ="GET">
          <input type="submit" value="카카오 로그인"/>
        </form>
        <form action="/kakao/logout" method ="GET">
          <input type="submit" value="카카오 로그아웃 및 연결 끊기 정확히는 액세스 토큰 만료, 계정자체는 지금 여기 웹서비스랑 연결되어있음"/>
        </form>
    `;
  }
  @Get('/login')
  login(@Res() res): void {
    const HOST_NAME = 'https://kauth.kakao.com';
    const REST_API_KEY = 'f4a05281d374854a6c7285ffd1a01205';
    const REDIRECT_URI = 'http://localhost:3000/kakao/redirect';
    const URL = `${HOST_NAME}/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    return res.redirect(URL);
  }
  @Get('/redirect')
  async redirect(@Query() qs): Promise<string> {
    const AUTHORIZE_CODE = qs.code;
    const HOST_NAME = 'https://kauth.kakao.com';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;cahrset=utf-8',
    };
    const REST_API_KEY = 'f4a05281d374854a6c7285ffd1a01205';
    const REDIRECT_URI = 'http://localhost:3000/kakao/redirect';
    const URL = `${HOST_NAME}/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`;
    const data = await lastValueFrom(
      this.httpService.post(URL, '', { headers }).pipe(map((res) => res.data)),
    );
    console.log(data);
    this.ACCESS_TOKEN = data.access_token;
    return `
      <div>
        <h1>토큰 획득 성공</h1>
        <a href=/kakao>돌아가기</a>
    `;
  }
  @Get('/logout')
  async logout(): Promise<string> {
    const HOST_NAME = 'https://kapi.kakao.com';
    const headers = {
      Authorization: `Bearer ${this.ACCESS_TOKEN}`,
    };
    const URL = `${HOST_NAME}/v1/user/logout`;
    const data = await lastValueFrom(
      this.httpService.post(URL, '', { headers }).pipe(map((res) => res.data)),
    );
    console.log(data);
    return `
      <div>
        <h1>로그아웃 성공</h1>
        <a href=/kakao>돌아가기</a>
    `;
  }
}
