import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileDownloaderService {

  constructor() { }

  download(data: any, name: string) {
    const blob = new Blob([JSON.stringify(data)], { type: "text/json" });
    saveAs(blob, name);
  }
}
