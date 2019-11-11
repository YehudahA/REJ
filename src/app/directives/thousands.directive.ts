import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appThousands]'
})
export class ThousandsDirective {

  constructor(private element: ElementRef<HTMLInputElement>) { }

  @HostListener("change")
  onChange() {
    const input = this.element.nativeElement;
    const value = input.value;

    if(!value) return;
    
    const valueNum = +value;

    let newValue: number;

    if (value.startsWith("=")) {
      newValue = +value.substr(1);
    }
    else if (valueNum <= 1000) {
      newValue = valueNum * 1000;
    }

    const newValueStr = newValue.toString();
    if (newValueStr != value) {
      input.value = newValueStr;
      this.ngModelChange.emit(newValue);
    }
  }

  @Output() ngModelChange: EventEmitter<number> = new EventEmitter<number>();
}
