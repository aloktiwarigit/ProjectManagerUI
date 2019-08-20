import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './UI/add-user/add-user.component';
import { AddProjectComponent } from './UI/add-project/add-project.component';
import { AddTaskComponent } from './UI/add-task/add-task.component';
import { ViewTaskComponent } from './UI/view-task/view-task.component';
import { EditTaskComponent } from './UI/edit-task/edit-task.component';

const routes: Routes = [
  {path:'', redirectTo:'/view-task' , pathMatch:'full'},
  {path:'add-user',component:AddUserComponent},
  {path:'add-project',component:AddProjectComponent},
{path:'add-task',component:AddTaskComponent},
{path:'view-task',component:ViewTaskComponent},
{path:'edit-task/:taskid',component:EditTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
