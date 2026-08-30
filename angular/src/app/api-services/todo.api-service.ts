import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../api.routes';
import { CreateTodoRequest } from '../requests/create-todo.request';
import { UpdateTodoRequest } from '../requests/update-todo.request';
import { TodoDto } from '../models/todo.dto';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  private http = inject(HttpClient);

  public getTodos(): Observable<TodoDto[]> {
    return this.http.get<TodoDto[]>(API_ROUTES.todos);
  }

  public createTodo(createTodoRequest: CreateTodoRequest): Observable<TodoDto> {
    return this.http.post<TodoDto>(API_ROUTES.todos, createTodoRequest.toJson());
  }

  public updateTodo(id: number, updateTodoRequest: UpdateTodoRequest): Observable<TodoDto> {
    return this.http.put<TodoDto>(`${API_ROUTES.todos}/${id}`, updateTodoRequest.toJson());
  }

  public deleteTodo(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_ROUTES.todos}/${id}`);
  }

  public clearCompleted(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(API_ROUTES.clearCompletedTodos);
  }
}
