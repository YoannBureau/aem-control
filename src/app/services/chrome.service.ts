/// <reference types="chrome"/>
import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChromeService {

  constructor() { }

  getCurrentUrl(): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      chrome.tabs.getSelected((tab) => {
        observer.next(tab.url);
        observer.complete();
      });
    });
  }

}
