/// <reference types="chrome"/>
import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  currentUrl = '';

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.getCurrentUrl()
      .subscribe((currentUrl) => {
        this.currentUrl = currentUrl;
        this.ref.detectChanges();
      });
  }

  getCurrentUrl(): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      chrome.tabs.getSelected((tab) => {
        observer.next(tab.url);
        observer.complete();
      });
    });
  }

  isWcmModeEnabled = (): boolean => !this.currentUrl.toLowerCase().includes('wcmmode=disabled');
  isContentFinderEnabled = (): boolean => this.currentUrl.toLowerCase().includes('/cf#/');
}
