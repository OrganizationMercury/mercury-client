import { Component, OnInit } from '@angular/core';
import { InterestDto, UserDto } from '../../../../../dto/user.dto';
import { UserService } from '../../../../../services/common/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../../../services/common/token.service';
import { ChatsService } from '../../../../../services/common/chats.service';
import { firstValueFrom } from 'rxjs';
import { ChatDto } from '../../../../../dto/chat.dto';
import { PostDto } from '../../../../../dto/post.dt';
import { PostService } from '../../../../../services/common/post.service';

@Component({
  selector: 'app-user-profile-sidebar',
  templateUrl: './user-profile-sidebar.component.html',
  styleUrl: './user-profile-sidebar.component.css'
})
export class UserProfileSidebarComponent implements OnInit {
  userId?: string | null;
  userData? : UserDto = undefined;
  userAvatarUrl?: string; 
  userInterests?: InterestDto[] = undefined;
  isFormOpen = false;
  postList?: PostDto[] = [];
  selectedPost: PostDto | null = null;
  isModalVisible: boolean = false;

  constructor(
    private userService: UserService, 
    private router: Router, 
    private route: ActivatedRoute, 
    public tokenService: TokenService,
    public chats: ChatsService,
    public postService: PostService
  )
  {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');

      postService.getPostsByUserId(this.userId!).subscribe(response => {
        this.postList = response;
      });

      userService.getUserInterestsById(this.userId!).subscribe(response => {
        this.userInterests = response as InterestDto[];
      });
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

  ngOnInit(): void {
  }

  toChat() {
    var decoded = this.tokenService.decodedToken;
    var thisUserId = decoded.jti;
    this.chats.getPrivateChat(thisUserId!, this.userId!).subscribe({
      next: chat => {
        this.router.navigate([
          '/home',
          { outlets: { primary: null, main: ['chat', chat.id]} }] );
      },
      error: err => {
        this.router.navigate([
          '/home',
          { outlets: { primary: null, main: ['user', this.userId, 'chat']} }]);
      }
    });
  }

  openModal(post: PostDto): void {
    this.selectedPost = post;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedPost = null;
  }
}
