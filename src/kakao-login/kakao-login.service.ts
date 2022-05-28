import { Get, Injectable } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entity/user.entity';
import { Board } from '../boards/entity/board.entity';

@Injectable()
export class KakaoLoginService {}
