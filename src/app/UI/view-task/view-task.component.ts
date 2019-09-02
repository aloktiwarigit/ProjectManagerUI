import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProjectService } from 'src/app/Service/project.service';
import { Task } from 'src/app/Classes/task';
import { DatePipe } from '@angular/common';
import { Project } from 'src/app/Classes/project';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/Modal';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styles: []
})
export class ViewTaskComponent implements OnInit {

  public projectId: number;
  list: Task[];
  listProject: Project[];
  public isProjectSelected: boolean = false;
  projectmodalRef: BsModalRef;



  constructor(private _service: ProjectService, private ProjectmodalServ: BsModalService, private route: ActivatedRoute, public datepipe: DatePipe) {
    this._service.getAllTask().subscribe(data => this.list = data);
    this._service.getAllProjects().subscribe(data => this.listProject = data);
  }

  ngOnInit() {
  }


  deleteTask(TaskId: number): void {
    let deleteResult: any;
    this._service.deleteTask(TaskId).subscribe(data => deleteResult = data);

    alert("Task has been deleted successfully..!");
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
  endTaskFlagUpdate(Item: Task): void {
    let updateResult: any;
    this._service.endTaskFlagUpdate(Item).subscribe(data => updateResult = data);

    alert("Task has been marked as End..!");
  }
  
  trackTask(index: number, item: any) {

    return item ? item.TaskID : undefined;

  }

  sortByStartDate(): void {
     this.list.sort((a, b) => {
      if (a.startDt < b.startDt) return -1;
      else if (a.startDt > b.startDt) return 1;
      else return 0;
    });

  }
  sortByEndDate(): void {
    this.list.sort((a, b) => {
      if (a.endDt < b.endDt) return -1;
      else if (a.endDt > b.endDt) return 1;
      else return 0;
    });

  }
  sortByPriority(): void {
    this.list.sort((a, b) => {
      if (a.priority < b.priority) return -1;
      else if (a.priority > b.priority) return 1;
      else return 0;
    });

  }
  sortByTaskCompleted(): void {
     this.list.sort((a, b) => {
      if (a.taskStatus < b.taskStatus) return -1;
      else if (a.taskStatus > b.taskStatus) return 1;
      else return 0;
    });

  }

  selectProject(ProjectId: number): void {
    this.projectId = ProjectId;
    this._service.getProjectTasks(ProjectId).subscribe(data => this.list = data);
    
    this.isProjectSelected = true;
  }
  openProjectModal(tmpProject: TemplateRef<any>): void {
    this.projectmodalRef = this.ProjectmodalServ.show(tmpProject);
  }




}
