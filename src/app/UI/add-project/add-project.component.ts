import { User } from 'src/app/Classes/user';
import { Project } from 'src/app/Classes/project';
import { Component, OnInit, NgModule, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectService } from 'src/app/Service/project.service';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/Modal';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:[ReactiveFormsModule,FormsModule,BrowserModule,HttpClientModule],
  providers: [ HttpClientModule],
  exports:[FormsModule]
})

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styles: []
})
export class AddProjectComponent implements OnInit {
 
public   isChecked:boolean=false;
public   projId:number;
public   projDesc:string;
public   startDt:string;
public   endDt:string;
public   priority:number;
public   managerId :number;
public   projDt:Date;
public   insertProject: any;
public   isManagerSelected:boolean=false;
public   isformValid :boolean=true;
public   isAddedSuccessFully:boolean=false;
public   isDeletedSuccessFully:boolean=false;
public   isUpdatedSuccessFully:boolean=false;
public   isStartDateGreater:boolean=true;
public   isEdit:boolean=false;
listManager:User[];
listProjects:Project[];
modalRef:BsModalRef;

constructor(private modalServ:BsModalService,private _service:ProjectService,public datepipe: DatePipe) {
    
    this._service.getAllUsers().subscribe(data=>this.listManager=data);
    this._service.getAllProjects().subscribe(data=>this.listProjects=data);
   }

  ngOnInit() {
  }
  resetForm(form: NgForm):void 
  {
    form.reset();
    this.isAddedSuccessFully=false;
    this.isDeletedSuccessFully=false;
    this.isUpdatedSuccessFully=false;
    this.isformValid=true;
    this.isStartDateGreater=true;
    this.isEdit=false;
    window.scroll(0,0);
  }
  openModal(tmpManager: TemplateRef<any>):void
  {
    this.modalRef=this.modalServ.show(tmpManager);
  }

  trackUser(index:number, item:any) {
 
    return item ? item.UserId : undefined;
  
  }

  trackProject(index:number, item:any) {
 
    return item ? item.ProjectId : undefined;
  
  }
  searchFilter(searchDetail:string):void
  {
    if(searchDetail!=undefined && searchDetail.length!=0)
    {
  this._service.getAllUsers().subscribe(data=>this.listManager=data.filter(item=>item.fstName.toUpperCase()===searchDetail.toUpperCase()|| item.lstName.toUpperCase()===searchDetail.toUpperCase()
  || item.empId.toUpperCase()===searchDetail.toUpperCase()|| item.userId.toString()===searchDetail ));

    }
    else
    {
      this._service.getAllUsers().subscribe(data=>this.listManager=data);
    }
     
  }

  
  changeCheckBox(eve):void
  {
   if( eve.target.checked)
   {
  this.isChecked=true;
    }
    else
    {
      this.isChecked=false;
    }
  }

 
  sortByStartDate():void
  {
      this._service.getAllProjects().subscribe(data=>this.listProjects=data.sort((a, b) => {
        if (a.startDt < b.startDt) return -1;
        else if (a.startDt > b.startDt) return 1;
        else return 0;
      }));
      
  }
  
  sortByPriority():void
  {
      this._service.getAllProjects().subscribe(data=>this.listProjects=data.sort((a, b) => {
        if (a.priority < b.priority) return -1;
        else if (a.priority > b.priority) return 1;
        else return 0;
      }));
      
  }
 
  sortByEndDate():void
  {
      this._service.getAllProjects().subscribe(data=>this.listProjects=data.sort((a, b) => {
        if (a.endDt < b.endDt) return -1;
        else if (a.endDt > b.endDt) return 1;
        else return 0;
      }));
      
  }

  
  editProjBind(Project : Project):void 
  {
    this.isAddedSuccessFully=false;
    this.isDeletedSuccessFully=false;
    this.isUpdatedSuccessFully=false;
    this.isformValid=true;
    this.isEdit=true;
  this.projId=Project.projId;
  this.projDesc=Project.projectDesc;
  this.priority=Project.priority;
  this.startDt=Project.startDt;
  this.endDt=Project.endDt;
  this.managerId=Project.managerId;
  window.scroll(0,0);
  }
  
  selectManger(managerId:number):void
  {
    this.managerId=managerId;
    this.isManagerSelected=true;
  }

  addProject(form: NgForm):void 
  {
    let projDtls:Project=
    {
    projId:0,
    projectDesc:this.projDesc,
    priority : this.priority,
     managerId:this.managerId,
     startDt:"",
     endDt:""};
  if(this.isChecked)
  {
    projDtls.startDt=this.startDt;
    projDtls.endDt= this.endDt
  }
  else
  {
    this.projDt= new Date();
    projDtls.startDt= this.projDt.toString();
    projDtls.endDt= this.projDt.setDate(this.projDt.getDate()+1).toString(); 
    
    projDtls.startDt=this.datepipe.transform(projDtls.startDt, 'yyyy-MM-dd');
    projDtls.endDt=this.datepipe.transform(projDtls.endDt, 'yyyy-MM-dd');
  }
    this.isEdit=false;
    this.isDeletedSuccessFully=false;
    this.isUpdatedSuccessFully=false;
  if(projDtls.priority==undefined)
  projDtls.priority=15;
  if(projDtls.projectDesc == undefined||projDtls.managerId==undefined||
    projDtls.startDt ==undefined||projDtls.endDt==undefined||
    projDtls.projectDesc==""||projDtls.managerId===0
    || projDtls.startDt ==""||projDtls.endDt=="")
  {
    
    this.isformValid=false;
    this.isAddedSuccessFully =false;
    
  }
  else if(Date.parse(projDtls.startDt)>Date.parse(projDtls.endDt))
  {
    this.isformValid=true;
    this.isAddedSuccessFully =false;
    this.isStartDateGreater=false;
  }
  else
  {
    this.isformValid=true;
    this.isStartDateGreater=true;
  this._service.addProject(projDtls).subscribe(data=>this.insertProject=data);
  this.isAddedSuccessFully =true;
  
  form.reset();
  
  }
  window.scroll(0,0);
  }
  projSearchFilter(projectSearchCriteria: string):void
  {
    if(projectSearchCriteria!=undefined && projectSearchCriteria.length!=0)
    {
  this._service.getAllProjects().subscribe(data=>this.listProjects=data.filter(item=>this.datepipe.transform(item.startDt, 'yyyy-MM-dd')===this.datepipe.transform(projectSearchCriteria, 'yyyy-MM-dd')|| this.datepipe.transform(item.endDt, 'yyyy-MM-dd')===this.datepipe.transform(projectSearchCriteria, 'yyyy-MM-dd')
  || item.projId.toString()=== projectSearchCriteria|| item.projectDesc.toUpperCase()==projectSearchCriteria.toUpperCase()
  || item.priority.toString()=== projectSearchCriteria || item.managerId.toString()=== projectSearchCriteria));

    }
    else
    {
      this._service.getAllProjects().subscribe(data=>this.listProjects=data);
    }
     
  }
  editProject():void 
  {
    let updateResult: any;
    let projDtls:Project=
    {
    
    projId: this.projId,
    projectDesc:this.projDesc,
    priority : this.priority,
     managerId:this.managerId,
     startDt:this.startDt,
     endDt:this.endDt};
     if(projDtls.projectDesc == undefined||projDtls.managerId==undefined||
      projDtls.startDt ==undefined||projDtls.endDt==undefined||
      projDtls.projectDesc==""|| projDtls.priority === 0||projDtls.managerId===0
      || projDtls.startDt ==""||projDtls.endDt=="")
    {
      
      this.isformValid=false;
      this.isUpdatedSuccessFully =false;
      
    }
    else if(Date.parse(projDtls.startDt)>Date.parse(projDtls.endDt))
  {
    this.isformValid=true;
    this.isUpdatedSuccessFully =false;
    this.isStartDateGreater=false;
  }
    
  else
  {
  this.isformValid=true;
  this._service.editProject(projDtls.projId,projDtls).subscribe(data=>updateResult=data);
  this.isUpdatedSuccessFully =true;
  this.isDeletedSuccessFully=false;
  this.isAddedSuccessFully=false;
  }
  window.scroll(0,0);
  }

  deleteProj(ProjectId:number):void
  {
    let deleteResult:any;
    this._service.deleteProject(ProjectId).subscribe(data=>deleteResult=data);  
    this.isDeletedSuccessFully=true;
    this.isUpdatedSuccessFully=false;
    this.isAddedSuccessFully=false;
    this.isformValid=true;
    window.scroll(0,0);
  }
  loadProjectGrid():void
{
  
  this._service.getAllProjects().subscribe(data=>this.listProjects=data);
}


}
