export class Todo {
  public id: number;

  public title: string;

  public text: string;

  public completed: boolean;

  constructor(props: Todo) {
    this.id = props.id;
    this.title = props.title;
    this.text = props.text;
    this.completed = props.completed || false;
  }
}
