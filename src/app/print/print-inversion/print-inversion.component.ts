import { Component, Input } from '@angular/core';
import { Inversion } from 'src/app/models/inversion';

@Component({
  selector: 'app-print-inversion',
  templateUrl: './print-inversion.component.html',
  styleUrls: ['./print-inversion.component.css']
})
export class PrintInversionComponent {

  @Input() inversion: Inversion;
  @Input() currency: string;
  @Input() cashflowData: any;
}
