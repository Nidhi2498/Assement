import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-form-container',
  templateUrl: './user-form-container.component.html',
  styleUrls: ['./user-form-container.component.css']
})
export class UserFormContainerComponent implements OnInit {

  //Set default value to each field
  @Input() userList = {id:0, firstname:'', lastname:'', clientname:'', email:'', office:'', contactnumber:''};
  
  //Injecting Services
  constructor(private userService: UserService,
              private location:Location 
    ) { }

  ngOnInit(): void {
  }

  //Call method from User service
  public addUserDetail(user: User){
    this.userService.addUser(user).subscribe((data:User)=>{
      this.userService.getUserDetail();
      this.location.back();
    })
  }

  public updateUserDetail(user: User){
    this.userService.updateUserDetail(user).subscribe((data:User)=>{
      this.userService.getUserDetail();
      this.location.back();
    })
  }

}
