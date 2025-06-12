import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { HeaderPublicComponent } from '../../core/components/header-public/header-public.component';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, FooterComponent, HeaderPublicComponent],
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.css']
})
export class PublicLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
