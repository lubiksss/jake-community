import { EntityRepository, Repository } from 'typeorm';
import { Board } from './entity/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './entity/board.status.enum';
import { NotFoundException } from '@nestjs/common';
import { User } from '../auth/entity/user.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });
    await this.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoardById(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.save(board);
    return board;
  }

  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
  }
}
