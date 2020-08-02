import { Component } from '@angular/core';
import { FileReaderService } from '../services/file-reader.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private fileReader: FileReaderService, private menuService: MenuService) { }

  fileLoaded(target: HTMLInputElement) {
    this.fileReader.loadFile(target.files[0]);
    target.value = null;
  }

  save() {
    this.menuService.save.emit();
  }

  print(){
    window.print();
  }

  changeCurrency(val: number){
    this.menuService.currencyChange.emit(val);
  }
}
