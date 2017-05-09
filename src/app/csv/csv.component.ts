import { Component, OnInit } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { UserService } from '../_services/index';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit {
private allItems: {};
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

 download() {
 this.userService.getAll()
  .subscribe(data => {
                //API data
                this.allItems = data.result.users;
/*var dummyData = [
  {
    first_name: "Saurabh",
    last_name: "Sharma",
    id: 147
  },
  {
    first_name: "Gaurav",
    last_name: "Sharma",
    id: 9
  }];
*/

var options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true 
  };
new Angular2Csv(this.allItems, 'My Report',options);
//new Angular2Csv(dummyData, 'My Report',options);
            }); 
    }

}
