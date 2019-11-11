import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appThousands]'
})
export class ThousandsDirective {

  constructor(private element: ElementRef<HTMLInputElement>) { }

  @HostListener("change")
  onChange() {
    const input = this.element.nativeElement;
    const valueStr = input.value;

    if(!valueStr) return;
    
    let valueNum = +valueStr;

    if (valueNum <= 1000 && !valueStr.startsWith("0")) {
      valueNum*=1000;
    }

    const newValueStr = valueNum.toString();
    if (newValueStr != valueStr) {
      input.value = newValueStr;
      this.ngModelChange.emit(valueNum);
    }
  }

  @Output() ngModelChange: EventEmitter<number> = new EventEmitter<number>();
}
