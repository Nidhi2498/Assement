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
    private route:ActivatedRoute, private userService:UserService) { }

  ngOnInit(): void {

    this.userPresenterService.userDetail$.subscribe((userData : any) =>{
      this.userList.emit(userData)
    })

    this.route.paramMap.subscribe((params : any) =>{
      const userId = +params.get('id');
      if(userId){
        this.getAllUsers(userId)
      }
    })
  }


  public getAllUsers(id:number){
    this.userService.geteditUserDetailbyId(id).subscribe(
      (userId:User)=> this.editUser(userId),
      (err:any) => console.log(err)
    )
  }

  //patch the user 
  public editUser(user: User) {
    this.userForm.patchValue(user)
  }

  get userDetailFormControl(){
    return this.userForm.controls;
  }

  //Save the user details
  public onSubmit(){
    this.userPresenterService.userDetailData(this.userForm)
  }

}
