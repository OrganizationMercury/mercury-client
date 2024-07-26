import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InterestDto, UserDto } from '../../../../dto/user.dto';
import { UserService } from '../../../../services/common/user.service';
import { RecommendationService } from '../../../../services/common/recommendation.service';

@Component({
  selector: 'app-recommendations-sidebar',
  templateUrl: './recommendations-sidebar.component.html',
  styleUrl: './recommendations-sidebar.component.css'
})
export class RecommendationsSidebarComponent {
  headerButtonIcon = 'assets/arrow-left.svg';
  userData? : UserDto;
  userAvatarUrl?: string; 
  userInterests?: InterestDto[];
  index = 0;
  constructor(private router: Router, private userService: UserService, private recommendationService: RecommendationService) {
    recommendationService.recommend(this.index).subscribe(response => {
      this.userData = response as UserDto;
      console.log('user data', this.userData);
    
      userService.getUserAvatarById(this.userData?.id!).subscribe(response => {
        this.userAvatarUrl = response;
      }, _ => {
        this.userAvatarUrl = 'assets/default-avatar.svg';
      });
    });
    console.log(this.userData);
   }

  toMainSidebar = (event: MouseEvent) => {
    this.router.navigateByUrl('home');
  }

  nextUser() {
    this.index++;
    this.recommendationService.recommend(this.index).subscribe(response => {
      this.userData = response as UserDto;
      console.log('user data', this.userData);
    
      this.userService.getUserAvatarById(this.userData?.id!).subscribe(response => {
        this.userAvatarUrl = response;
      }, _ => {
        this.userAvatarUrl = 'assets/default-avatar.svg';
      });
    }, error => {
      this.index = -1;
      this.nextUser();
    });
  }

  toProfile() {
    this.router.navigate(['home', 'account', 'profile', this.userData?.id]);
  }
}
