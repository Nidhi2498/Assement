import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserFormPresenterService } from '../user-form-presenter/user-form-presenter.service';
import { ActivatedRoute} from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user.model';

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

  constructor(public userPresenterService:UserFormPresenterService, 
    private router:ActivatedRoute, private userService:UserService) { }

  ngOnInit(): void {
    debugger
    this.userPresenterService.userDetail$.subscribe((userData : any) =>{
      this.userList.emit(userData)
    })

    this.router.paramMap.subscribe((params : any) =>{
      const userId = +params.get('id');
      if(userId){
        this.userService.geteditUserDetailbyId(userId).subscribe((user: User)=>
            this.editUser(user), (err:any) => console.log(err)
        )}
      })
  }

  editUser(user: User) {
    this.userForm.patchValue({
      id: user.id,
      firstname : user.firstname,
      lastname : user.lastname,
      clientname: user.clientname,
      email: user.email,
      office : user.office,
      contactnumber : user.contactnumber,
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
