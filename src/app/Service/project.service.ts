import { Injectable, NgModule } from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import {Observable} from 'node_modules/rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../Classes/task';
import {User} from '../Classes/user';
import {Project} from '../Classes/project';
import { ParentTask } from '../Classes/parent-task';

@NgModule({
  providers: [ HttpClient]
})
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

private _apiUrl = "http://localhost/ProjectManagerAPI/api/";
  constructor(private _http:HttpClient) {

   }

GetAllUsers():Observable<User[]>
{
  return  this._http.get<User[]>(this._apiUrl+"Users").pipe(map(x=>x));
}
AddNewUser(Item:User):Observable<any>
{
  return this._http.post(this._apiUrl+"User",Item)
  .pipe(map(x=>x));
}

UpdateUser(UserId :number, Item: User):Observable<any>
  {
    return  this._http.put(this._apiUrl+"Users/"+UserId,Item).pipe(map(x=>x));
  }
  
  
  DeleteUser(UserId :number):Observable<any>
  {
    return  this._http.delete(this._apiUrl+"Users/"+UserId).pipe(map(x=>x));
  }
  
  GetAllProjects():Observable<Project[]>
  {
    return  this._http.get<Project[]>(this._apiUrl+"Projects").pipe(map(x=>x));
  }
  AddNewProjects(Item:Project):Observable<any>
  {
    return this._http.post(this._apiUrl+"Projects",Item)
    .pipe(map(x=>x));
  }
  
  UpdateProjects(ProjectId :number, Item: Project):Observable<any>
    {
      return  this._http.put(this._apiUrl+"Projects/"+ProjectId,Item).pipe(map(x=>x));
    }
    
    
    DeleteProjects(ProjectId :number):Observable<any>
    {
      return  this._http.delete(this._apiUrl+"Projects/"+ProjectId).pipe(map(x=>x));
    }

    GetAllParentTask() : Observable<ParentTask[]>
  {
    return  this._http.get<ParentTask[]>(this._apiUrl+"ParentTasks").pipe(map(x=>x));

  }
  AddNewParentTask(Item:ParentTask):Observable<any>
  {
    return this._http.post(this._apiUrl+"ParentTasks",Item)
    .pipe(map(x=>x));
  }
  GetAllTask() : Observable<Task[]>
  {
    return  this._http.get<Task[]>(this._apiUrl+"Tasks").pipe(map(x=>x));

  }
  GetTask(TaskId :number) : Observable<Task>
  {
    return  this._http.get<Task>(this._apiUrl+"Tasks/"+TaskId).pipe(map(x=>x));

  }
  AddNewTask(Item:Task):Observable<any>
  {
    return this._http.post(this._apiUrl+"Tasks",Item)
    .pipe(map(x=>x));
  }
  UpdateTask(TaskId :number, Item: Task):Observable<any>
  {
    return  this._http.put(this._apiUrl+"Tasks/"+TaskId,Item).pipe(map(x=>x));
  }
  
  EndTaskFlagUpdate(Item: Task):Observable<any>
  {
    return  this._http.put(this._apiUrl+"Tasks",Item).pipe(map(x=>x));
  }
  DeleteTask(TaskId :number):Observable<any>
  {
    return  this._http.delete(this._apiUrl+"Tasks/"+TaskId).pipe(map(x=>x));
  }
}
