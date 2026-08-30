export class CreateTodoRequest {
  public constructor(
    private title: string,
    private priority: 'low' | 'medium' | 'high' = 'medium',
  ) {}

  public toJson(): Record<string, any> {
    return {
      title: this.title,
      priority: this.priority,
    };
  }
}
