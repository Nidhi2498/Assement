import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
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
  p!:number;
  counter : number = +1;

  //Set the value of user
  @Input() public set userListData(value: User[]){
    if(value){
      this._userListData = value
      //console.log(value.length);
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
  
  public usersList!: Observable<any>

  constructor(private userPresenterService:UserListPresenterService, public _router:Router,
    private userService : UserService)
    //public dialog: MatDialog) 
   {
    this.userListData = [];
    this.userGroup = this.userPresenterService.bindForm();

    this.usersList = this.userService.getUser(1);
   }

  ngOnInit(): void {
    this.userPresenterService.userListId$.subscribe((userListId:any)=>{
      this.deleteUserById.emit(userListId);
    })
   
  }

  //Call User from User presenter service
  public getUserById(id:number){
    debugger
    this._router.navigate([`../users/add/${id}`,]);
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


   public getUserdetail(list:any){
     list = this.userService.getUserDetail();
   }

   //pagination
   public onPageChange(pageno:number){
    return this.getUserdetail(pageno);
  }
  
}
