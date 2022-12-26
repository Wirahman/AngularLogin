import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PenggunaService {

  private baseUrl = 'https://localhost:4433/blubuk/Api/akasia';
  private token = localStorage.getItem('token');
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Blubuk-API': 'www.blubuk.com',
      'Authorization': localStorage.getItem('token') || '{}',
    })
  };
  
  constructor(private http: HttpClient) { }
  
  getDaftarPengguna(pages: string | number) {
    return this.http.get(this.baseUrl + '?page=' + pages);
  }
  
  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/ambil_semua_pengguna' , { params, headers: this.httpOptions['headers'] } );
  }
  
  createPenggunaBaru(pengguna: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/crud/admin', pengguna, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', pengguna))
      );
  }

  getDaftarPenggunaById(id: any) {
    return this.http.get(this.baseUrl + '/crud/admin/' + id, { headers: this.httpOptions['headers'] } );
  }
  
  updatePengguna(id: any, value: any): Observable<Object> {
    return this.http.put(this.baseUrl + '/crud/admin/' + id, value, { headers: this.httpOptions['headers'] });
  }

  hapusPengguna(id: any) {
    return this.http.delete(this.baseUrl + '/crud/admin/' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
 
}
