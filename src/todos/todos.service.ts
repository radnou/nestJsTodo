import { Injectable, NotFoundException } from '@nestjs/common';
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

  getOne(id: string) {
    return this.todos.find((todo) => todo.id === Number(id));
  }

  update(id: string, todoWithUpdate: CreateTodoDto) {
    const todoToUpdate: Todo = this.getOne(id);
    if (!todoToUpdate) {
      return new NotFoundException('Todo id not found');
    }
    if (todoWithUpdate.hasOwnProperty('description')) {
      todoToUpdate.description = todoWithUpdate.description;
    }
    if (todoWithUpdate.hasOwnProperty('title')) {
      todoToUpdate.title = todoWithUpdate.title;
    }
    if (todoWithUpdate.hasOwnProperty('done')) {
      todoToUpdate.done = todoWithUpdate.done;
    }
    const refreshedTodos = this.todos.map((t) =>
      t.id !== +id ? t : todoToUpdate,
    );
    this.todos = [...refreshedTodos];
    return {
      updatedTodos: 1,
      todo: todoToUpdate,
    };
  }
  delete(id: string) {
    const nbTodosBeforeRemove = this.todos.length;
    const todoToDelete: Todo = this.getOne(id);
    if (!todoToDelete) {
      return new NotFoundException('Todo id not found');
    }
    this.todos = [...this.todos.filter((t) => t.id !== +id)];

    if (nbTodosBeforeRemove > this.todos.length) {
      return {
        deletedTodos: 1,
        nbTodos: this.todos.length,
      };
    } else {
      return {
        deletedTodos: 0,
        nbTodos: this.todos.length,
      };
    }
  }
}
