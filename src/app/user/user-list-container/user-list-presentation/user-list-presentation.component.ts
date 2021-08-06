import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  public usersList!: any;

  constructor(private userPresenterService:UserListPresenterService, public _router:Router,
    private userService : UserService, private http:HttpClient, private route:ActivatedRoute)
  
   {
    this.userListData = [];
    this.userGroup = this.userPresenterService.bindForm();
    this.getUserdata();
   }

  ngOnInit(): void {
    this.userPresenterService.userListId$.subscribe((userListId:any)=>{
      this.deleteUserById.emit(userListId);
    })

    this.route.paramMap.subscribe((params : any) =>{
      const userId = +params.get('id');
      if(userId){
        this.getUserdata();
      }
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
    this.getUserdata();
  }

   // sorting as per every field
   key = 'firstname'; // sort default by name
   reverse = false;
   sortList(key:any) {
     this.key = key;
     this.reverse = !this.reverse;
   }  


   data: any= [];
   public getUserdata(){
     this.userService.getUserDetail().subscribe(
       (data:any)=> {this.data = data}
     )
   }


 
  
}
