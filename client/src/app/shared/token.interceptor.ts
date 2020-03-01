import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './services/auth.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      });
    }
    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse): Observable<any> => {
        if (e.status === 401) {
          this.router.navigate(['/login'], {
            queryParams: {
              sessionExpired: true
            }
          });
        }
        return throwError(e);
      })
    );
  }
}
