import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscriber, Subscription} from "rxjs";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private showInvite: Observable<boolean>;
  showPopup: boolean = false;
  wasOpen: string = 'false';
  constructor() {
    this.showInvite = new Observable((observer: Subscriber<boolean>): void => {
      if(this.getSessionStorage() !== 'true' || !this.getSessionStorage()) {
        setTimeout((): void => {
          observer.next(true);
        }, 10000);
      }
    });

  }

  private subscription: Subscription | null = null
  ngOnInit(): void {
    this.subscription = this.showInvite.subscribe({
      next: (param: boolean): void => {
        this.change(param);
      },
      error: (error: string): void => {
        console.log(error);
      }
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  change(some: boolean): void {
    if(this.getSessionStorage() !== 'true' || !this.getSessionStorage()){
      this.showPopup = some;
      setTimeout((): void => {
        this.showPopup = true;
      }, 500);
    }
  }

  getSessionStorage():string | null{
    return sessionStorage.getItem('wasOpen');
  }
}
