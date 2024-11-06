import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { MessageDto } from '../../dto/message.dto';
import { catchError, tap } from 'rxjs';
import { TokenService } from './token.service';
import { MessagesService } from './messages.service';
import { ChatCommunicator } from '../communicators/chat.communicator';
import { ChatsService } from './chats.service';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public messages: MessageDto[] = [];
  public chatId: string | undefined | null;
  private hubConnection!: HubConnection;
  private connectionUrl = 'http://localhost:8080/signalr';
  private apiUrl = 'http://localhost:8080/Chats';

  constructor(
    private tokenService: TokenService, 
    private messagesService: MessagesService,
    private chats: ChatsService,
    private files: FileService,
    private chatCommunicator: ChatCommunicator
  ) { }
  
  public Connect()
  {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.connectionUrl, {
        accessTokenFactory: () => this.tokenService.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.on('newMessage', (message: any) => {
      this.messages.push(message);
    });

    this.hubConnection.on('chatCreated', (chatId: string) => {
      this.chatId = chatId;
      this.chats.getChat(chatId).pipe(
        tap(response => {
          console.log('new chat id: ', chatId);
          console.log('new chat: ', response);
          if(response.avatar == null) {
            response.avatar = 'assets/default-avatar.svg';
          } else {
            this.files.getFile(response.avatar).subscribe(filename =>
              response.avatar = filename
            );
          }

          this.chatCommunicator.setChat(response);
        })
      ).subscribe();
    });

    this.hubConnection.on('onError', (error: string) => {
      console.error('Error:', error);
    });

    this.startConnection();
  }

  private startConnection() {
    this.hubConnection
      .start()
      .then(() => console.log('Connected'))
      .catch(err => console.error('Connection error:', err));
  }

  public loadMessages() {
    this.messagesService.getMessages(this.chatId!).pipe(
      tap({
        next: data => {
          this.messages = data;
        },
        error: _ => this.messages = []
      })
    ).subscribe();
  }

  public sendMessage(interlocutorId: string, message: string) {
    return this.hubConnection.invoke('SendPrivate', this.chatId, interlocutorId, message);
  }
}