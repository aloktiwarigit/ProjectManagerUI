import { Component, OnInit, NgModule, TemplateRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/Modal';
import { Project } from 'src/app/Classes/project';
import { ParentTask } from 'src/app/Classes/parent-task';
import { User } from 'src/app/Classes/user';
import { ProjectService } from 'src/app/Service/project.service';
import { DatePipe } from '@angular/common';
import { Task } from 'src/app/Classes/task';


@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [HttpClientModule],
  exports: [FormsModule]
})

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styles: []
})
export class AddTaskComponent implements OnInit {

  public parentId: number;
  public startDate: string;
  public endDate: string;
  public priority: number;
  public taskStatus: string;
  public userId: number;
  public projectId: number;
  public addTask: any;
  public taskId: number;
  public taskDesc: string;
  public isformValid: boolean = true;
  public isAddedSuccessFully: boolean = false;
  public isParentAddedSuccessFully: boolean = false;
  public isProjectSelected: boolean = false;
  public isParentTaskSelected: boolean = false;
  public isStartDateGreater: boolean = false;
  public isUserSelected: boolean = false;
  public ischecked: boolean = false;

  parentTaskmodalRef: BsModalRef;
  usermodalRef: BsModalRef;
  projectmodalRef: BsModalRef;
  listProjects: Project[];
  getParentTask: ParentTask[];
  listUser: User[];


  constructor(private _service: ProjectService, private ProjectmodalServ: BsModalService, private ParentTaskmodalServ: BsModalService, private UsermodalServ: BsModalService, public datepipe: DatePipe) {
      this._service.getAllProjects().subscribe(data => this.listProjects = data);
      this._service.getAllParentTask().subscribe(data => this.getParentTask = data);
      this._service.getAllUsers().subscribe(data => this.listUser = data);
  }

  ngOnInit() {
  }

  addNewTask(form: NgForm): void {
  this.isParentAddedSuccessFully = false;

    if (this.ischecked) {
      let ParentTaskDetails: ParentTask =
        { parentId: 0, parentTask: this.taskDesc }

      if (ParentTaskDetails.parentTask == undefined || ParentTaskDetails.parentTask == "") {
        this.isformValid = false;
      }
      else {
        this.isformValid = true;
        this._service.addParentTask(ParentTaskDetails).subscribe(data => this.addTask = data);
        this.isParentAddedSuccessFully = true;
        form.reset();
      }

    }
    else {
      let Taskdetails: Task =
      {
        taskId: 0,
        parentId: this.parentId,
        taskDescription: this.taskDesc,
        startDt: this.startDate,
        endDt: this.endDate,
        priority: this.priority,
        taskStatus: '',
        projectId: this.projectId,
        userId: this.userId
      };
      if (Taskdetails.priority == undefined)
        Taskdetails.priority = 15;
      if (Taskdetails.taskDescription == undefined || Taskdetails.parentId == undefined || Taskdetails.startDt == undefined || Taskdetails.endDt == undefined
        || Taskdetails.projectId == undefined || Taskdetails.userId == undefined
        || Taskdetails.taskDescription.length == 0) {
        this.isformValid = false;
      }
      else if (Date.parse(Taskdetails.startDt) > Date.parse(Taskdetails.endDt)) {
        this.isformValid = true;
        this.isAddedSuccessFully = false;
        this.isStartDateGreater = true;
      }
      else {
        this.isformValid = true;
        this.isStartDateGreater = false;
        this._service.addTask(Taskdetails).subscribe(data => this.addTask = data);
        this.isAddedSuccessFully = true;
        form.reset();
      }
    }
    window.scroll(0, 0);
  }
  resetTaskForm(form: NgForm): void {
    form.reset();

    this.isAddedSuccessFully = false;
    this.isParentAddedSuccessFully = false;
    this.isParentTaskSelected = false;
    this.isUserSelected = false;
    this.isProjectSelected = false;

    this.isformValid = true;
    this.isStartDateGreater = false;

    window.scroll(0, 0);
  }

  selectProject(ProjectId: number): void {
    this.projectId = ProjectId;
    this.isProjectSelected = true;
  }

  selectParentTask(ParentId: number): void {
    this.parentId = ParentId;
    this.isParentTaskSelected = true;

  }
  openProjectModal(tmpProject: TemplateRef<any>): void {
    this.projectmodalRef = this.ProjectmodalServ.show(tmpProject);
  }
  openParenttaskModal(tmpParentTask: TemplateRef<any>): void {
    this.parentTaskmodalRef = this.ParentTaskmodalServ.show(tmpParentTask);
  }
  searchProjectFilter(projectSearchCriteria: string): void {
    if (projectSearchCriteria != undefined && projectSearchCriteria.length != 0) {
      this._service.getAllProjects().subscribe(data => this.listProjects = data.filter(item => this.datepipe.transform(item.startDt, 'yyyy-MM-dd') === this.datepipe.transform(projectSearchCriteria, 'yyyy-MM-dd') || this.datepipe.transform(item.endDt, 'yyyy-MM-dd') === this.datepipe.transform(projectSearchCriteria, 'yyyy-MM-dd')
        || item.projId.toString() === projectSearchCriteria || item.projectDesc.toUpperCase() === projectSearchCriteria.toUpperCase()
        || item.priority.toString() === projectSearchCriteria || item.managerId.toString() === projectSearchCriteria));

    }
    else {
      this._service.getAllProjects().subscribe(data => this.listProjects = data);
    }

  }
  searchParentTaskFilter(ParentTaskSearchCriteria: string): void {
    if (ParentTaskSearchCriteria != undefined && ParentTaskSearchCriteria.length != 0) {
      this._service.getAllParentTask().subscribe(data => this.getParentTask = data.filter(item => item.parentId.toString() === ParentTaskSearchCriteria || item.parentTask.toUpperCase() === ParentTaskSearchCriteria.toUpperCase()));

    }
    else {
      this._service.getAllParentTask().subscribe(data => this.getParentTask = data);
    }

  }
  changeCheckBox(eve): void {
    if (eve.target.checked) {
      this.ischecked = true;
    }
    else {
      this.ischecked = false;
    }
  }
  trackParentTask(index: number, item: any) {

    return item ? item.ParentId : undefined;

  }
  trackProject(index: number, item: any) {

    return item ? item.ProjectId : undefined;

  }
  selectUser(UserId: number): void {
    this.userId = UserId;
    this.isUserSelected = true;
  }
  trackUser(index: number, item: any) {

    return item ? item.UserId : undefined;

  }
  searchUserFilter(Searchdetail: string): void {
    if (Searchdetail != undefined && Searchdetail.length != 0) {
      this._service.getAllUsers().subscribe(data => this.listUser = data.filter(item => item.fstName.toUpperCase() === Searchdetail.toUpperCase() || item.lstName.toUpperCase() === Searchdetail.toUpperCase()
        || item.empId.toUpperCase() === Searchdetail.toUpperCase() || item.userId.toString() === Searchdetail));

    }
    else {
      this._service.getAllUsers().subscribe(data => this.listUser = data);
    }

  }
  openUserModal(tmpUser: TemplateRef<any>): void {
    this.usermodalRef = this.UsermodalServ.show(tmpUser);
  }
  loadParentTask(): void {
    this._service.getAllParentTask().subscribe(data => this.getParentTask = data);
  }
}
