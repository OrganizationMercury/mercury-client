import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { ChatWithAvatarDto } from "../../dto/chat.dto";

@Injectable({
    providedIn: 'root'
})

export class ChatCommunicator {
    private dataSubject: ReplaySubject<ChatWithAvatarDto> = new ReplaySubject<ChatWithAvatarDto>(1);
  
    setChat(chat: ChatWithAvatarDto): void {
      this.dataSubject.next(chat);
    }
  
    getChat$(): Observable<ChatWithAvatarDto> {
      return this.dataSubject.asObservable();
    }
}