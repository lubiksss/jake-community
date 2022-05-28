import * as config from 'config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';

const kakaoConfig = config.get('kakao');

export class KakaoStrategy extends PassportStrategy(Strategy) {}
