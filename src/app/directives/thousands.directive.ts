import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appThousands]'
})
export class ThousandsDirective {

  constructor(private element: ElementRef<HTMLInputElement>) { }

  @HostListener("change")
  onChange() {
    const input = this.element.nativeElement;
    const value = input.value;

    if (value.startsWith("=")) {
      let exactValue = value.substr(1);
      input.value = exactValue;
    }

    else if (+value < 1000) {
      input.value = (+value * 1000).toString();
    }
  }
}
