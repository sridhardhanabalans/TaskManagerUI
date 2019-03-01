import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})
export class MockServiceService {
  tasks: Task[];

  constructor() {
    this.tasks =
      [
        { taskId: 1, taskName: "Task 1", parentId: 2, parent: null, priority: 1, startDate: new Date(), endDate: new Date("2018-12-12") },
        { taskId: 2, taskName: "Task 2", parentId: 0, parent: null, priority: 3, startDate: new Date(), endDate: new Date("2018-12-06") },
      ];
  }

  GetAllTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  GetTaskById(id: number): Observable<Task>
  {
    console.log("Get Task is called for "+ id);
    return of(this.tasks[0]);
  }

  UpdateTask(task: Task): Observable<void>
  {
   console.log("Update Task is called for "+ task.taskId);
   return of();
  }

  AddTask(task: Task): Observable<void>
  {
   console.log("Add Task is called for "+ task.taskId);
   return of();
  }

  DeleteTask(id: number): Observable<void>
  {
    console.log("Delete Task is called for "+ id);
    return of();
  }

}
