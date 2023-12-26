import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-carousel-basic',
  standalone: true,
  imports: [NgbCarouselModule],
  templateUrl: './carousel.component.html'
})
export class NgbdCarouselBasic {
  images: string[] = ['../../../assets/images/ban1.png','../../../assets/images/ban2.png', '../../../assets/images/ban3.png'];
}


