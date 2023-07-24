export type TodoProps = {
  id: number;
  title: string;
  text: string;
  completed: boolean;
};

export class Todo {
  public id: number;

  public title: string;

  public text: string;

  public completed: boolean;

  constructor(props: TodoProps) {
    this.id = props.id;
    this.title = props.title;
    this.text = props.text;
    this.completed = props.completed || false;
  }
}
