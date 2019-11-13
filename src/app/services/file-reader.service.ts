import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  private fileReader: FileReader;

  constructor() {
    this.fileReader = new FileReader();
    this.fileLoaded = fromEvent(this.fileReader, "load")
      .pipe(map(_res => this.fileReader.result));
  }

  fileLoaded: Observable<any>;

  loadFile(file: Blob) {
    this.fileReader.readAsText(file);
  }
}