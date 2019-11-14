import { Injectable, EventEmitter } from '@angular/core';
import {  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  save: EventEmitter<null> = new EventEmitter<null>();
  
}
