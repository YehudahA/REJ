import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inversion } from '../models/inversion';
import { FileReaderService } from './file-reader.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataReaderService {
  inversionStream: Observable<Inversion>;

  constructor(fileReader: FileReaderService) {
    this.inversionStream = fileReader.fileLoaded.pipe(map(DataReaderService.convertInversion));
  }

  private static convertInversion(s: string): Inversion {
    const json = JSON.parse(s) as Inversion;
    return json;
  }
}
