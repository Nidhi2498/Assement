import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserFormPresenterService } from '../user-form-presenter/user-form-presenter.service';

@Component({
  selector: 'app-user-form-presentation',
  templateUrl: './user-form-presentation.component.html',
  styleUrls: ['./user-form-presentation.component.css'],
  viewProviders: [UserFormPresenterService]
})
export class UserFormPresentationComponent implements OnInit {

  submitted = false;

  @Output() userList: EventEmitter<any> = new EventEmitter();

  public userForm: FormGroup = this.userPresenterService.bindForm();

  constructor(private userPresenterService:UserFormPresenterService) { }

  ngOnInit(): void {
    this.userPresenterService.userDetail$.subscribe((userData : any) =>{
      this.userList.emit(userData)
    })
  }

  get userDetailFormControl(){
    return this.userForm.controls;
  }

  //Save the user details
  public onSubmit(){
    this.userPresenterService.userDetailData(this.userForm)
  }

}
