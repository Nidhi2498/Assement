import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserFormPresenterService } from '../user-form-presenter/user-form-presenter.service';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user.model';
import { Location } from '@angular/common';

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
    private route:ActivatedRoute, private userService:UserService, private _router:Router,
    private location:Location) { }

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

  //Get detail by Id
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
  public onSubmit(id:any){
    debugger
    if(this.userForm.value != null){
      this.submitted = true;
     }

    if(this.userForm.value.id != '' && this.userForm.value.id){
      this.updateUserDetail(this.userForm.value)
      // this._router.navigate([`../users/${id}`,]);
    }else{
      this.userPresenterService.userDetailData(this.userForm)
    }
    
  }

  public updateUserDetail(id:any){
    return this.userService.updateUserDetail(id).subscribe((data:User)=>{
      alert("User updated successfully");
      this.location.back();
   })
  }

}
