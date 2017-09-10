import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiResponse } from 'app/shared/interfaces/api-response';
import { createCommonHeaders, extractData, extractDataArray, handleError, handleErrorRes } from 'app/shared/functions/http-req';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { CATEGORY } from 'app/shared/constants/api/frontend';

@Injectable()
export class CategoryService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getCategories(): Observable<ApiResponse> {
    let options = createCommonHeaders(this.authService);
    return this.http.get(CATEGORY.getAll, options)
    .map(extractDataArray)
    .catch(handleError);
  }

}
