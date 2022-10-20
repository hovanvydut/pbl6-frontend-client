import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ReplaySubject, throwError } from 'rxjs';
//
import { AppErrorCode } from '@app/shared/app.enum';
import { environment } from '@environment';
import { AccountModel } from '@app/modules/auth/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  LOGGED_USER = 'userInfo';
  TOKEN = 'token';
  public baseURL = environment.baseUrl;
  ERROR_SOMETHING_BAD_HAPPENED: string = 'Bạn thử lại nhen, có lỗi xảy ra rồi!';
  public _userInfo: ReplaySubject<AccountModel> = new ReplaySubject<
    AccountModel
  >();

  public storeLoggedUser(accountModel: AccountModel) {
    localStorage.setItem(
      this.LOGGED_USER,
      btoa(encodeURIComponent(JSON.stringify(accountModel)))
    );
    this._userInfo.next(accountModel);
  }

  public storeToken(token: string) {
    localStorage.setItem(this.TOKEN, token);
  }

  get currentUser(): AccountModel {
    const localUser = localStorage.getItem(this.LOGGED_USER);
    const localUserJson =
      localUser != null && JSON.parse(decodeURIComponent(atob(localUser)));
    if (localUserJson) {
      let user: AccountModel = new AccountModel(localUserJson);
      return user;
    } else return null;
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem(this.TOKEN) !== null;
  }

  get accessToken(): string {
    return localStorage.getItem(this.TOKEN);
  }

  get bearerAuthentication(): string {
    return 'Bearer ' + this.accessToken;
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.bearerAuthentication
    });
  }

  // Note: for file upload, dont add Content-Type
  get formHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.bearerAuthentication
    });
  }

  get options() {
    return { headers: this.headers };
  }

  constructor(private httpClient: HttpClient) {}

  //#region GET Methods
  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`${this.baseURL}/${url}`, this.options);
  }

  async getAsync<T>(url: string): Promise<T> {
    return await this.httpClient
      .get<T>(`${this.baseURL}/${url}`, this.options)
      .toPromise();
  }
  //#endregion

  //#region POST Methods
  post<T>(url: string, data: any, isCatchError: boolean = true): Observable<T> {
    return this.httpClient.post<T>(
      `${this.baseURL}/${url}`,
      data,
      this.options
    );
  }

  postForm<T>(url: string, data: any): Observable<T> {
    return this.httpClient.post<T>(`${this.baseURL}/${url}`, data, {
      headers: this.formHeaders
    });
  }

  // NOTE: post file image => return url as json text
  postFile<T>(url: string, data: any): Observable<T> {
    return this.httpClient.post<T>(`${this.baseURL}/${url}`, data, {
      headers: this.formHeaders,
      responseType: 'text' as 'json'
    });
  }

  async postAsync<T>(
    url: string,
    data: any,
    isCatchError: boolean = true
  ): Promise<T> {
    return this.httpClient
      .post<T>(`${this.baseURL}/${url}`, data, this.options)
      .toPromise();
  }
  //#endregion

  //#region PUT Methods
  put<T>(url: string, data: any): Observable<T> {
    return this.httpClient.put<T>(`${this.baseURL}/${url}`, data, this.options);
  }
  //#endregion

  //#region DELETE Methods
  delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseURL}/${url}`, this.options);
  }
  //#endregion

  //#region File and FormData

  //#region Helpers

  private handleError = (error: HttpErrorResponse) => {
    switch (error.status) {
      case 401:
        if (window.location.hostname !== 'localhost') {
          window.location.href = window.location.origin + '/login';
        }
        break;
      case 403:
        // Navigate to forbidden page
        if (window.location.hostname !== 'localhost') {
          window.location.href = window.location.origin + '/forbidden';
        }
        break;
      case 417:
        return throwError(error.error.message);
    }
    return throwError(error.error);
  };
  //#endregion
}
