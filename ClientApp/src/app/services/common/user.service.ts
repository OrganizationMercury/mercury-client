import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterestDto, UpdateUserDto } from '../../dto/user.dto';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TokenService } from './token.service';
import { ChatDto, ChatWithAvatarDto } from '../../dto/chat.dto';
import { FileService } from './file.service';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient, private tokenService: TokenService, private files: FileService) { }
  private get userId() { return this.tokenService.decodedToken.jti }

  updateUser(dto: UpdateUserDto) {
    let data = new FormData();
    data.append('id', this.userId!);
    data.append('firstname', dto.firstname!);
    data.append('lastname', dto.lastname!);
    data.append('username', dto.username!);
    data.append('bio', dto.bio!);
    data.append('file', dto.file!);
    return this.http.put('http://localhost:8080/Users', data);
  };

  getUserAvatar() : Observable<string> {
    return this.http.get(`http://localhost:8080/Users/${this.userId}/Avatar`, {responseType: 'blob'}).pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }

  getUserAvatarById(id: string) : Observable<string> {
    return this.http.get(`http://localhost:8080/Users/${id}/Avatar`, {responseType: 'blob'}).pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }

  getUser() {
    return this.http.get(`http://localhost:8080/Users/${this.userId}`);
  }

  getUserById(id: string) {
    return this.http.get(`http://localhost:8080/Users/${id}`);
  }

  getUserInterests() {
    return this.http.get(`http://localhost:8080/Users/${this.userId}/Interests`);
  }

  getUserInterestsById(id: string) {
    return this.http.get(`http://localhost:8080/Users/${id}/Interests`);
  }

  linkUserInterest(interest: InterestDto) {
    return this.http.post(`http://localhost:8080/Users/${this.userId}/Interests`, interest);
  }

  unlinkUserInterest(interest: InterestDto) {
    return this.http.delete(`http://localhost:8080/Users/${this.userId}/Interests?name=${interest.name}`);
  }

  getUserChatsWithAvatars(userName: string): Observable<ChatWithAvatarDto[]> {
    return this.http.get<ChatWithAvatarDto[]>(`http://localhost:8080/Users/${userName}/Chats`).pipe(
      tap(chats => {
        chats.forEach(chat => {
          if (chat.avatar != null) {
            this.files.getFile(chat.avatar).subscribe({
              next: (response) => chat.avatar = response,
              error: () => chat.avatar = 'assets/default-avatar.svg' 
            });
          } else {
              chat.avatar = 'assets/default-avatar.svg';
          }
        });
      }),
      catchError(error => {
        console.error('Chat getting error:', error);
        return of([]); 
        })
    );
  }
}