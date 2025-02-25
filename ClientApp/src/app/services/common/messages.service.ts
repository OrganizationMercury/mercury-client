import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageDto } from '../../dto/message.dto';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
    constructor(private http: HttpClient) { }

    getMessages(chatId: string): Observable<MessageDto[]> {
      return this.http.get<MessageDto[]>(`http://localhost:8080/Messages?chatId=${chatId}`);
    }

    getLastMessage(chatId: string): Observable<MessageDto> {
      return this.http.get<MessageDto>(`http://localhost:8080/Messages?chatId=${chatId}&latest=true`);
    }
}