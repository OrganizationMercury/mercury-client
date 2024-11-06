import { Component, OnInit, ViewChild } from '@angular/core';
import { DropdownMenuComponent } from '../../Components/dropdown-menu/dropdown-menu.component';
import { SidebarHeaderComponent } from '../../Components/sidebar-header/sidebar-header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatDto, ChatWithAvatarDto } from '../../../../dto/chat.dto';
import { UserService } from '../../../../services/common/user.service';
import { TokenService } from '../../../../services/common/token.service';
import { ChatCommunicator } from '../../../../services/communicators/chat.communicator';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.css',
})
export class MainSidebarComponent implements OnInit {
  @ViewChild('header') header!: SidebarHeaderComponent;
  menuItems: {image:string, text:string, onClick: (event: MouseEvent) => void}[];
  public chats: ChatWithAvatarDto[] = [];
  headerButtonIcon = 'assets/menu.svg';

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private userService: UserService, 
    private tokenService: TokenService,
    private chatCommunicator: ChatCommunicator
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
    });

    this.chatCommunicator.getChat$().subscribe(newChat => {
      console.log('newChat: ', newChat);
      this.chats.push(newChat);
    });
  }

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
  toChatClick(chatId: string) {
    console.log('Chat ID clicked:', chatId);
    this.router.navigate( [{ outlets: { main: ['chat', chatId]} }], { relativeTo: this.route } );
  }
}
