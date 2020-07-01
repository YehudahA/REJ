import { Component, Input } from '@angular/core';
import { Application } from '../models/application';
import { Image } from '../models/image';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent {

  @Input() application: Application;

  addImage() {
    this.application.images.push(new Image())
  }

  removeImage(img: Image) {
    const index = this.application.images.indexOf(img);
    if (index > -1) {
      this.application.images.splice(index, 1);
    }
  }
}
