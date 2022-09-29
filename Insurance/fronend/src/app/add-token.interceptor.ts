import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './users/user.service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private userService:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token= this.userService.state.value.token;
    if(token){
      const request_with_token= request.clone({
        //const token = req.get('authorization').split(' ')[1]; // 0000
        headers: request.headers.set('authorization', 'Bearer '+ token)
      });
      return next.handle(request_with_token);
    }else{
      return next.handle(request);
    }
  }
}
