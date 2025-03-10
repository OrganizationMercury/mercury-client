import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalrService } from '../../../../services/common/signalr.service';
import { ChatUserDto } from '../../../../dto/user.dto';
import { UserService } from '../../../../services/common/user.service';
import { TokenService } from '../../../../services/common/token.service';
import { ChatsService } from '../../../../services/common/chats.service';
import { ChatDto, ChatType } from '../../../../dto/chat.dto';
import { catchError, lastValueFrom, of, Subject, takeUntil } from 'rxjs';
import { FileService } from '../../../../services/common/file.service';
import { MessageDto } from '../../../../dto/message.dto';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy { 
  title = 'chat-ui';
  text: string = "";
  chat?: ChatDto = undefined;
  userId?: string | null;
  postImage?: string | null;
  userData?: ChatUserDto;
  private destroy$ = new Subject<void>();

  constructor(
    public hub: SignalrService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private chatService: ChatsService,
    private userService: UserService,
    private files: FileService
  ) { }

  ngOnInit()
  {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.hub.chatId = params.get('id');
        this.userId = params.get('userId');
        this.hub.loadMessages();
        this.getChatData();
      });

    this.hub.chatCreated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(request => {
        if(request.chatCreator === this.tokenService.decodedToken.jti) {
          this.hub.chatId = request.chatId;
          this.userId = null;
          this.hub.loadMessages();
          this.getChatData();
        }
      });

    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(queryParams => {
        this.postImage = queryParams.get('postImage'); 
      });
  }
  
  sendMessage(): void {
    if (!this.text?.trim()) {
        console.error('Message text is empty.');
        return;
    }

    const sendAction = this.chat?.type === ChatType.Group || this.chat?.type === ChatType.Comments
      ? this.hub.sendGroupMessage(this.text)
      : this.hub.sendPrivateMessage(this.userData?.id!, this.text);

    sendAction
        .then(() => this.text = '')
        .catch(err => console.error('Error sending message:', err));
  }

  getChatData() {
    if (this.hub.chatId == null) {
      console.log('handle new chat')
      this.handleNewChat();
    } else {
      console.log('handle existing chat')
      this.handleExistingChat();
    }
  }

  isOwnMessage(message: MessageDto): boolean {
    var currentUsername = this.tokenService.decodedToken.sub
    return message?.senderUserName == currentUsername;
  }

  isComments(chat?: ChatDto) {
    return chat?.type === ChatType.Comments;
  }

  isGroup(chat?: ChatDto) {
    return chat?.type === ChatType.Group;
  }

  isPrivate(chat?: ChatDto) {
    return chat?.type === ChatType.Private;
  }

  toProfile() {
    this.router.navigate(['home', 'account', 'profile', this.userData?.id]);
  }

  private handleNewChat() {
    this.userService.getUserById(this.userId!).subscribe(async (interlocutor) => {
      this.chat = {
        id: '', 
        type: ChatType.Private,
        name: null,
        avatar: interlocutor
          ? await this.getAvatar(interlocutor.fileName)
          : 'assets/default-avatar.svg',
      };
    
      this.userData = interlocutor;
    });
  }

  private handleExistingChat() {
    this.chatService.getChat(this.hub.chatId!).subscribe(async (response) => {
      this.chat = response;

      if (this.chat?.type === ChatType.Private) {
        const userId = this.tokenService.decodedToken.jti!;
        const interlocutor = await lastValueFrom(
          this.chatService.getInterlocutor(this.chat.id!, userId)
        );

        this.chat.avatar = interlocutor?.fileName
          ? await this.getAvatar(interlocutor.fileName)
          : 'assets/default-avatar.svg';

        const thisUserId = this.tokenService.decodedToken.jti!;
        this.chatService.getInterlocutor(this.hub.chatId!, thisUserId).subscribe((response) => {
          this.userData = response;
        });
      } else if(this.chat?.type === ChatType.Group) {
        this.chat.avatar = this.chat.avatar
          ? await this.getAvatar(this.chat.avatar)
          : 'assets/default-avatar.svg';
      }
    });
  }

  //TODO: в группах надо показывать имя того, кто отправил сообщение, а так-же фото

  private getAvatar(fileName: string | null): Promise<string> {
    if (!fileName) return Promise.resolve('assets/default-avatar.svg');
    
    return lastValueFrom(this.files.getAvatar(fileName).pipe(
      catchError(() => of('assets/default-avatar.svg'))
    ));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
