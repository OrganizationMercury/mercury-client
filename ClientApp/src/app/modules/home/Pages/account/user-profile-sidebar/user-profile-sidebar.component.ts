import { Component } from '@angular/core';
import { InterestDto, UserDto } from '../../../../../dto/user.dto';
import { UserService } from '../../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
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
}
