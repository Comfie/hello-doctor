import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-simple',
  templateUrl: './footer-simple.component.html',
  styleUrls: ['./footer-simple.component.css']
})
export class FooterSimpleComponent implements OnInit {

   currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
