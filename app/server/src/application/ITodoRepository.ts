import { Todo } from "../domain/Todo";

export interface TodoRepository {
  getAll(): Promise<Todo[]>;
  add(todo: Todo): Promise<void>;
  update(todo: Todo): Promise<void>;
  delete(id: number): Promise<void>;
}
