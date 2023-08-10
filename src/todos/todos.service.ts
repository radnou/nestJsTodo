import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';

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

  create(todo: Todo) {
    this.todos.push(todo);
  }

  getTodo(id: string) {
    return this.todos.find((todo) => todo.id === Number(id));
  }
}
