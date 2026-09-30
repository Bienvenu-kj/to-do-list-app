import { Injectable, signal } from '@angular/core';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksManagerService {
  constructor() {}

  tasks = signal<Task[]>(
    JSON.parse(localStorage.getItem('unfinishedTasks') as string) || [],
  );
  taskToEdit = signal<Task>({
    taskName: '',
    etat: '',
  });
  taskToDelete = signal<Task>({
    taskName: '',
  });
  completedTasks = signal<Task[]>(
    JSON.parse(localStorage.getItem('finishedTasks') as string) || [],
  );

  markTaskAsCompleted(id: number | undefined) {
    const incompleteTasks: Task[] =
      JSON.parse(localStorage.getItem('unfinishedTasks') as string) || [];
    let taskIndex = 0;
    const completedTask = incompleteTasks.find((task, index) => {
      taskIndex = index;
      return task.id === id;
    });

    incompleteTasks.splice(taskIndex, 1);
    localStorage.setItem('unfinishedTasks', JSON.stringify(incompleteTasks));
    this.refreshTasks();

    let completedTasks =
      JSON.parse(localStorage.getItem('finishedTasks') as string) || [];
    completedTasks.unshift({
      taskName: `${completedTask?.taskName}`,
      etat: 'terminée',
      id: completedTask?.id,
      notification: completedTask?.notification,
    });
    localStorage.setItem('finishedTasks', JSON.stringify(completedTasks));
    this.refreshCompletedTasks();
  }

  markTaskAsIncomplete(id: number | undefined) {
    const completedTasks: Task[] =
      JSON.parse(localStorage.getItem('finishedTasks') as string) || [];
    let taskIndex = 0;
    const incompleteTask = completedTasks.find((task, index) => {
      taskIndex = index;
      return task.id === id;
    });

    completedTasks.splice(taskIndex, 1);
    localStorage.setItem('finishedTasks', JSON.stringify(completedTasks));
    this.refreshCompletedTasks();

    let incompleteTasks =
      JSON.parse(localStorage.getItem('unfinishedTasks') as string) || [];
    incompleteTasks.unshift({
      taskName: `${incompleteTask?.taskName}`,
      etat: 'Non terminée',
      id: incompleteTask?.id,
      notification: incompleteTask?.notification,
    });
    localStorage.setItem('unfinishedTasks', JSON.stringify(incompleteTasks));
    this.refreshTasks();
  }

  deleteTask(id: number) {
    this.refreshTasks();
    this.refreshCompletedTasks();
    let task: Task;
    let index: number;
    let allTasks = [...this.tasks(), ...this.completedTasks()];
    for (let index = 0; index < allTasks.length; index++) {
      task = allTasks[index];
      if (task.id === id) {
        this.taskToDelete.set(task);
        break;
      }
    }
    if (this.taskToDelete().etat?.toLocaleLowerCase() === 'non terminée') {
      index = this.tasks().indexOf(this.taskToDelete());
      this.tasks().splice(index, 1);
      localStorage.setItem('unfinishedTasks', JSON.stringify(this.tasks()));
      this.refreshTasks();
    } else if (
      this.taskToDelete().etat?.toLocaleLowerCase() === 'terminée'
    ) {
      index = this.completedTasks().indexOf(this.taskToDelete());
      this.completedTasks().splice(index, 1);
      localStorage.setItem(
        'finishedTasks',
        JSON.stringify(this.completedTasks()),
      );
      this.refreshCompletedTasks();
    }
  }

  selectTaskToEdit(id: number) {
    let allTasks = [...this.tasks(), ...this.completedTasks()];
    this.taskToEdit.set(
      allTasks.filter((task) => task.id === id)[0],
    );
  }

  updateTask(task: Task) {
    let index;
    if (task.notification) {
      this.taskToEdit().notification = task.notification;
    }
    if (this.taskToEdit().etat?.toLocaleLowerCase() === 'non terminée') {
      index = this.tasks().indexOf(this.taskToEdit());
      this.tasks()[index].taskName = task.taskName;
      localStorage.setItem('unfinishedTasks', JSON.stringify(this.tasks()));
      this.refreshTasks();
    } else if (
      this.taskToEdit().etat?.toLocaleLowerCase() === 'terminée'
    ) {
      index = this.completedTasks().indexOf(this.taskToEdit());
      this.completedTasks()[index].taskName = task.taskName;
      localStorage.setItem(
        'finishedTasks',
        JSON.stringify(this.completedTasks()),
      );
      this.refreshCompletedTasks();
    }
  }

  addTask(task: Task) {
    let tasks: Task[] =
      JSON.parse(localStorage.getItem('unfinishedTasks') as string) || [];
    const id = tasks.length + 1;
    localStorage.setItem('id', `${id}`);
    tasks.unshift({
      taskName: task.taskName,
      etat: `Non terminée`,
      id: id,
      notification: task.notification,
    });
    localStorage.setItem('unfinishedTasks', JSON.stringify(tasks));
    this.refreshTasks();
  }
  refreshTasks() {
    this.tasks.set(
      JSON.parse(localStorage.getItem('unfinishedTasks') as string) || [],
    );
  }
  refreshCompletedTasks() {
    this.completedTasks.set(
      JSON.parse(localStorage.getItem('finishedTasks') as string) || [],
    );
  }
}
