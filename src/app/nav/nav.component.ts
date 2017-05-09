import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/index';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
  ) { }

  ngOnInit() {
  }

 logoutUser(){
         // reset login status
        this.userService.logout().subscribe(() => { 
        this.router.navigate(['login']);
        });

        
    }
}
