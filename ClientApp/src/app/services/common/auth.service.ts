import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDto, RegisterDto } from "../../dto/auth.dto";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private http: HttpClient
    ) { }

    login(dto: LoginDto) {
        return this.http.post('http://localhost:8080/Account/Login', dto, {responseType: 'text'})
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('An error occurred:', error.message); 
        return throwError(() =>error);
      }

    register(dto: RegisterDto) {
        return this.http.post('http://localhost:8080/Account/Register', dto);
    }
}