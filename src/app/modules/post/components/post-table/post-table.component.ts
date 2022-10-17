import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss']
})
export class PostTableComponent implements OnInit {
  tableName: string = "Tất cả bài đăng";
  displayedColumns: string[] = ['id', 'title', 'price', 'address'];
  columns: [
    {
      id: '1',
      name: 'id',
      title: 'ID',
      sortText: 'Sort by ID',
    },
    {
      id: '2',
      name: 'title',
      title: 'Tiêu đề',
      sortText: 'Sort by title',
    },
    {
      id: '3',
      name: 'price',
      title: 'Giá',
      sortText: 'Sort by price',
    },
    {
      id: '4',
      name: 'address',
      title: 'Địa chỉ',
      sortText: 'Sort by address',
    },
  ]
  dataSource = new MatTableDataSource<any>([
    {id: 1, title: 'Hydrogen', price: 1.0079, address: 'H'},
    {id: 2, title: 'Helium', price: 4.0026, address: 'He'},
    {id: 3, title: 'Lithium', price: 6.941, address: 'Li'},
    {id: 4, title: 'Beryllium', price: 9.0122, address: 'Be'},
    {id: 5, title: 'Boron', price: 10.811, address: 'B'},
    {id: 6, title: 'Carbon', price: 12.0107, address: 'C'},
    {id: 7, title: 'Nitrogen', price: 14.0067, address: 'N'},
    {id: 8, title: 'Oxygen', price: 15.9994, address: 'O'},
    {id: 9, title: 'Fluorine', price: 18.9984, address: 'F'},
    {id: 10, title: 'Neon', price: 20.1797, address: 'Ne'},
    {id: 11, title: 'Sodium', price: 22.9897, address: 'Na'},
    {id: 12, title: 'Magnesium', price: 24.305, address: 'Mg'},
    {id: 13, title: 'Aluminum', price: 26.9815, address: 'Al'},
    {id: 14, title: 'Silicon', price: 28.0855, address: 'Si'},
    {id: 15, title: 'Phosphorus', price: 30.9738, address: 'P'},
    {id: 16, title: 'Sulfur', price: 32.065, address: 'S'},
    {id: 17, title: 'Chlorine', price: 35.453, address: 'Cl'},
    {id: 18, title: 'Argon', price: 39.948, address: 'Ar'},
    {id: 19, title: 'Potassium', price: 39.0983, address: 'K'},
    {id: 20, title: 'Calcium', price: 40.078, address: 'Ca'},
  ]);


  constructor() {

  }

  ngOnInit(): void {
  }

}
