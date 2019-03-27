import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TestModule } from './modules/test.module';
import { Observable } from 'rxjs';
import { ChromeService } from './services/chrome.service';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;

class ChromeServiceMock {
  getCurrentUrl() {
    return Observable.create((observer) => { });
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        TestModule
      ],
      providers: [
        { provide: ChromeService, useClass: ChromeServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('isWcmModeEnabled', () => {
    it('should return true when WCM Mode is enabled', () => {
      // Arrange
      component.currentUrl = 'http://domain.com/index.html';

      // Act
      const actual = component.isWcmModeEnabled();

      // Assert
      expect(actual).toBeTruthy();
    });

    it('should return false when WCM Mode is disabled', () => {
      // Arrange
      component.currentUrl = 'http://domain.com/index.html?wcmmode=disabled';

      // Act
      const actual = component.isWcmModeEnabled();

      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe('isContentFinderEnabled', () => {
    it('should return true when Content Finder is enabled', () => {
      // Arrange
      component.currentUrl = 'http://domain.com/cf#/index.html';

      // Act
      const actual = component.isContentFinderEnabled();

      // Assert
      expect(actual).toBeTruthy();
    });

    it('should return false when Content Finder is disabled', () => {
      // Arrange
      component.currentUrl = 'http://domain.com/index.html';

      // Act
      const actual = component.isContentFinderEnabled();

      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe('generateWcmModeUrl', () => {
    it('should return an url with ?wcmmode=disabled when generating an url with WCM Mode disabled', () => {
      // Arrange
      component.currentUrl = 'http://domain.com/index.html';
      const expected = 'http://domain.com/index.html?wcmmode=disabled';

      // Act
      const actual = component.generateWcmModeUrl(false);

      // Assert
      expect(actual).toEqual(expected);
    });

    it('should return an url with &wcmmode=disabled when generating an url with WCM Mode disabled', () => {
      // Arrange
      component.currentUrl = 'http://domain.com/index.html?param1=1';
      const expected = 'http://domain.com/index.html?param1=1&wcmmode=disabled';

      // Act
      const actual = component.generateWcmModeUrl(false);

      // Assert
      expect(actual).toEqual(expected);
    });

    it('should return an url without ?wcmmode=disabled when generating an url with WCM Mode enabled', () => {
      // Arrange
      component.currentUrl = 'http://domain.com/index.html?wcmmode=disabled';
      const expected = 'http://domain.com/index.html';

      // Act
      const actual = component.generateWcmModeUrl(true);

      // Assert
      expect(actual).toEqual(expected);
    });

    it('should return an url without &wcmmode=disabled when generating an url with WCM Mode enabled', () => {
      // Arrange
      component.currentUrl = 'http://domain.com/index.html?param1=1&wcmmode=disabled';
      const expected = 'http://domain.com/index.html?param1=1';

      // Act
      const actual = component.generateWcmModeUrl(true);

      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('generateContentFinderModeUrl', () => {
    it('should return an url with /cf#/ when generating an url with Content Finder enabled', () => {
      // Arrange
      component.currentUrl = 'http://domain.com/index.html';
      const expected = 'http://domain.com/cf#/index.html';

      // Act
      const actual = component.generateContentFinderModeUrl(true);

      // Assert
      expect(actual).toEqual(expected);
    });

    it('should return an url without /cf#/ when generating an url with Content Finder disabled', () => {
      // Arrange
      component.currentUrl = 'http://domain.com/cf#/index.html';
      const expected = 'http://domain.com/index.html';

      // Act
      const actual = component.generateContentFinderModeUrl(false);

      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('getCurrentBaseUrl', () => {
    it('should return current base url', () => {
      // Arrange
      component.currentUrl = 'http://domain.com/index.html';
      const expected = 'http://domain.com';

      // Act
      const actual = component.getCurrentBaseUrl();

      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
