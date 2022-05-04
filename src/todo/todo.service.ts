import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.todoRepository.save(this.todoRepository.create(createTodoDto));
  }

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find({
      order: { createdAt: 'DESC' }
    });
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
    this.todoRepository.merge(task, updateTodoDto);
    await this.todoRepository.update(uuid, updateTodoDto);
    return task;
  }

  async remove(uuid: string) {
    const task = await this.todoRepository.findOne({
      where: {uuid}
    });
    if(!task){
      throw new NotFoundException();
    }
    await this.todoRepository.softDelete(uuid);
    return task;
  }
}
