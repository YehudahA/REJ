import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageCompressService {

  private render: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.render = rendererFactory.createRenderer(null, null);
  }

  public compressFile(image: string, ratio: number = 50, quality: number = 50): Promise<string> {
    return ImageCompressService.compress(image, this.render, ratio, quality);
  }

  static compress(imageDataUrlSource: string,
    render: Renderer2,
    width: number = 50,
    quality: number = 50): Promise<string> {

    const promise: Promise<string> = new Promise(function (resolve, reject) {

      quality = quality / 100;
      const sourceImage = new Image();

      // important for safari: we need to wait for onload event
      sourceImage.onload = function () {
        const canvas: HTMLCanvasElement = render.createElement('canvas');
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

        const w = sourceImage.naturalWidth;
        const h = sourceImage.naturalHeight;

        const ratio = width / w;

        canvas.width = w * ratio;
        canvas.height = h * ratio;

        ctx.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);


        const mime = imageDataUrlSource.substr(5, imageDataUrlSource.split(';')[0].length - 5);
        const result = canvas.toDataURL(mime, quality);

        resolve(result);

      };

      sourceImage.src = imageDataUrlSource;

    });

    return promise;
  }
}
