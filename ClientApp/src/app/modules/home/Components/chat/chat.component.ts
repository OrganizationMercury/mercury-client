import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SignalrService } from '../../../../services/common/signalr.service';
import { ChatUserDto, UserDto } from '../../../../dto/user.dto';
import { UserService } from '../../../../services/common/user.service';
import { TokenService } from '../../../../services/common/token.service';
import { ChatsService } from '../../../../services/common/chats.service';
import { ChatDto, ChatType } from '../../../../dto/chat.dto';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit { 
  title = 'chat-ui';
  text: string = "";
  chat?: ChatDto = undefined;
  userId?: string | null;
  userData?: ChatUserDto;

  constructor(
    public hub: SignalrService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private chatService: ChatsService,
    private userService: UserService
  ) { }

  ngOnInit()
  {
    this.route.paramMap.subscribe(params => {
      this.hub.chatId = params.get('id');
    });
    
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });

    this.getChatData();
    this.hub.loadMessages();
  }
  
  sendMessage(): void {
    this.hub.sendMessage(this.userData?.id! ,this.text).then(() => {
      this.text = '';
    }).catch(err => console.error('Sending message error:', err));
  }

  getChatData() {
    if(this.hub.chatId == null) {
      this.userService.getUserById(this.userId!).subscribe(response => {
        if(this.chat?.type == ChatType.Private) {
          //TODO: LOAD USER IMAGE
        }
        this.userData = response as UserDto;
      });
    } else {
      this.chatService.getChat(this.hub.chatId).subscribe(response => {
        if(this.chat?.type == ChatType.Private) {
          //TODO: LOAD USER IMAGE
        }
        this.chat = response;
        var thisUserId = this.tokenService.decodedToken.jti;
        this.chatService.getInterlocutor(this.hub.chatId!, thisUserId!).subscribe(response => {
          this.userData = response;
        });
      });
    }
  }
}
