import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { Observable, catchError, tap } from "rxjs";
import { Router } from "@angular/router";
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router, private http: HttpClient, private tokenService: TokenService) { }

    login(dto: LoginDto) : Observable<string> {
        return this.http.post('http://localhost:8080/Account/Login', dto, {responseType: 'text'})
            .pipe(
                tap((response: string) => {
                    console.log(`token received: ${response}`);
                    this.tokenService.token = response;
                    this.router.navigateByUrl('home');
                }),
                catchError((error: any) => {
                    console.error('Error occurred:', error);
                    throw error;
                })
            );
    }

    register(dto: RegisterDto) {
        console.log('register dto',dto);
        return this.http.post('http://localhost:8080/Account/Register', dto);
    }
}