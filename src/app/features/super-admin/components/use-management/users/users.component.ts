import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { last } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [RouterLink, NgClass, NgFor],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [
    { id: 1, name: 'John Doe', email: 'G0OjP@example.com', role: 'Admin', status: 'Active', lastActive: '3 hours ago' },
    { id: 2, name: 'Jane Smith', email: '9dM8a@example.com', role: 'User', status: 'Inactive', lastActive: '1 day ago' },  
    { id: 3, name: 'Alice Johnson', email: 'R4p9X@example.com', role: 'Admin', status: 'Active', lastActive: '2 days ago' },
    { id: 4, name: 'Bob Brown', email: 'vHq9I@example.com', role: 'User', status: 'Inactive', lastActive: '1 week ago' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
