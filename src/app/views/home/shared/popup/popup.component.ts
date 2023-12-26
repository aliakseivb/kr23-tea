import {Component, EventEmitter, Output} from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterLinkWithHref} from "@angular/router";

@Component({
  selector: 'ngbd-toast-closeable',
  standalone: true,
  imports: [NgbToastModule, RouterLinkWithHref],
  templateUrl: './popup.component.html',
})
export class NgbdToastCloseable  {
  @Output() showPopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  private show: boolean = true;
  constructor() {
  }

  close(): void {
    this.show = false;
    this.showPopup.emit(this.show);
    setTimeout((): void => {
      this.show = true;
    }, 500);
  }

  setSessionStorage(): void{
    sessionStorage.setItem('wasOpen', 'true');
  }
}
