import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {MainComponent} from "./main/main.component";
import {NgbdCarouselBasic} from "./shared/carousel/carousel.component";
import {NgbdToastCloseable} from "./shared/popup/popup.component";
import {AccordionComponent} from "./shared/accordion/accordion.component";


@NgModule({
  declarations: [
    MainComponent,
    AccordionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbdCarouselBasic,
    NgbdToastCloseable,
  ],
  exports: [
    HomeRoutingModule
  ]
})
export class HomeModule { }
