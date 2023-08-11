import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Post()
  createTodo(@Body() newTodo: CreateTodoDto) {
    this.todosService.create(newTodo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.getOne(id);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() updatedTodo: CreateTodoDto) {
    return this.todosService.update(id, updatedTodo);
  }
}
