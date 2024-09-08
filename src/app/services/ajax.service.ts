import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamicForm } from '../models/main-model';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  constructor(
    private http: HttpClient
  ) { }

  getFirstData(){
    return this.http
    .get<DynamicForm>('assets/form-data.json')
  }

  getSecondData(){
    return this.http
    .get<DynamicForm>('assets/form-data2.json')
  }

  getThirdData(){
    return this.http
    .get<DynamicForm>('assets/ahmedData.json')
  }
}
