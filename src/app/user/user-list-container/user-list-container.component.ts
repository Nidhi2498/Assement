import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../user.service';
import { UserListPresenterService } from './user-list-presenter/user-list-presenter.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-list-container',
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.css'],
  viewProviders: [UserListPresenterService]
})
export class UserListContainerComponent implements OnInit {
  //declare variable as Observable
  public userList$: Observable<any>;

  //Injecting user service
  constructor(private userService:UserService, private location: Location) {
    this.userList$ = this.userService.getUserDetail();
   }

  ngOnInit(): void {
  }

  //This method to delete user by Id
  public onDeleteId(id:number){
    this.userService.deleteUserDetail(id);
    this.location.back();
  }


}
