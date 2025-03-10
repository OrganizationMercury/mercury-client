import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  
export class FileService {
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAvatar(filename: string) : Observable<string> {
    return this.http.get(`http://localhost:8080/Avatars/${filename}`, {responseType: 'blob'}).pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }

  getFile(fileId: string) : Observable<string> {
    return this.http.get(`http://localhost:8080/Files/${fileId}`, {responseType: 'blob'}).pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }
}