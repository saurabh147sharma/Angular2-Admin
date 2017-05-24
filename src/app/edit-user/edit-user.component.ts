import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Http} from "@angular/http";
import { UserService } from '../_services/index';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
private userData: any = {};
private updateMsg: String;

form: FormGroup;
  constructor(private http: Http, private fb: FormBuilder, private userService: UserService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     this.activatedRoute.params.subscribe((params: Params) => {
        let userId = params['id'];
        this.getUserDetails(userId);
      });
    
    this.buildForm();
  }

private getUserDetails(userId) {
 this.userService.userDetailsById(userId)
  .subscribe(data => {
                // set items to json response
                this.userData = data.result.userDetails;
                console.log(this.userData);
            }); 
    }

    private updateUserDetails(){
        this.userService.updateUserData(this.userData)
            .subscribe(
              data => {
              if (data && data.success==1) {
                  this.updateMsg=data.message;
                }
                else if(data && data.success==0){
                 this.updateMsg=data.message;
                }
            });
    }


    buildForm() {
    this.form = this.fb.group({
      
      first_name: ['', Validators.required],
      user_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.form) { return; }
    const form = this.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      //const control = ((field == 'first' || field == 'last') ? form.get('name').get(field) : form.get(field));
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {

    'first_name': '',
    'last_name': '',
    'user_name': ''
  };

  validationMessages = {

    'user_name': {
      'required': 'User Name is required.'
    },

    'first_name': {
      'required': 'First name is required.'
    },

    'last_name': {
      'required': 'Last name is required.'
    }
  };
}
