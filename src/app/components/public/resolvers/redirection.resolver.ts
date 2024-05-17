import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PublicService } from '../services/public.service';
import _moment from 'moment';

export const redirectionResolver: ResolveFn<boolean> = async (route, state) => {
  const publicService = inject(PublicService);
  const URLId = route.params['id'];
  const currentDate = _moment();

  const URLData = await publicService.getURLData(URLId);
  const urlExpirationDate = _moment(URLData.expiresIn);

  if(currentDate.isBefore(urlExpirationDate) && !URLData.needsAuth) {
    window.open(URLData.url, '_self');
  }

  await new Promise((resolve) => setInterval(() => { resolve(true); }, 1000));
  return true;
};
