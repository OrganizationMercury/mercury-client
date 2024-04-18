import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { SidebarModule } from './sidebar/sidebar.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, ChatComponent, SidebarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sidebarMode = 'main';
  
  handleModeEvent(event: string) {
    this.sidebarMode = event;
  }
}
