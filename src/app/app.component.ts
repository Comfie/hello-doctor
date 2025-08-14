import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'hello-doctor';

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.themeService.init();
  }
}


