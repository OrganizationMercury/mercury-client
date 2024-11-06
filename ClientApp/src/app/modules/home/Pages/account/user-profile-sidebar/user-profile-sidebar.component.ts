import { Component } from '@angular/core';
import { InterestDto, UserDto } from '../../../../../dto/user.dto';
import { UserService } from '../../../../../services/common/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../../../services/common/token.service';
import { ChatsService } from '../../../../../services/common/chats.service';
import { firstValueFrom } from 'rxjs';
import { ChatDto } from '../../../../../dto/chat.dto';

@Component({
  selector: 'app-user-profile-sidebar',
  templateUrl: './user-profile-sidebar.component.html',
  styleUrl: './user-profile-sidebar.component.css'
})
export class UserProfileSidebarComponent {
  userId?: string | null;
  userData? : UserDto = undefined;
  userAvatarUrl?: string; 
  userInterests?: InterestDto[] = undefined;
  isFormOpen = false;

  constructor(
    private userService: UserService, 
    private router: Router, 
    private route: ActivatedRoute, 
    public tokenService: TokenService,
    public chats: ChatsService)
  {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');

      userService.getUserInterestsById(this.userId!).subscribe(response => {
        this.userInterests = response as InterestDto[];
        console.log('user interests: ', this.userInterests)
      });
      console.log(`user interests: ${this.userInterests}`)
      userService.getUserAvatarById(this.userId!).subscribe(response => {
        this.userAvatarUrl = response;
      }, _ => {
        this.userAvatarUrl = 'assets/default-avatar.svg';
      });
      userService.getUserById(this.userId!).subscribe(response => {
        this.userData = response as UserDto;
      });
    });
  }

  toChat() {
    var decoded = this.tokenService.decodedToken;
    var thisUserId = decoded.jti;
    this.chats.getPrivateChat(thisUserId!, this.userId!).subscribe({
      next: chat => {
        this.router.navigate( [{ outlets: { primary: ['home'], main: ['chat', chat.id]} }] );
      },
      error: err => {
        this.router.navigate( [{ outlets: { primary: ['home'], main: ['chat']} }],
          { queryParams: { userId: this.userId }} 
        );
      }
    });
  }
}
