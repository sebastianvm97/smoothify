import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { redirectionResolver } from './redirection.resolver';

describe('redirectionResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => redirectionResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
