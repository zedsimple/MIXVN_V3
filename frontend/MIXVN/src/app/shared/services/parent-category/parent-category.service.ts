import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiResponse } from 'app/shared/interfaces/api-response';
import { createCommonHeaders, extractData, extractDataArray, handleError, handleErrorRes } from 'app/shared/functions/http-req';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { PARENT_CATEGORY } from 'app/shared/constants/api/backend';

@Injectable()
export class ParentCategoryService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }
  
  add(body): Observable<ApiResponse> {
    let options = createCommonHeaders(this.authService);
    return this.http.post(PARENT_CATEGORY.add, body, options)
    .map(extractData)
    .catch(handleError);
  }

  delete(id: number): Observable<ApiResponse> {
    let options = createCommonHeaders(this.authService);
    return this.http.delete(PARENT_CATEGORY.delete + id, options)
    .map(extractData)
    .catch(handleError);
  }

  edit(body, id: number): Observable<ApiResponse> {
    let options = createCommonHeaders(this.authService);
    return this.http.put(PARENT_CATEGORY.edit + id, body, options)
    .map(extractData)
    .catch(handleError);
  }
}
