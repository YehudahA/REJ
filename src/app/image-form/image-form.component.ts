import { Component, OnInit, Input } from '@angular/core';
import { Image } from '../models/image';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit {

  @Input() image: Image;

  constructor() { }

  ngOnInit() {
  }

  loadImage(files: FileList) {
    this.image.image = null;
    
    if (files && files[0]) {
      let reader = new FileReader();
      reader.addEventListener('load', () => {
        this.image.image = reader.result;
      });
      reader.readAsDataURL(files[0]);
    }
  }
}
