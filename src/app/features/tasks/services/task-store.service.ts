import { Injectable, signal } from '@angular/core';

import { Task, TaskInput, TaskStatus } from '../models/task.model';

type TaskStorageKey = 'unfinishedTasks' | 'finishedTasks';

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  tasks = signal<Task[]>(this.readTasks('unfinishedTasks', 'incomplete'));
  taskToEdit = signal<Task | null>(null);
  completedTasks = signal<Task[]>(this.readTasks('finishedTasks', 'completed'));

  markTaskAsCompleted(id: number): void {
    const completedTask = this.tasks().find((task) => task.id === id);
    if (!completedTask) return;

    const incompleteTasks = this.tasks().filter((task) => task.id !== id);
    const completedTasks = [
      { ...completedTask, status: 'completed' as const },
      ...this.completedTasks(),
    ];

    this.saveTasks('unfinishedTasks', incompleteTasks);
    this.saveTasks('finishedTasks', completedTasks);
  }

  markTaskAsIncomplete(id: number): void {
    const incompleteTask = this.completedTasks().find((task) => task.id === id);
    if (!incompleteTask) return;

    const completedTasks = this.completedTasks().filter(
      (task) => task.id !== id,
    );
    const incompleteTasks = [
      { ...incompleteTask, status: 'incomplete' as const },
      ...this.tasks(),
    ];

    this.saveTasks('finishedTasks', completedTasks);
    this.saveTasks('unfinishedTasks', incompleteTasks);
  }

  deleteTask(id: number): void {
    const taskToDelete = [...this.tasks(), ...this.completedTasks()].find(
      (task) => task.id === id,
    );
    if (!taskToDelete) return;

    if (taskToDelete.status === 'incomplete') {
      this.saveTasks(
        'unfinishedTasks',
        this.tasks().filter((task) => task.id !== id),
      );
    } else {
      this.saveTasks(
        'finishedTasks',
        this.completedTasks().filter((task) => task.id !== id),
      );
    }
  }

  selectTaskToEdit(id: number): void {
    const selectedTask = [...this.tasks(), ...this.completedTasks()].find(
      (task) => task.id === id,
    );
    this.taskToEdit.set(selectedTask ?? null);
  }

  updateTask(taskInput: TaskInput): void {
    const taskToEdit = this.taskToEdit();
    if (!taskToEdit) return;

    const updatedTask: Task = { ...taskToEdit, ...taskInput };
    if (taskToEdit.status === 'incomplete') {
      this.saveTasks(
        'unfinishedTasks',
        this.tasks().map((task) =>
          task.id === taskToEdit.id ? updatedTask : task,
        ),
      );
    } else {
      this.saveTasks(
        'finishedTasks',
        this.completedTasks().map((task) =>
          task.id === taskToEdit.id ? updatedTask : task,
        ),
      );
    }
  }

  addTask(taskInput: TaskInput): void {
    const task: Task = {
      ...taskInput,
      id: this.getNextTaskId(),
      status: 'incomplete',
    };
    this.saveTasks('unfinishedTasks', [task, ...this.tasks()]);
  }

  refreshTasks(): void {
    this.tasks.set(this.readTasks('unfinishedTasks', 'incomplete'));
  }

  refreshCompletedTasks(): void {
    this.completedTasks.set(this.readTasks('finishedTasks', 'completed'));
  }

  private saveTasks(storageKey: TaskStorageKey, tasks: Task[]): void {
    localStorage.setItem(storageKey, JSON.stringify(tasks));

    if (storageKey === 'unfinishedTasks') {
      this.tasks.set(tasks);
    } else {
      this.completedTasks.set(tasks);
    }
  }

  private readTasks(
    storageKey: TaskStorageKey,
    defaultStatus: TaskStatus,
  ): Task[] {
    const storedValue = localStorage.getItem(storageKey);
    if (!storedValue) return [];

    try {
      const parsedValue: unknown = JSON.parse(storedValue);
      if (!Array.isArray(parsedValue)) return [];

      let nextGeneratedId = this.getHighestStoredTaskId() + 1;
      const tasks = parsedValue.flatMap((value): Task[] => {
        if (!this.isRecord(value) || typeof value['taskName'] !== 'string') {
          return [];
        }

        const status = this.readTaskStatus(value, defaultStatus);
        const task: Task = {
          id:
            typeof value['id'] === 'number' && Number.isFinite(value['id'])
              ? value['id']
              : nextGeneratedId++,
          taskName: value['taskName'],
          status,
        };

        if (typeof value['notification'] === 'string') {
          task.notification = value['notification'];
        }

        return [task];
      });

      const normalizedValue = JSON.stringify(tasks);
      if (normalizedValue !== storedValue) {
        localStorage.setItem(storageKey, normalizedValue);
      }

      return tasks;
    } catch {
      return [];
    }
  }

  private readTaskStatus(
    value: Record<string, unknown>,
    defaultStatus: TaskStatus,
  ): TaskStatus {
    if (value['status'] === 'incomplete' || value['status'] === 'completed') {
      return value['status'];
    }

    if (typeof value['etat'] === 'string') {
      return value['etat'].toLocaleLowerCase() === 'terminée'
        ? 'completed'
        : 'incomplete';
    }

    return defaultStatus;
  }

  private getNextTaskId(): number {
    const ids = [...this.tasks(), ...this.completedTasks()].map(
      (task) => task.id,
    );
    return Math.max(0, ...ids) + 1;
  }

  private getHighestStoredTaskId(): number {
    const storageKeys: TaskStorageKey[] = ['unfinishedTasks', 'finishedTasks'];
    const ids = storageKeys.flatMap((storageKey) => {
      try {
        const storedTasks: unknown = JSON.parse(
          localStorage.getItem(storageKey) ?? '[]',
        );
        if (!Array.isArray(storedTasks)) return [];

        return storedTasks.flatMap((task): number[] =>
          this.isRecord(task) &&
          typeof task['id'] === 'number' &&
          Number.isFinite(task['id'])
            ? [task['id']]
            : [],
        );
      } catch {
        return [];
      }
    });

    return Math.max(0, ...ids);
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
