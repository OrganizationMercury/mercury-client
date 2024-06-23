import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    login(dto: LoginDto) : Observable<string> {
        return this.http.post('http://localhost:8080/Account/Login', dto, {responseType: 'text'}) as Observable<string>;
    }

    register(dto: RegisterDto) {
        return this.http.post('http://localhost:8080/Account/Register', dto);
    }
}