export class EntityRepository<T> {
  // Define the method to get all todos.
  getAll(): Promise<T> {
    return Promise.reject(new Error("Method not implemented."));
  }

  // Define the method to add a new todo.
  add(todo: T): Promise<void> {
    return Promise.reject(new Error("Method not implemented."));
  }

  // Define the method to update an existing todo.
  update(todo: T): Promise<void> {
    return Promise.reject(new Error("Method not implemented."));
  }

  // Define the method to delete a todo by its id.
  delete(id: number): Promise<void> {
    return Promise.reject(new Error("Method not implemented."));
  }

  constructor(parameters: any) {
    // Your constructor logic here (if needed).
  }
}
