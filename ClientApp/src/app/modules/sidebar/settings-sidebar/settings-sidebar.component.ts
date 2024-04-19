import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserDto } from '../../../dto/user.dto';


@Component({
  selector: 'app-settings-sidebar',
  templateUrl: './settings-sidebar.component.html',
  styleUrl: './settings-sidebar.component.css'
})
export class SettingsSidebarComponent {
  @Output() sidebarModeEvent = new EventEmitter<string>();

  userData? : UserDto;
  userAvatarUrl?: string; 
  headerButtonIcon = 'assets/arrow-left.svg';
  isFormOpen = false;

  constructor(userService: UserService) {
    userService.getUserAvatar().subscribe(response => {
      console.log(response);
      this.userAvatarUrl = response;
    });
    userService.getUserById().subscribe(response => {
      console.log(response);
      this.userData = response as UserDto;
    })
   }

  toMainSidebar = () => {
    this.sidebarModeEvent.emit('main');
  }
}
