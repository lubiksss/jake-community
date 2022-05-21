import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './entity/board.status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './entity/board.entity';
import { create } from 'domain';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }
  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }
  deleteBoardById(id: number): Promise<void> {
    return this.boardRepository.deleteBoardById(id);
  }

  updateBoardStatusById(id: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status);
  }
}
