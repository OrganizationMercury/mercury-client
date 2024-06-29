import { FormGroup, FormControl } from '@angular/forms';
import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../../../services/user.service';
import { UserDto, InterestDto } from '../../../../../dto/user.dto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account-info-sidebar',
  templateUrl: './account-info-sidebar.component.html',
  styleUrl: './account-info-sidebar.component.css'
})
export class AccountInfoSidebarComponent {
  @Output() sidebarModeEvent = new EventEmitter<string>();

  userData? : UserDto;
  userAvatarUrl?: string; 
  userInterests?: InterestDto[];
  isFormOpen = false;

  constructor(private userService: UserService, private router: Router) {
    userService.getUserInterests().subscribe(response => {
      this.userInterests = response as InterestDto[];
    });
    userService.getUserAvatar().subscribe(response => {
      this.userAvatarUrl = response;
    }, _ => {
      this.userAvatarUrl = 'assets/default-avatar.svg';
    });
    userService.getUserById().subscribe(response => {
      this.userData = response as UserDto;
      console.log('user data', this.userData);
    });
    console.log(this.userData);
  }

  applyForm = new FormGroup({
    Name: new FormControl(''),
  });

  onFormSubmit = () => {
    const { Name } = this.applyForm.value;
    const interest: InterestDto = { name: Name! };
    this.userService.linkUserInterest(interest).subscribe(
      _ => {
        this.userInterests?.push(interest);
        this.applyForm.reset();
      },
      error => {
        console.error('Error:', error);
    });
  }

  unlinkInterest = (interestName: string) => {
    const interest: InterestDto = { name: interestName };
    this.userService.unlinkUserInterest(interest).subscribe(
      response => {
        console.log(response)
        const indexToRemove = this.userInterests!.findIndex(interestItem => interestItem.name === interest.name);
        if (indexToRemove !== -1) {
          this.userInterests!.splice(indexToRemove, 1);
        }
      },
      error => {
        console.error('Error:', error);
    });;
  }
}
