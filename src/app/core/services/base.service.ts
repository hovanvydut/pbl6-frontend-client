import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ReplaySubject, throwError } from 'rxjs';
//
import { AppNotify } from '@app/shared/utilities';
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
  ERROR_SOMETHING_BAD_HAPPENED: string =
    'Something bad happened. Please try again later.';

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
    return localStorage.getItem(this.TOKEN) != null;
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
    return this.httpClient
      .post<T>(`${this.baseURL}/${url}`, data)
      .pipe(catchError(error => this.handleError(error)));
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

  postFile<T>(url: string, data: any): Observable<T> {
    const configuration = this.initialDataOption(data);
    const formData = configuration.key;
    const httpOptions = configuration.value;

    return this.httpClient.post<T>(
      `${this.baseURL}/${url}`,
      formData,
      httpOptions
    );
  }
  //#endregion

  //#region PUT Methods
  put<T>(url: string, data: any): Observable<T> {
    return this.httpClient.put<T>(`${this.baseURL}/${url}`, data, this.options);
  }

  putFile<T>(url: string, data: any): Observable<T> {
    const configuration = this.initialDataOption(data);
    const formData = configuration.key as any;
    const httpOptions = configuration.value;
    return this.httpClient.put<T>(
      `${this.baseURL}/${url}`,
      formData,
      httpOptions
    );
  }
  //#endregion

  //#region DELETE Methods
  delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseURL}/${url}`, this.options);
  }
  //#endregion

  //#region File and FormData
  downLoadFile(
    data: any,
    type: string,
    fileName: string,
    fileExtension: string
  ) {
    const blob = new Blob([data], { type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName + '.' + fileExtension;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private initialDataOption(data: any) {
    const formData: FormData = new FormData();

    this.addDataToFormData(formData, data);
    //
    // Important note: Don't add 'Content-Type' in request header.
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: this.bearerAuthentication
      })
    };

    const result = {
      key: formData,
      value: httpOptions
    };

    return result;
  }

  //#region Helper

  private addDataToFormData(formData: FormData, data, name: string = null) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        let formName = name ? `${name}[${property}]` : property;
        if (data[property] instanceof File) {
          // Add a file name to mark this field is File field
          formName = name ? `${name}` : property;
          formData.append(
            formName,
            data[property],
            data[property].name ? data[property].name : null
          );
        } else if (typeof data[property] === 'object') {
          this.addDataToFormData(formData, data[property], formName);
        } else {
          formData.append(formName, data[property]);
        }
      }
    }
  }

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

    let messageError = '';
    messageError =
      !!error.error && !!error.error.message
        ? error.error.message
        : this.ERROR_SOMETHING_BAD_HAPPENED;

    switch (error?.error?.errorCode) {
      case AppErrorCode.Error:
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
              `body was: ${JSON.stringify(error.error)}`
          );
        }

        AppNotify.error(messageError);
        break;
      case AppErrorCode.Warning:
        AppNotify.warning(messageError);
        break;
      case AppErrorCode.Info:
        AppNotify.info(error.error.message);
        break;
      default:
        AppNotify.error(messageError);
    }

    // return an observable with a user-facing error message
    return throwError(messageError);
  };

  public httpRequestHandleError(err: HttpErrorResponse) {
    AppNotify.error('An error has occurred: ' + err.message);

    return throwError(err.error);
  }
  //#endregion
}
