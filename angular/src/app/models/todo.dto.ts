export interface TodoDto {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
}
