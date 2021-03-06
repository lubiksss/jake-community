import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './entity/board.status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './entity/board.entity';
import { create } from 'domain';
import { User } from '../auth/entity/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  getAllBoards(user: User): Promise<Board[]> {
    return this.boardRepository.getAllBoards(user);
  }
  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }
  deleteBoardById(id: number, user: User): Promise<void> {
    return this.boardRepository.deleteBoardById(id, user);
  }

  updateBoardStatusById(id: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status);
  }
}
