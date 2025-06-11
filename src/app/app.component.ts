import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./core/components/sidebar/sidebar.component";
import { FooterComponent } from "./core/components/footer/footer.component";
import { HeaderComponent } from "./core/components/header/header.component";
import { LandingPageComponent } from "./core/components/unauthenticated/landing-page/landing-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isAuthenticated = false; // Change this to true to simulate an authenticated user
  title = 'hello-doctor';
}
