import { TestBed } from '@angular/core/testing';
import { ROUTER_CONFIGURATION } from '@angular/router';
import { appConfig } from './app.config';

describe('appConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers],
    });
  });

  it('scrolls to the top on navigation', () => {
    const config = TestBed.inject(ROUTER_CONFIGURATION);
    expect(config.scrollPositionRestoration).toBe('top');
  });
});
