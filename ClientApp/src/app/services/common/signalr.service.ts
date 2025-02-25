import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { MessageDto } from '../../dto/message.dto';
import { catchError, lastValueFrom, Subject, tap } from 'rxjs';
import { TokenService } from './token.service';
import { MessagesService } from './messages.service';
import { ChatCommunicator } from '../communicators/chat.communicator';
import { ChatsService } from './chats.service';
import { FileService } from './file.service';
import { ChatDto, ChatType } from '../../dto/chat.dto';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public messages: MessageDto[] = [];
  public chatId: string | undefined | null;
  private hubConnection!: HubConnection;
  private connectionUrl = 'http://localhost:8080/signalr';
  private apiUrl = 'http://localhost:8080/Chats';
  public chatCreated$ = new Subject<{ chatId: string, chatCreator: string }>();

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

    this.hubConnection.on('newMessage', (data: { message: MessageDto, receiver: string }) => {
      var currentUsername = this.tokenService.decodedToken.sub;
      if(data.receiver == currentUsername)
        this.messages.push(data.message);
    });

    this.hubConnection.on('chatCreated', (response: {chatId: string, senderUserName: string}) => {
      this.chatCreated$.next({chatId: response.chatId, chatCreator: response.senderUserName});
      this.chatId = response.chatId;
      console.log('chatId: ',response.chatId)
    
      this.chats.getChat(response.chatId).pipe(
        tap(chat => this.handleChatAvatar(chat))
      ).subscribe();
    });

    this.hubConnection.on('onError', (error: string) => {
      console.error('Error:', error);
    });

    this.startConnection();
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

  public sendPrivateMessage(interlocutorId: string, message: string) {
    return this.hubConnection.invoke('SendPrivate', this.chatId, interlocutorId, message);
  }

  public sendGroupMessage(message: string) {
    return this.hubConnection.invoke('SendGroup', this.chatId, message);
  }

  public GroupChatCreated(chat: ChatDto) {
    return this.hubConnection.invoke('GroupChatCreated', chat);
  }

  private startConnection() {
    this.hubConnection
      .start()
      .catch(err => console.error('Connection error:', err));
  }

  private async handleChatAvatar(chat: ChatDto) {
    if (chat.type === ChatType.Group) {
      chat.avatar = await this.getChatAvatar(chat.avatar);
    } else {
      const userId = this.tokenService.decodedToken.jti!;
      const interlocutor = await lastValueFrom(this.chats.getInterlocutor(this.chatId!, userId));
      chat.avatar = await this.getChatAvatar(interlocutor!.fileName);
    }
    console.log('set chat')
    this.chatCommunicator.setChat(chat);
  }
  
  private async getChatAvatar(avatar: string | null): Promise<string> {
    if (avatar == null) {
      return 'assets/default-avatar.svg';
    } else {
      return lastValueFrom(this.files.getAvatar(avatar));
    }
  }
}