import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { DropdownMenuComponent } from '../../dropdown-menu/dropdown-menu.component';
import { SidebarHeaderComponent } from '../sidebar-header/sidebar-header.component';

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

  constructor() {
    this.menuItems = [
      {image:'assets/friends.svg', text:' Friends ', onClick: this.friendsClick},
      {image:'assets/settings.svg', text:' Settings ', onClick: this.settingsClick}];
  }

  openMenu = (event: MouseEvent) => {
    if(this.header.mainMenu.length > 0) return;
    let menu = this.header.mainMenu.createComponent(DropdownMenuComponent);
    menu.instance.mainMenu = this.header.mainMenu;
    menu.instance.menuItems = this.menuItems;
    event.stopPropagation();
  }

  settingsClick = (event: MouseEvent) => {
    this.sidebarModeEvent.emit('settings');
  }
  friendsClick = (event: MouseEvent) => {
    this.sidebarModeEvent.emit('friends');
  }
}
