import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends-sidebar',
  templateUrl: './friends-sidebar.component.html',
  styleUrl: './friends-sidebar.component.css'
})
export class FriendsSidebarComponent {
  @Output() sidebarModeEvent = new EventEmitter<string>();
  headerButtonIcon = 'assets/arrow-left.svg';

  constructor(private router: Router) { }

  toMainSidebar = (event: MouseEvent) => {
    this.router.navigateByUrl('home');
  }
}
