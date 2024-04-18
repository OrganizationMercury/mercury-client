import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-settings-sidebar',
  templateUrl: './settings-sidebar.component.html',
  styleUrl: './settings-sidebar.component.css'
})
export class SettingsSidebarComponent {
  @Output() sidebarModeEvent = new EventEmitter<string>();
  headerButtonIcon = 'assets/arrow-left.svg';
  isFormOpen = false;

  toMainSidebar = () => {
    this.sidebarModeEvent.emit('main');
  }
}
