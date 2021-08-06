import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from './user.model';

@Injectable()
export class UserService {
  public baseURL = "http://localhost:3000/"
  userList: any;
  items : User[] = [];
  constructor(private httpClient: HttpClient) { }

  //Add the user
  public addUser(data:User):Observable<User>{
    return this.httpClient.post<User>(`${this.baseURL}user`, data);
  }

  //Get user details
  public getUserDetail():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}user`)
  }

  //Get user detail by Id
  public geteditUserDetailbyId(id:number):Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}user/${id}`)
  }
  
  //Update the user
  public updateUserDetail(data:User):Observable<User>{
    return this.httpClient.put<User>(`${this.baseURL}user/${data.id}`,data)
  }

  //Delete the user
  public deleteUserDetail(id:number):Observable<number>{
    return this.httpClient.delete<number>(`${this.baseURL}user/${id}`)
  } 

  // public getUser(pageno : number){
  //   return this.httpClient.get(`${this.baseURL}?page=`+ pageno + '&limit=5')
  // }

  
}
