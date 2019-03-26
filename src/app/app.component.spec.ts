import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TestModule } from './modules/test.module';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        TestModule
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
});
