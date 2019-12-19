import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowTaxService {

  constructor(router: ActivatedRoute) {
    this.showTax = router.queryParams.pipe(
      map(params => params["tax"] !== undefined && params["tax"] !== "false"),
    );
  }

  showTax: Observable<boolean>;
}
