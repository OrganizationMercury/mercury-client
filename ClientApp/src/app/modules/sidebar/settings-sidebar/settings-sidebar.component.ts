import { FormGroup, FormControl } from '@angular/forms';
import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserDto, InterestDto } from '../../../dto/user.dto';


@Component({
  selector: 'app-settings-sidebar',
  templateUrl: './settings-sidebar.component.html',
  styleUrl: './settings-sidebar.component.css'
})
export class SettingsSidebarComponent {
  @Output() sidebarModeEvent = new EventEmitter<string>();

  userData? : UserDto;
  userAvatarUrl?: string; 
  userInterests?: InterestDto[];
  headerButtonIcon = 'assets/arrow-left.svg';
  isFormOpen = false;

  constructor(private userService: UserService) {
    userService.getUserAvatar().subscribe(response => {
      this.userAvatarUrl = response;
    });
    userService.getUserById().subscribe(response => {
      this.userData = response as UserDto;
    });
    userService.getUserInterests().subscribe(response => {
      this.userInterests = response as InterestDto[];
    });
  }

  applyForm = new FormGroup({
    Name: new FormControl(''),
  });

  toMainSidebar = () => {
    this.sidebarModeEvent.emit('main');
  }

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
