import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../utils/env';
import { Observable } from 'rxjs';

@Injectable()
export class RepositoryService {
  constructor(private http: HttpClient) { }

  getList(params: any, paramExist: boolean) {
    let param = paramExist ? `?${params}` : ''
    return this.http.get(`${environment}repos/list${param}`)
  }


  getRepository(params: any, paramExist: boolean) {
    let param = paramExist ? `?${params}` : ''
    return this.http.get(`${environment}repos/repository${param}`)
  }

  getIssuesList(params: any, paramExist: boolean): Observable<any> {
    let param = paramExist ? `?${params}` : ''
    return this.http.get(`${environment}issues/list${param}`)
  }

  getPullRequestList(params: any, paramExist: boolean): Observable<any> {
    let param = paramExist ? `?${params}` : ''
    return this.http.get(`${environment}pull-request/list${param}`)
  }

  getCommitsList(params: any, paramExist: boolean): Observable<any> {
    let param = paramExist ? `?${params}` : ''
    return this.http.get(`${environment}commit/list${param}`)
  }
}
