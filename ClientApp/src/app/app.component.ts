import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DropdownMenuComponent } from './modules/dropdown-menu/dropdown-menu.component';
import { ChatComponent } from './modules/chat/chat.component';
import { CommonModule } from '@angular/common';
import { SidebarModule } from './modules/sidebar/sidebar.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarModule, ChatComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sidebarMode = 'main';
  
  handleModeEvent(event: string) {
    this.sidebarMode = event;
  }
}
