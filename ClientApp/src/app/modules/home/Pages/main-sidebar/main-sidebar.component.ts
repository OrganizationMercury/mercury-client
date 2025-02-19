import { Component, OnInit, ViewChild } from '@angular/core';
import { DropdownMenuComponent } from '../../Components/dropdown-menu/dropdown-menu.component';
import { SidebarHeaderComponent } from '../../Components/sidebar-header/sidebar-header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatWithAvatarDto } from '../../../../dto/chat.dto';
import { UserService } from '../../../../services/common/user.service';
import { TokenService } from '../../../../services/common/token.service';
import { ChatCommunicator } from '../../../../services/communicators/chat.communicator';
import { MessagesService } from '../../../../services/common/messages.service';
import { MessageDto } from '../../../../dto/message.dto';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.css'
})
export class MainSidebarComponent implements OnInit {
  @ViewChild('header') header!: SidebarHeaderComponent;
  menuItems: {image:string, text:string, onClick: (event: MouseEvent) => void}[];
  headerButtonIcon = 'assets/menu.svg';
  addGroupChatIcon = 'assets/edit-white.svg';
  lastMessages: { [chatId: string]: MessageDto } = {};
  public chats: ChatWithAvatarDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private userService: UserService, 
    private tokenService: TokenService,
    private chatCommunicator: ChatCommunicator,
    public messages: MessagesService
  ) {
    this.menuItems = [
      {image:'assets/friends.svg', text:' Friends ', onClick: this.friendsClick},
      {image:'assets/settings.svg', text:' Settings ', onClick: this.settingsClick},
      {image:'assets/friend-recommendations.svg', text: ' Recommendations ', onClick: this.recommendationsClick}
    ];
  }
  
  ngOnInit(): void {
    var userId = this.tokenService.decodedToken.jti!;
    this.userService.getUserChatsWithAvatars(userId).subscribe(response => {
      this.chats = response;

      this.chats.forEach(chat => {
        console.log('chat', chat)
        this.loadLastMessage(chat.id);
      });
    });

    this.chatCommunicator.getChat$().subscribe(newChat => {
      this.chats.push(newChat);
    });
  }

  loadLastMessage(chatId: string) {
    if (this.lastMessages[chatId]) {
      return;
    }

    this.messages.getLastMessage(chatId).subscribe(message => {
      this.lastMessages[chatId] = message;
    });
  }

  getLastMessage(chatId: string): MessageDto {
    return this.lastMessages[chatId];
  }

  //TODO: Не работает отправка сообщений без перезагрузки(возможно имеется ввиду при создании нового чата)
  //TODO: Клик на аватар пользователя в груповом или комменатириях кидает в профиль
  openMenu = (event: MouseEvent) => {
    if(this.header.mainMenu.length > 0) return;
    let menu = this.header.mainMenu.createComponent(DropdownMenuComponent);
    menu.instance.mainMenu = this.header.mainMenu;
    menu.instance.menuItems = this.menuItems;
    event.stopPropagation();
  }

  settingsClick = () => {
    this.router.navigateByUrl('home/account/info');
  }
  friendsClick = () => {
    this.router.navigateByUrl('home/friends');
  }
  recommendationsClick = () => {
    this.router.navigateByUrl('home/recommendations');
  }
  addChatClick() {
    this.router.navigateByUrl('home/chat/add');
  }
  toChatClick(chatId: string) {
    this.router.navigate( [{ outlets: { main: ['chat', chatId]} }], { relativeTo: this.route.parent } );
  }
}
