import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class XsrfInterceptor implements HttpInterceptor {
  /**
   * Because DM expects an empty header when there isn't one
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const hasHeader = req.headers.has('X-XSRF-TOKEN');
    console.log("Intercepting - XSRF token head exists = " + hasHeader);
    req = hasHeader ? req : req.clone({
      setHeaders: {
        'X-XSRF-TOKEN': ''
      }
    });
    return next.handle(req);
  }
}
