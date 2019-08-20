import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './UI/add-project/add-project.component';
import { AddTaskComponent } from './UI/add-task/add-task.component';
import { AddUserComponent } from './UI/add-user/add-user.component';
import { ViewTaskComponent } from './UI/view-task/view-task.component';
import { EditTaskComponent } from './UI/edit-task/edit-task.component';




@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddTaskComponent,
    AddUserComponent,
    ViewTaskComponent,
    EditTaskComponent,
    
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
