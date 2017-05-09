import { Component, OnInit } from '@angular/core';
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
  constructor(private http: Http,private pagerService: PagerService, private userService: UserService) { }
// array of all items to be paged
    private allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
  ngOnInit() {
    this.loadAllUsers();
  }
private loadAllUsers() {
 this.userService.getAll()
  .subscribe(data => {
                // set items to json response
                this.allItems = data.result.users;

                // initialize to page 1
                this.setPage(1);
            }); 

        //this.userService.getAll().subscribe(users => { this.users = users.result.users; });
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
}
