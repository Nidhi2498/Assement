import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  userId!: User[];
  private destroy: Subject<void> = new Subject();

  //Pagination
  public page = 1;
  public pageSize = 10;
  public userList: any = [];
  addbutton: any;
  search: any;

  //sorting
  records: any[] = [];
  isDesc: boolean = true;
  column: string = 'firstname';

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
  
  constructor(private userPresenterService:UserListPresenterService, public _router:Router,
    private userService : UserService)
    //public dialog: MatDialog) 
   {
    this.userListData = [];
    this.userGroup = this.userPresenterService.bindForm();

    
   }

  ngOnInit(): void {
    this.userPresenterService.userListId$.subscribe((userListId:any)=>{
      this.deleteUserById.emit(userListId);
    })

  }

  //Call User from User presenter service
  public getUserById(id:number){
    debugger
    this._router.navigate(['add',id]);
  }

  //Call this method from User presenter service
  public deleteUserDetail(id:number){
    this.userPresenterService.deleteUserDetail(id);
  }

  


  sort(property:any) {
    debugger
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.records.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };

}
