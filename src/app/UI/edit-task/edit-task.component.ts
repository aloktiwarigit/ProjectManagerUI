import { Component, OnInit, TemplateRef } from '@angular/core';
import { Task } from 'src/app/Classes/task';
import { Project } from 'src/app/Classes/project';
import { ParentTask } from "src/app/Classes/parent-task";
import { User } from 'src/app/Classes/user';
import { ProjectService } from 'src/app/Service/project.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/Modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: []
})
export class EditTaskComponent implements OnInit {
  projectmodalRef: BsModalRef;
  parentTaskmodalRef: BsModalRef;
  usermodalRef: BsModalRef;
  public updateResult: any;
  public taskId: number;
  public taskDesc: string;
  public parentId: number;
  public startDate: string;
  public endDate: string;
  public priority: number;
  public taskStatus: string;
  public userId: number;
  public projectId: number;
  public parentDesc: string;

  public isformValid: boolean = true;
  public isUpdatedSuccessFully: boolean = false;

  public isProjectSelected: boolean = false;
  public isStartDateGreater: boolean = false;
  public isUserSelected: boolean = false;
  public isParentTaskSelected: boolean = false;

  listProject: Project[];
  listParentTask: ParentTask[];
  listUser: User[];
  constructor(private _service: ProjectService, private route: ActivatedRoute, private ProjectmodalServ: BsModalService, private ParentTaskmodalServ: BsModalService, private UsermodalServ: BsModalService, public datepipe: DatePipe) {
    this._service.getAllProjects().subscribe(data => this.listProject = data);
    this._service.getAllParentTask().subscribe(data => this.listParentTask = data);
    this._service.getAllUsers().subscribe(data => this.listUser = data);

    const id = this.route.snapshot.paramMap.get('taskid');
    this._service.getTask(parseInt(id)).subscribe(data => {
      this.taskId = data.taskId;
      this.taskDesc = data.taskDescription;
      this.priority = data.priority;
      this.startDate = data.startDt;
      this.endDate = data.endDt;
      this.parentId = data.parentId;
      this.projectId = data.projectId;
      this.userId = data.userId
    });


  }

  ngOnInit() {
  }

  updateTask(): void {
    this.isStartDateGreater = false;
    let Taskdetails: Task =
    {
      taskId: this.taskId,
      parentId: this.parentId,
      taskDescription: this.taskDesc,
      parentDesc:this.parentDesc,
      startDt: this.startDate,
      endDt: this.endDate,
      priority: this.priority,
      taskStatus: '',
      projectId: this.projectId,
      userId: this.userId
    };

    if (Taskdetails.taskDescription == undefined || Taskdetails.taskDescription == "" || Taskdetails.startDt == undefined || Taskdetails.endDt == undefined) {
      this.isformValid = false;

    }
    else if (Date.parse(Taskdetails.startDt) > Date.parse(Taskdetails.endDt)) {
    this.isUpdatedSuccessFully = false;
      this.isformValid = true;
      this.isStartDateGreater = true;
    }
    else {
      this.isformValid = true;
      this.isStartDateGreater = false;
      this._service.editTask(Taskdetails.taskId, Taskdetails).subscribe(data => this.updateResult = data);
      this.isUpdatedSuccessFully = true;

    }
    window.scroll(0, 0);

  }


  selectParentTask(ParentId: number): void {
    this.parentId = ParentId;
    this.parentTaskmodalRef.hide();
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
      this._service.getAllProjects().subscribe(data => this.listProject = data.filter(item =>
        item.projId.toString() === projectSearchCriteria || item.projectDesc.toUpperCase() === projectSearchCriteria.toUpperCase()
        || item.priority.toString() === projectSearchCriteria || item.managerId.toString() === projectSearchCriteria));

    }
    else {
      this._service.getAllProjects().subscribe(data => this.listProject = data);
    }

  }
  searchParentTaskFilter(ParentTaskSearchCriteria: string): void {
    if (ParentTaskSearchCriteria != undefined && ParentTaskSearchCriteria.length != 0) {
      this._service.getAllParentTask().subscribe(data => this.listParentTask = data.filter(item => item.parentId.toString() === ParentTaskSearchCriteria || item.parentTask.toUpperCase() === ParentTaskSearchCriteria.toUpperCase()));

    }
    else {
      this._service.getAllParentTask().subscribe(data => this.listParentTask = data);
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
    this.usermodalRef.hide();
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

}
