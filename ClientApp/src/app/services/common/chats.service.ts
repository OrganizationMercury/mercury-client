import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatDto } from '../../dto/chat.dto';
import { ChatUserDto, UserDto } from '../../dto/user.dto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
    constructor(private http: HttpClient, private tokenService: TokenService) { }

    getChat(chatId: string): Observable<ChatDto> {
      var userId = this.tokenService.decodedToken.jti!;
      return this.http.get<ChatDto>(`http://localhost:8080/Chats?chatId=${chatId}&currentUserId=${userId}`);
    }

    getPrivateChat(senderId: string, receiverId: string): Observable<ChatDto> {
      return this.http.get<ChatDto>(`http://localhost:8080/Chats/Private?senderId=${senderId}&receiverId=${receiverId}`);
    }

    getInterlocutor(chatId: string, senderId: string): Observable<ChatUserDto> {
      return this.http.get<ChatUserDto>(`http://localhost:8080/Chats/Private/${chatId}/Users/${senderId}/Interlocutor`);
    }
}