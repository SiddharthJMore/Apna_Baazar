import { Component } from '@angular/core';
import 'flickity';

@Component({
  selector: 'app-banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrls: ['./banner-slider.component.css']
})
export class BannerSliderComponent {

  images = [
    '../../assets/bannerSlider/banner (1).jpg',
    '../../assets/bannerSlider/banner (2).jpg',
    '../../assets/bannerSlider/banner (3).jpg',
    '../../assets/bannerSlider/banner (4).png',
    '../../assets/bannerSlider/banner (5).jpg',
    '../../assets/bannerSlider/banner (6).png',
    '../../assets/bannerSlider/banner (7).png',
    '../../assets/bannerSlider/banner (8).png',
    '../../assets/bannerSlider/banner (9).png'
  ];
  currentImage = 0;
  constructor() {
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.images.length;
    }, 3000);
  }
}
