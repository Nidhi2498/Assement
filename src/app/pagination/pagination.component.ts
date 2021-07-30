import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
public page = 1;
public pageSize = 10;

public usersList: Array<any> = [];
  public user:any;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.usersList = this.userService.getUser();
  }

}
