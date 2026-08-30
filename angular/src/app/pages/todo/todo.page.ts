import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthState } from '@/app/states/auth.state';
import { AuthentificationApiService } from '@/app/api-services/authentification.api-service';
import { TodoApiService } from '@/app/api-services/todo.api-service';
import { TodoDto } from '@/app/models/todo.dto';
import { CreateTodoRequest } from '@/app/requests/create-todo.request';
import { UpdateTodoRequest } from '@/app/requests/update-todo.request';

export interface TodoItem {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './todo.page.html',
  styleUrl: './todo.page.css',
})
export class TodoPage implements OnInit {
  private authState = inject(AuthState);
  private authApi = inject(AuthentificationApiService);
  private todoApi = inject(TodoApiService);
  private router = inject(Router);

  // User state
  protected user = this.authState.getUser;

  // UI States
  protected isUserMenuOpen = signal(false);
  protected isLogoutModalOpen = signal(false);
  protected isLoggingOut = signal(false);
  protected isLoading = signal(false);
  protected isSubmitting = signal(false);
  protected errorMessage = signal<string | null>(null);

  // Todo states
  protected tasks = signal<TodoItem[]>([]);
  protected newTaskTitle = signal('');
  protected newTaskPriority = signal<'low' | 'medium' | 'high'>('medium');
  protected currentFilter = signal<'all' | 'pending' | 'completed'>('all');
  protected searchQuery = signal('');

  // Computed stats
  protected totalCount = computed(() => this.tasks().length);
  protected completedCount = computed(() => this.tasks().filter(t => t.completed).length);
  protected pendingCount = computed(() => this.tasks().filter(t => !t.completed).length);
  
  protected completionPercentage = computed(() => {
    const total = this.totalCount();
    if (total === 0) return 0;
    return Math.round((this.completedCount() / total) * 100);
  });

  protected filteredTasks = computed(() => {
    const filter = this.currentFilter();
    const query = this.searchQuery().trim().toLowerCase();
    
    return this.tasks().filter(task => {
      // Filter by status
      const matchesFilter =
        filter === 'all' ||
        (filter === 'pending' && !task.completed) ||
        (filter === 'completed' && task.completed);

      // Filter by search query
      const matchesSearch = !query || task.title.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  });

  ngOnInit() {
    this.loadTasks();
  }

  // Load Tasks from Backend API
  protected loadTasks() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.todoApi.getTodos().subscribe({
      next: (todos: TodoDto[]) => {
        this.tasks.set(todos);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load todos from API', err);
        this.errorMessage.set('Impossible de charger les tâches.');
        this.isLoading.set(false);
      },
    });
  }

  // Task Actions
  protected addTask() {
    const title = this.newTaskTitle().trim();
    if (!title || this.isSubmitting()) return;

    this.isSubmitting.set(true);
    const request = new CreateTodoRequest(title, this.newTaskPriority());

    this.todoApi.createTodo(request).subscribe({
      next: (createdTodo: TodoDto) => {
        this.tasks.update(tasks => [createdTodo, ...tasks]);
        this.newTaskTitle.set('');
        this.isSubmitting.set(false);
      },
      error: (err) => {
        console.error('Failed to create todo', err);
        this.isSubmitting.set(false);
      },
    });
  }

  protected toggleTask(id: number) {
    const task = this.tasks().find(t => t.id === id);
    if (!task) return;

    const newCompleted = !task.completed;
    
    // Optimistic update
    this.tasks.update(tasks =>
      tasks.map(t => (t.id === id ? { ...t, completed: newCompleted } : t))
    );

    const request = new UpdateTodoRequest(undefined, newCompleted);
    this.todoApi.updateTodo(id, request).subscribe({
      next: (updatedTodo: TodoDto) => {
        this.tasks.update(tasks =>
          tasks.map(t => (t.id === id ? updatedTodo : t))
        );
      },
      error: (err) => {
        console.error('Failed to update todo status', err);
        // Rollback optimistic update
        this.tasks.update(tasks =>
          tasks.map(t => (t.id === id ? { ...t, completed: !newCompleted } : t))
        );
      },
    });
  }

  protected deleteTask(id: number) {
    const previousTasks = this.tasks();
    // Optimistic delete
    this.tasks.update(tasks => tasks.filter(t => t.id !== id));

    this.todoApi.deleteTodo(id).subscribe({
      error: (err) => {
        console.error('Failed to delete todo', err);
        // Rollback
        this.tasks.set(previousTasks);
      },
    });
  }

  protected clearCompleted() {
    const previousTasks = this.tasks();
    // Optimistic clear
    this.tasks.update(tasks => tasks.filter(t => !t.completed));

    this.todoApi.clearCompleted().subscribe({
      error: (err) => {
        console.error('Failed to clear completed todos', err);
        // Rollback
        this.tasks.set(previousTasks);
      },
    });
  }

  // Menu and Modal handlers
  protected toggleUserMenu() {
    this.isUserMenuOpen.update(v => !v);
  }

  protected closeUserMenu() {
    this.isUserMenuOpen.set(false);
  }

  protected openLogoutModal() {
    this.closeUserMenu();
    this.isLogoutModalOpen.set(true);
  }

  protected closeLogoutModal() {
    this.isLogoutModalOpen.set(false);
  }

  protected confirmLogout() {
    this.isLoggingOut.set(true);
    this.authApi.logout().subscribe({
      next: () => {
        this.isLoggingOut.set(false);
        this.isLogoutModalOpen.set(false);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.isLoggingOut.set(false);
        this.isLogoutModalOpen.set(false);
        this.router.navigate(['/login']);
      }
    });
  }
}
