import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.todoRepository.save(this.todoRepository.create(createTodoDto));
  }

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }

  async findOne(uuid: string): Promise<TodoEntity> {
    const task = await this.todoRepository.findOne({
      where: {uuid}
    });
    if(!task){
      throw new NotFoundException();
    }
    return task;
  }

  async update(uuid: string, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const task = await this.todoRepository.findOne({
      where: {uuid}
    });
    if(!task){
      throw new NotFoundException();
    }
    await this.todoRepository.update(uuid, updateTodoDto);
    return task;
  }

  async remove(uuid: string) {
    const book = await this.todoRepository.delete(uuid);
    if(!book.affected){
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
  }
}
