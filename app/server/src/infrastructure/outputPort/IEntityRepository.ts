export interface EntityRepository<T> {
  getAll(): Promise<T>;
  add(todo: T): Promise<T>;
  update(todo: T): Promise<T>;
  delete(id: number): Promise<T>;
}
