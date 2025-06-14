import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterSimpleComponent } from '../../core/components/footer-simple/footer-simple.component';
import { HeaderComponent } from '../../core/components/header/header.component';
import { SidebarComponent } from "../../core/components/sidebar/sidebar.component";
import { AuthService } from '../../core/services/auth.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-auth-layout',
  imports: [
    RouterOutlet,
    FooterSimpleComponent,
    HeaderComponent,
    SidebarComponent,
    SpinnerComponent
],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
})
export class AuthLayoutComponent implements OnInit {
  isSidebarCollapsed = false;
  constructor(private authServuce: AuthService) {}

  ngOnInit() {}
}
