import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { DropdownMenuComponent } from '../../Components/dropdown-menu/dropdown-menu.component';
import { SidebarHeaderComponent } from '../../Components/sidebar-header/sidebar-header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.css',
})
export class MainSidebarComponent {
  @ViewChild('header') header!: SidebarHeaderComponent;
  @Output() sidebarModeEvent = new EventEmitter<string>();
  menuItems: {image:string, text:string, onClick: (event: MouseEvent) => void}[];
  headerButtonIcon = 'assets/menu.svg';

  constructor(private router: Router) {
    this.menuItems = [
      {image:'assets/friends.svg', text:' Friends ', onClick: this.friendsClick},
      {image:'assets/settings.svg', text:' Settings ', onClick: this.settingsClick},
      {image:'assets/friend-recommendations.svg', text: ' Recommendations ', onClick: this.recommendationsClick}
    ];
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
}
