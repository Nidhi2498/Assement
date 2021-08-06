import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class UserFormPresenterService {
  
  //declare variable as Subject 
  public userDetail: Subject<any> = new Subject();
  public userDetail$!: Observable<any>;

  constructor() { 
    this.userDetail$ = this.userDetail.asObservable();
  }

  public bindForm() {
    return new FormGroup({
      id: new FormControl(),
      firstname: new FormControl('', Validators.required),
      lastname : new FormControl('', Validators.required),
      clientname: new FormControl('', Validators.required),
      email : new FormControl('', Validators.email),
      office: new FormControl(''),
      contactnumber: new FormControl('', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")),
      dob: new FormControl(''),
     })
  }
  // [Validators.required, Validators.pattern('[a-zA-Z ]*')]

  //Check form is valid or not
  public userDetailData(userForm: FormGroup){
    if(userForm.valid) {
      this.userDetail.next(userForm.value)
    }else{}
  }
}
