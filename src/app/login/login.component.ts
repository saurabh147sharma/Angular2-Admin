import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
model: any = {};
loading = false;
returnUrl: string;
form: FormGroup;
loginData : string;
isClickedOnce : boolean = true;
  constructor(private fb: FormBuilder,
  private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

  ngOnInit() {
     this.buildForm();
  }

loginSubmit(){
    this.loading = true;
    this.isClickedOnce = false;
        this.authenticationService.login(this.model.username, this.model.password)
 .subscribe(data => {
              if (data && data.success==1) {
                    localStorage.setItem('currentUser', JSON.stringify(data));
                     this.router.navigate(['/dashboard']);
                }
                else if(data && data.success==0){
                  this.isClickedOnce = true;
                  alert(data.message);
                }
            }); 
  }

   buildForm() {
    this.form = this.fb.group({
      
      username: ['', Validators.required],
      password: ['', Validators.required]
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

    'username': '',
    'password': ''
  };

  validationMessages = {

    'username': {
      'required': 'User Name is required.'
    },

    'password': {
      'required': 'Password is required.'
    }
  };
}
