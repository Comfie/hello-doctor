import { Component } from '@angular/core';;
import { AsyncPipe, NgIf } from '@angular/common';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'app-spinner',
  imports: [
    //for mat spinner
    NgIf,
    AsyncPipe
  ],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) {}
}
