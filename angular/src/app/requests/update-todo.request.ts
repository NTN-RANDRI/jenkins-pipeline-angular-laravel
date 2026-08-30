export class UpdateTodoRequest {
  public constructor(
    private title?: string,
    private completed?: boolean,
    private priority?: 'low' | 'medium' | 'high',
  ) {}

  public toJson(): Record<string, any> {
    const data: Record<string, any> = {};

    if (this.title !== undefined) {
      data['title'] = this.title;
    }

    if (this.completed !== undefined) {
      data['completed'] = this.completed;
    }

    if (this.priority !== undefined) {
      data['priority'] = this.priority;
    }

    return data;
  }
}
