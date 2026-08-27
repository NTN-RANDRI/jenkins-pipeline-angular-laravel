import { HttpInterceptorFn } from '@angular/common/http';

export const xsrfTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getCookie('XSRF-TOKEN');

  let clonedReq = req.clone({
    withCredentials: true,
  });

  const mutatingMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
  if (token && mutatingMethods.includes(req.method)) {
    clonedReq = clonedReq.clone({
      setHeaders: {
        'X-XSRF-TOKEN': token
      }
    });
  }

  return next(clonedReq);
};

function getCookie(name: string): string | null {
  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : null;
}