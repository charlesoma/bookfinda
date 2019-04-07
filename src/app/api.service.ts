import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  apiUrl: string = 'https://www.booknomads.com/api/v0/isbn/';

  getBook(isbn): Observable<Object> {
    return this.http.get(this.apiUrl + isbn);
  }
}
