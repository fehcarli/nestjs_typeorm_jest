import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  constructor(
    private readonly todoService: TodoService
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Adicionar uma nova tarefa' 
  })
  @ApiResponse({
    status: 201,
    description: 'Nova tarefa criada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
  })
  create(@Body() CreateTodoDto: CreateTodoDto) {
    return this.todoService.create(CreateTodoDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Listar todas as tarefas' 
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas retornada com sucesso',
    isArray: true,
  })
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ 
    summary: 'Exibir os dados de uma tarefa' 
  })
  @ApiResponse({
    status: 200,
    description: 'Dados de uma tarefa retornado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Task não foi encontrada',
  })
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.todoService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ 
    summary: 'Atualizar os dados de uma tarefa' 
  })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Task não foi encontrada',
  })
  update(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(uuid, updateTodoDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Remover uma tarefa' 
  })
  @ApiResponse({ 
    status: 204, description: 'Tarefa removida com sucesso' 
  })
  @ApiResponse({
    status: 404,
    description: 'Task não foi encontrada',
  })
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    this.todoService.remove(uuid);
  }
}
