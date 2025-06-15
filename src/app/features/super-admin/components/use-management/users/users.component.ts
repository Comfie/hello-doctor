import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { last } from 'rxjs';
import { SystemAdminService } from '../../../../../../generated/api';

@Component({
  selector: 'app-users',
  imports: [RouterLink, NgClass, NgFor],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = []; 

  constructor(private systemAdminService: SystemAdminService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.systemAdminService.apiV1SystemAdminGetAllUsersGet().pipe(last()).subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

}
