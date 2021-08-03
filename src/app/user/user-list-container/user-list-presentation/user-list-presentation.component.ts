import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { User } from '../../user.model';
import { UserService } from '../../user.service';
import { UserListPresenterService } from '../user-list-presenter/user-list-presenter.service';


@Component({
  selector: 'app-user-list-presentation',
  templateUrl: './user-list-presentation.component.html',
  styleUrls: ['./user-list-presentation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders:[UserListPresenterService]
})
export class UserListPresentationComponent implements OnInit {
  //declare variable for searching 
  searchText!: string;
  private destroy: Subject<void> = new Subject();


  //Set the value of user
  @Input() public set userListData(value: User[]){
    if(value){
      this._userListData = value
      
    }
  }

  //Get the value of user
  public get userListData(): User[] {
    return this._userListData
  }

  //Call and emit the Id which is deleted
  @Output() public deleteUserById: EventEmitter<any> = new EventEmitter();

  private _userListData : User[] = [];
  public userGroup!: FormGroup;
  
  //Pagination
  // public data:any = [];
  // public users!: User[];

  constructor(private userPresenterService:UserListPresenterService, public _router:Router,
    private userService : UserService)
    //public dialog: MatDialog) 
   {
    this.userListData = [];
    this.userGroup = this.userPresenterService.bindForm();

    // for(let key in this.data.user){
    //   if(this.users.hasOwnProperty(key)){
    //       this.data.push(this.data.users[key]);
    //   }
    // }
   }

  ngOnInit(): void {
    this.userPresenterService.userListId$.subscribe((userListId:any)=>{
      this.deleteUserById.emit(userListId);
    })
   
  }

  //Call User from User presenter service
  public getUserById(id:number){
    this._router.navigate(['add',id]);
  }

  //Call this method from User presenter service
  public deleteUserDetail(id:number){
    this.userPresenterService.deleteUserDetail(id);
  }

   // sorting as per every field
   key = 'firstname'; // sort default by name
   reverse = false;
   sortList(key:any) {
     this.key = key;
     this.reverse = !this.reverse;
   }  
  
}
