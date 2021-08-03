import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { UserService } from '../../user.service';

@Injectable()
export class UserListPresenterService {

  //declare variable as Subject
  public userListId: Subject<any> = new Subject();

  //declare subject variable as Observable
  public userListId$! : Observable<any>;

  user:any = [];

  //Injecting user service and Observe the userList
  constructor(private userService: UserService) {
    this.userListId$ = this.userListId.asObservable();
   }

   //Binding Formgroup
   public bindForm(){
     return new FormGroup({
      id: new FormControl(),
      firstname: new FormControl(),
      lastname : new FormControl(),
      clientname: new FormControl(),
      email : new FormControl(),
      office: new FormControl(),
      contactnumber: new FormControl(),
     })
   }

   //Loads the user details
   public loadUserDetail(){
    return this.userService.getUserDetail().subscribe((data:any)=>{
      this.user = data;
    })
  }

  //Get User details by Id
  public getUserDetailById(id: number){
    debugger
    return this.userService.geteditUserDetailbyId(id).subscribe((data:any)=>{
        this.user = data;
    })
  }

  //Delete user
  public deleteUserDetail(id: number){
    this.userService.deleteUserDetail(id).subscribe(data => {
      alert("User deleted successfully")
      })
    }

  
}
