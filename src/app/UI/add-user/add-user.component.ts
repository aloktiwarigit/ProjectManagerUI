import { Component, OnInit, NgModule } from '@angular/core';
import { ProjectService } from 'src/app/Service/project.service';
import { User } from 'src/app/Classes/user';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [ReactiveFormsModule, FormsModule, BrowserModule, HttpClientModule],
  providers: [HttpClientModule],
  exports: [FormsModule]
})
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styles: []
})
export class AddUserComponent implements OnInit {



  public firstName: string;
  public lastName: string;
  public empId: string;
  public userId: number;
  public insertResult: any;
  public isFormValid: boolean = true;
  public isAddedSuccessFully: boolean = false;
  public isDeletedSuccessFully: boolean = false;
  public isUpdatedSuccessFully: boolean = false;
  public isEdit: boolean = false;
  list: User[];

  constructor(private _service: ProjectService) {
    this._service.getAllUsers().subscribe(data => this.list = data);
  }

  ngOnInit() {

  }

  sortByFirstName(): void {
    this._service.getAllUsers().subscribe(data => this.list = data.sort((a, b) => {
      if (a.fstName < b.fstName) return -1;
      else if (a.fstName > b.fstName) return 1;
      else return 0;
    }));

  }
  sortById(): void {
    this._service.getAllUsers().subscribe(data => this.list = data.sort((a, b) => {
      if (a.userId < b.userId) return -1;
      else if (a.userId > b.userId) return 1;
      else return 0;
    }));

  }

  sortByLastName(): void {
    this._service.getAllUsers().subscribe(data => this.list = data.sort((a, b) => {
      if (a.lstName < b.lstName) return -1;
      else if (a.lstName > b.lstName) return 1;
      else return 0;
    }));

  }

  
  loadUsersGrid(): void {

    this._service.getAllUsers().subscribe(data => this.list = data);
  }
  addUser(form: NgForm): void {
    let Userdetails: User =
    {
      userId: 0,
      fstName: this.firstName,
      lstName: this.lastName,
      empId: this.empId
    };
    this.isEdit = false;
    this.isDeletedSuccessFully = false;
    this.isUpdatedSuccessFully = false;
    if (Userdetails.fstName == undefined || Userdetails.lstName == undefined || Userdetails.empId == undefined ||
      Userdetails.fstName == "" || Userdetails.lstName == "" || Userdetails.empId == "") {

      this.isFormValid = false;
      this.isAddedSuccessFully = false;

    }
    else {
      this.isFormValid = true;
      this._service.addUser(Userdetails).subscribe(data => this.insertResult = data);
      this.isAddedSuccessFully = true;

      form.reset();

    }
    window.scroll(0, 0);
  }

  updateUser(): void {
    let updateResult: any;
    let Userdetails: User =
    {
      userId: this.userId,
      fstName: this.firstName,
      lstName: this.lastName,
      empId: this.empId
    };
    if (Userdetails.fstName == undefined || Userdetails.lstName == undefined || Userdetails.empId == undefined ||
      Userdetails.fstName == "" || Userdetails.lstName == "" || Userdetails.empId == "") {
      this.isFormValid = false;
      this.isUpdatedSuccessFully = false;
    }
    else {
      this.isFormValid = true;
      this._service.editUser(Userdetails.userId, Userdetails).subscribe(data => updateResult = data);
      this.isUpdatedSuccessFully = true;
      this.isDeletedSuccessFully = false;
      this.isAddedSuccessFully = false;
    }
    window.scroll(0, 0);
  }


  resetUserForm(form: NgForm): void {
    form.reset();
    this.isAddedSuccessFully = false;
    this.isDeletedSuccessFully = false;
    this.isUpdatedSuccessFully = false;
    this.isFormValid = true;
    this.isEdit = false;
    window.scroll(0, 0);
  }
  identifyUser(index: number, item: any) {

    return item ? item.UserId : undefined;

  }
  bindEditUser(user: User): void {
    this.isAddedSuccessFully = false;
    this.isDeletedSuccessFully = false;
    this.isUpdatedSuccessFully = false;
    this.isFormValid = true;
    this.isEdit = true;
    this.userId = user.userId;
    this.firstName = user.fstName;
    this.lastName = user.lstName;
    this.empId = user.empId;
    window.scroll(0, 0);
  }

  searchFilter(searchDetail: string): void {
    if (searchDetail != undefined && searchDetail.length != 0) {
      this._service.getAllUsers().subscribe(data => this.list = data.filter(item => item.fstName.toUpperCase() === searchDetail.toUpperCase() || item.lstName.toUpperCase() === searchDetail.toUpperCase()
        || item.empId === searchDetail.toUpperCase() || item.userId.toString() === searchDetail));

    }
    else {
      this._service.getAllUsers().subscribe(data => this.list = data);
    }

  }

  deleteUser(UserId: number): void {
    let DeleteResult: any;
    this._service.deleteUser(UserId).subscribe(data => DeleteResult = data);
    this.isDeletedSuccessFully = true;
    this.isUpdatedSuccessFully = false;
    this.isAddedSuccessFully = false;
    this.isFormValid = true;
    window.scroll(0, 0);
  }



}
