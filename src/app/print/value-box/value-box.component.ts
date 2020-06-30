import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'print-value-box',
  templateUrl: './value-box.component.html',
  styleUrls: ['./value-box.component.css']
})
export class ValueBoxComponent {

  @Input() value: any;
  @Input() prefix: any;
  @Input() suffix: any;

}
