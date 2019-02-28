import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient: HttpClient) { }

  baseApiURL: string = "http://localhost:59125/api/task/";
  //baseApiURL: string = "http://localhost/TaskManagerAPI/api/task/";

  GetAllTasks(): Observable<Task[]>
  {
    const URL = this.baseApiURL.concat("GetAllTasks");
    return this.httpClient.get<Task[]>(URL)
    .pipe(catchError(this._handleError));
  }

  GetTaskById(id: number): Observable<Task>
  {
    const URL = this.baseApiURL.concat("GetTaskById/",id.toString());
    return this.httpClient.get<Task>(URL)
    .pipe(catchError(this._handleError));
  }

  AddTask(task: Task): Observable<void>
  {
    const URL = this.baseApiURL.concat("AddTask");
    return this.httpClient.post<void>(URL,task)
    .pipe(catchError(this._handleError));
  }

  UpdateTask(task: Task): Observable<void>
  {
    const URL = this.baseApiURL.concat("UpdateTask");
    return this.httpClient.put<void>(URL,task)
    .pipe(catchError(this._handleError));
  }

  DeleteTask(id: number): Observable<void>
  {
    const URL = this.baseApiURL.concat("DeleteTask/",id.toString());
    return this.httpClient.delete<void>(URL)
    .pipe(catchError(this._handleError));
  }

  private _handleError(error: any): Observable<never>
  {
   if(error && error.error) 
   {
    return observableThrowError(error.error);
   }
   const errMsg=(error.message)? error.message : error.status ? '${error.status} - ${error.statusText}' : 'An unidentified error occurred. Time to debug!';
   return observableThrowError(errMsg);
  }


}
