import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Post()
  createTodo(@Body() newTodo: Todo) {
    this.todosService.create(newTodo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.getTodo(id);
  }
}
