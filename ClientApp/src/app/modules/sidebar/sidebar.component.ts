import { ViewContainerRef, ViewChild, Component, Input, HostBinding } from '@angular/core';
import { RoundButtonComponent } from '../round-button/round-button.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RoundButtonComponent, SearchBarComponent, DropdownMenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @ViewChild('mainMenu', { read: ViewContainerRef }) mainMenu!: ViewContainerRef;
  @Input() selectedSidebar!: ViewContainerRef;
  @Input() containerClass!: string;
  @HostBinding('class') get hostClasses() {
    return this.containerClass;
  }
  settingsClick = () => {
    let sidebar = this.selectedSidebar.createComponent(SidebarComponent);
    sidebar.instance.containerClass = 'secondary-container';
  }
  friendsClick = () => {}
  
  menuItems: {image:string, text:string, onClick:VoidFunction}[] = [
    {image:'../../assets/friends.svg', text:' Friends ', onClick: this.friendsClick},
    {image:'../../assets/settings.svg', text:' Settings ', onClick: this.settingsClick}]
}
