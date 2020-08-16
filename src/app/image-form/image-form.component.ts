import { Component, Input } from '@angular/core';
import { AppImage } from '../models/app-image';
import { ImageCompressService } from '../services/image-compress.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent {

  @Input() image: AppImage;
  originalStringUrl: string;
  private _width: number = 400;

  constructor(private imageCompressService: ImageCompressService) { }

  async loadImage(files: FileList) {
    if (files && files[0]) {
      let reader = new FileReader();

      reader.addEventListener('load', () => {
        this.originalStringUrl = reader.result as string;
        this.compress();
      });

      reader.readAsDataURL(files[0]);
    }
  }

  async compress() {
    this.image.stringUrl = await this.imageCompressService.compressFile(this.originalStringUrl, this.width);
  }

  get width() { return this._width; }
  set width(val: number) {
    this._width = val;
    this.compress();
  }
}
