import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'First Test',
      description: 'test',
      done: false,
    },
    {
      id: 2,
      title: 'Second Todo',
      description: 'Another todo',
      done: true,
    },
  ];
  findAll(): Todo[] {
    return this.todos;
  }

  create(todo: CreateTodoDto) {
    this.todos = [...this.todos, todo as Todo];
  }

  getTodo(id: string) {
    return this.todos.find((todo) => todo.id === Number(id));
  }
}
