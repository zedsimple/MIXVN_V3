import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig, http, options);
}

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }  
  ]
})
export class AuthModule {}
