import { ResolveFn } from '@angular/router';

export const redirectionResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
