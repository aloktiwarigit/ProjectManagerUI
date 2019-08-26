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

private _apiUrl = "http://localhost:8476/";
  constructor(private _http:HttpClient) {

   }

getAllUsers():Observable<User[]>
{
  return  this._http.get<User[]>(this._apiUrl+"User/getAllUsers").pipe(map(x=>x));
}
addUser(Item:User):Observable<any>
{
  return this._http.post(this._apiUrl+"User/addUser",Item)
  .pipe(map(x=>x));
}

editUser(UserId :number, Item: User):Observable<any>
  {
    return  this._http.put(this._apiUrl+"User/editUser/"+UserId,Item).pipe(map(x=>x));
  }
  
  
  deleteUser(UserId :number):Observable<any>
  {
    return  this._http.delete(this._apiUrl+"User/deleteUser/"+UserId).pipe(map(x=>x));
  }
  
  getAllProjects():Observable<Project[]>
  {
    return  this._http.get<Project[]>(this._apiUrl+"Project/getAllProjects").pipe(map(x=>x));
  }
  addProject(Item:Project):Observable<any>
  {
    return this._http.post(this._apiUrl+"Project/addProject",Item)
    .pipe(map(x=>x));
  }
  
  editProject(ProjectId :number, Item: Project):Observable<any>
    {
      return  this._http.put(this._apiUrl+"Project/addProject"+ProjectId,Item).pipe(map(x=>x));
    }
    
    
  deleteProject(ProjectId :number):Observable<any>
    {
      return  this._http.delete(this._apiUrl+"Project/deleteProject"+ProjectId).pipe(map(x=>x));
    }

  getAllParentTask() : Observable<ParentTask[]>
  {
    return  this._http.get<ParentTask[]>(this._apiUrl+"ParentTasks/getAllParentTask").pipe(map(x=>x));

  }
  addParentTask(Item:ParentTask):Observable<any>
  {
    return this._http.post(this._apiUrl+"ParentTasks/addPatrentTask",Item)
    .pipe(map(x=>x));
  }
  getAllTask() : Observable<Task[]>
  {
    return  this._http.get<Task[]>(this._apiUrl+"Task/getAllTasks").pipe(map(x=>x));

  }
  getTask(TaskId :number) : Observable<Task>
  {
    return  this._http.get<Task>(this._apiUrl+"Task/getTask"+TaskId).pipe(map(x=>x));

  }
  addTask(Item:Task):Observable<any>
  {
    return this._http.post(this._apiUrl+"Task/addTask",Item)
    .pipe(map(x=>x));
  }
  editTask(TaskId :number, Item: Task):Observable<any>
  {
    return  this._http.put(this._apiUrl+"Task/addTask"+TaskId,Item).pipe(map(x=>x));
  }
  
  endTaskUpdateFlag(Item: Task):Observable<any>
  {
    return  this._http.put(this._apiUrl+"Task/endTask",Item).pipe(map(x=>x));
  }
  deleteTask(TaskId :number):Observable<any>
  {
    return  this._http.delete(this._apiUrl+"Task/deleteTask"+TaskId).pipe(map(x=>x));
  }
}
