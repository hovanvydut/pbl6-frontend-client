import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map } from 'rxjs';
//
import { environment } from '@environment';
import { AccountModel } from '@app/modules/auth/models/auth.model';
import { Router } from '@angular/router';
import { ENDPOINTS } from '@app/shared/utilities';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  LOGGED_USER = 'userInfo';
  TOKEN = 'token';
  PERMISSION = 'permission';
  public baseURL = environment.baseUrl;
  ERROR_SOMETHING_BAD_HAPPENED: string = 'Bạn thử lại nhen, có lỗi xảy ra rồi!';
  public _userInfo: ReplaySubject<AccountModel> = new ReplaySubject<
    AccountModel
  >();

  public _permission: ReplaySubject<string[]> = new ReplaySubject<string[]>();

  public storeLoggedUser(accountModel: AccountModel) {
    localStorage.setItem(
      this.LOGGED_USER,
      btoa(encodeURIComponent(JSON.stringify(accountModel)))
    );
    this._userInfo.next(accountModel);
  }

  public storePermission(data: string[]) {
    localStorage.setItem(
      this.PERMISSION,
      btoa(encodeURIComponent(JSON.stringify(data)))
    );
    this._permission.next(data);
  }

  get permission(): string[] {
    const permission = localStorage.getItem(this.PERMISSION);
    const permissionJson =
      permission != null && JSON.parse(decodeURIComponent(atob(permission)));
    if (permissionJson) {
      let user = permissionJson;
      return user;
    } else return null;
  }

  public storeToken(token: string) {
    localStorage.setItem(this.TOKEN, token);
  }

  public removeLoggedUser() {
    localStorage.removeItem(this.PERMISSION);
    localStorage.removeItem(this.LOGGED_USER);
    this.removeToken();
  }

  public removeToken() {
    localStorage.removeItem(this.TOKEN);
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

  // Note: for file upload and form data, dont add Content-Type
  get formHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.bearerAuthentication
    });
  }

  get options() {
    return { headers: this.headers };
  }

  constructor(private httpClient: HttpClient, private router: Router) {}

  //#region GET Methods
  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`${this.baseURL}/${url}`, this.options).pipe(
      map((res: any) => {
        if (res.success) {
          return res.data;
        } else {
          this.handleError(res);
        }
      })
    );
  }

  async getAsync<T>(url: string): Promise<T> {
    return await this.httpClient
      .get<T>(`${this.baseURL}/${url}`, this.options)
      .toPromise();
  }
  //#endregion

  //#region POST Methods
  post<T>(url: string, data: any, isCatchError: boolean = true): Observable<T> {
    return this.httpClient
      .post<T>(`${this.baseURL}/${url}`, data, this.options)
      .pipe(
        map((res: any) => {
          if (res.success) {
            return res.data;
          } else {
            this.handleError(res);
          }
        })
      );
  }

  postForm<T>(url: string, data: any): Observable<T> {
    return this.httpClient
      .post<T>(`${this.baseURL}/${url}`, data, {
        headers: this.formHeaders
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            return res.data;
          } else {
            this.handleError(res);
          }
        })
      );
  }

  // NOTE: post file image => return url as json text
  postFile<T>(url: string, data: any): Observable<T> {
    return this.httpClient
      .post<T>(`${this.baseURL}/${url}`, data, {
        headers: this.formHeaders
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            return res.data;
          } else {
            this.handleError(res);
          }
        })
      );
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
    return this.httpClient
      .put<T>(`${this.baseURL}/${url}`, data, this.options)
      .pipe(
        map((res: any) => {
          if (res.success) {
            return res.data;
          } else {
            this.handleError(res);
          }
        })
      );
  }
  //#endregion

  //#region DELETE Methods
  delete<T>(url: string): Observable<T> {
    return this.httpClient
      .delete<T>(`${this.baseURL}/${url}`, this.options)
      .pipe(
        map((res: any) => {
          if (res.success) {
            return res.data;
          } else {
            this.handleError(res);
          }
        })
      );
  }
  //#endregion

  handleError(res: any) {
    if (res.statusCode === 401) {
      this.removeLoggedUser();
      return;
    };
    if ( res.statusCode === 403) {
      this.router.navigateByUrl(ENDPOINTS.FORBIDDEN)
    }
    throw new Error(res.message);
  }
}
