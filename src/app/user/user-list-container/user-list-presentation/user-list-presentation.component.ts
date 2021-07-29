import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../user.model';
import { UserListPresenterService } from '../user-list-presenter/user-list-presenter.service';
// import {MatDialog} from '@angular/material/dialog';

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
  
  
    currentPage = 1;
    itemsPerPage = 5;
    pageSize!: number;

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
  
  constructor(private userPresenterService:UserListPresenterService, public router:Router)
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
    this.router.navigate(['/add',id]);
  }

  //Call this method from User presenter service
  public deleteUserDetail(id:number){
    this.userPresenterService.deleteUserDetail(id);
  }

  //Open dialog
  public openDialog(){
    //this.dialog.open(DialogelementComponent);
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }
  
  public changePagesize(num: number): void {
  this.itemsPerPage = this.pageSize + num;
  }
}
