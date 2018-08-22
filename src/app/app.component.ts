import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  displayedColumns = ['position', 'firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  Data_list;
  One_Data_list;
  n;
  color = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */

  ngOnInit() {
    this.getDataList();
    // this.ngOnChanges();
  }

  // ngOnChanges() {
  //   if (this.Data_list.age > 18) {
  //     this.color = 'green';
  //     //alert("green");
  //   } else {
  //     this.color = 'red';
  //     //alert("red");
  //   }
  // }

  getDataList() {
    fetch('http://dev.api.fooddocs.ee/testtask')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.Data_list = json;
        //  console.log("datafromJson=>" + this.Data_list);
        for (var i = 0; i < json.Results; i++) {
          //console.log(i);
          this.One_Data_list = json.Results;
          console.log("datafromJson=>" + this.One_Data_list);
        }
      });

  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  rowClicked(row: any): void {
    console.log(row);
  }
}

export interface Element {
  position: number;
  firstName: string;
  lastName: string;
  email: string;
}

const ELEMENT_DATA: Element[] = [

];
