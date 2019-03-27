import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { Observable, Observer } from 'rxjs';

import { ChromeService } from './services/chrome.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  currentUrl = '';

  constructor(
    private ref: ChangeDetectorRef,
    private chromeService: ChromeService
  ) { }

  ngAfterViewInit(): void {
    this.chromeService
      .getCurrentUrl()
      .subscribe((currentUrl) => {
        this.currentUrl = currentUrl;
        this.ref.detectChanges();
      });
  }

  isWcmModeEnabled = (): boolean => !this.currentUrl.toLowerCase().includes('wcmmode=disabled');
  isContentFinderEnabled = (): boolean => this.currentUrl.toLowerCase().includes('/cf#/');

  generateWcmModeUrl(isWcmModeEnabled: boolean): string {
    if (isWcmModeEnabled) {
      return this.currentUrl
        .toLowerCase()
        .replace('?wcmmode=disabled', '')
        .replace('&wcmmode=disabled', '');
    }
    else {
      let queryStarter;
      if (this.currentUrl.includes('?')) {
        queryStarter = '&';
      }
      else {
        queryStarter = '?';
      }
      return `${this.currentUrl}${queryStarter}wcmmode=disabled`;
    }
  }

  generateContentFinderModeUrl(isContentFinderEnabled: boolean): string {
    if (isContentFinderEnabled) {
      const split1 = this.currentUrl.split('//');
      const split2 = split1[1].split('/');
      const restIndex = split1[0].length + 2 + split2[0].length;

      return `${this.currentUrl.substring(0, restIndex)}/cf#${this.currentUrl.substring(restIndex)}`;
    }
    else {
      return this.currentUrl.replace('cf#/', '');
    }
  }

  contentFinderToggleChange() {
    const url = this.generateContentFinderModeUrl(!this.isContentFinderEnabled());
    this.chromeService
      .navigateToUrl(url);
  }

  wcmModeToggleChange() {
    const url = this.generateWcmModeUrl(!this.isWcmModeEnabled());
    this.chromeService
      .navigateToUrl(url);
  }

  siteAdminClick(event: MouseEvent) {
    const url = `${this.getCurrentBaseUrl()}/siteadmin`;
    this.chromeService
      .navigateToUrl(url);
  }

  crxClick(event: MouseEvent) {
    const url = `${this.getCurrentBaseUrl()}/crx/de`;
    this.chromeService
      .navigateToUrl(url);
  }

  damAdminClick(event: MouseEvent) {
    const url = `${this.getCurrentBaseUrl()}/damadmin`;
    this.chromeService
      .navigateToUrl(url);
  }

  configManagerClick(event: MouseEvent) {
    const url = `${this.getCurrentBaseUrl()}/system/console/configMgr`;
    this.chromeService
      .navigateToUrl(url);
  }

  userAdminClick(event: MouseEvent) {
    const url = `${this.getCurrentBaseUrl()}/useradmin`;
    this.chromeService
      .navigateToUrl(url);
  }

  getCurrentBaseUrl(): string {
    const pathArray = this.currentUrl.split('/');
    const protocol = pathArray[0];
    const host = pathArray[2];

    return `${protocol}//${host}`;
  }
}
