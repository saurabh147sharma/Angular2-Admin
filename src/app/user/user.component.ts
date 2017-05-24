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
    itemCount : number=0;
    page: number=1;
  constructor(private http: Http,private pagerService: PagerService, private userService: UserService,  private fb: FormBuilder) { }


  ngOnInit() {
    this.loadAllUsers();
    this.buildForm();
  }
private loadAllUsers() {
 this.setPage(1);
    }
 
 buildForm() {
    this.form = this.fb.group({
      first_name: ['', Validators.required]
    });
  }
  
    setPage(page: number, first_name: string = '') {        
        this.userService.getAll(first_name,page)
            .subscribe(data => {
                // set items to json response
                this.allItems = data.result.users;
                this.itemCount=data.result.usersCount;
                 // get pager object from service
                this.pager = this.pagerService.getPager(this.itemCount, page);
                if (page < 1 || page > this.pager.totalPages) {
                 return;
                }
                // get current page of items
                this.pagedItems = this.allItems;
            });
        
    }


    searchUser(first_name){
        this.setPage(this.page,first_name);
    }
    
}
