import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Http} from "@angular/http";
import * as _ from 'underscore';
import { User } from '../_models/index';
import { UserService, PagerService } from '../_services/index';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 users: User[] = [];
 // array of all items to be paged
    private allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
    form: FormGroup;
  constructor(private http: Http,private pagerService: PagerService, private userService: UserService,  private fb: FormBuilder) { }


  ngOnInit() {
    this.loadAllUsers();
    this.buildForm();
  }
private loadAllUsers() {
 this.userService.getAll()
  .subscribe(data => {
                // set items to json response
                this.allItems = data.result.users;

                // initialize to page 1
                this.setPage(1);
            }); 
    }
 
 buildForm() {
    this.form = this.fb.group({
      
      first_name: ['', Validators.required]
    });
  }
  
    setPage(page: number) {
        //alert(page);
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


    searchUser(formData){
        this.userService.getAll(formData)
  .subscribe(data => {
                // set items to json response
                this.allItems = data.result.users;

                // initialize to page 1
                this.setPage(1);
            }); 
    }
    
}
