import { Component } from '@angular/core';
import { FileReaderService } from '../services/file-reader.service';

@Component({
  selector: 'app-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.css']
})
export class FileReaderComponent {

  constructor(private fileReader: FileReaderService) { }

  fileLoaded(target: HTMLInputElement) {
    this.fileReader.loadFile(target.files[0]);
    target.value = null;
  }

}
