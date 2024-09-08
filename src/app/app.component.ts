import { Component } from '@angular/core';
import { AjaxService } from './services/ajax.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  firstData$ = this.ajax.getFirstData();
  secondData$ = this.ajax.getSecondData()
  constructor(private ajax: AjaxService){

  }
}
