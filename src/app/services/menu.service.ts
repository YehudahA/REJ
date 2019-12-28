import { Injectable, EventEmitter } from '@angular/core';
import {  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  readonly save = new EventEmitter<null>();
  readonly currencyChange = new EventEmitter<number>();
  
}
