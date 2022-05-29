import * as config from 'config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

const kakaoConfig = config.get('kakao');

export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: kakaoConfig.clientID,
      callbackURL: kakaoConfig.callbackURL,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile, done);
    const profileJson = profile._json;
    const kakao_account = profileJson.kakao_account;
    const payload = {
      // id: kakao_account.profile.nickname,
      kakaoId: profileJson.id,
      // email:
      //   kakao_account.has_email && !kakao_account.email_needs_agreement
      //     ? kakao_account.email
      //     : null,
    };
    console.log(payload.kakaoId);
    return done(null, payload);
  }
}
