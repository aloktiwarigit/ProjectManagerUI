import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule}   from '@angular/forms';
import { ProjectService } from './Service/project.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './UI/add-project/add-project.component';
import { AddTaskComponent } from './UI/add-task/add-task.component';
import { AddUserComponent } from './UI/add-user/add-user.component';
import { ViewTaskComponent } from './UI/view-task/view-task.component';
import { EditTaskComponent } from './UI/edit-task/edit-task.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/Modal';




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
    AppRoutingModule,
    BrowserModule,  
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [ProjectService,HttpClientModule,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
