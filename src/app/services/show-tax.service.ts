import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowTaxService {
  showTax = new BehaviorSubject<boolean>(false);

  constructor() {
    document.addEventListener('keyup', ev => {
      if (ev.altKey && ev.key && ev.key.toUpperCase() == 'T')
        this.showTax.next(!this.showTax.value);
    });
  }
}
