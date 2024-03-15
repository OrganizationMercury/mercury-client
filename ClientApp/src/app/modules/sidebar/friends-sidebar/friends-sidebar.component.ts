import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-friends-sidebar',
  templateUrl: './friends-sidebar.component.html',
  styleUrl: './friends-sidebar.component.css'
})
export class FriendsSidebarComponent {
  @Output() sidebarModeEvent = new EventEmitter<string>();
  headerButtonIcon = 'assets/arrow-left.svg';

  toMainSidebar = (event: MouseEvent) => {
    this.sidebarModeEvent.emit('main');
  }
}
