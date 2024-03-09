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
  @Input() containerClass!: string;
  @HostBinding('class') get hostClasses() {
    return this.containerClass;
  }
  menuItems: {image:string, text:string}[] = [
    {image:'../../assets/friends.svg', text:' Friends '},
    {image:'../../assets/settings.svg', text:' Settings '}]

  openMenu = (event: MouseEvent) => {
    if(this.mainMenu.length === 0){
      let menu = this.mainMenu.createComponent(DropdownMenuComponent);
      menu.instance.mainMenu = this.mainMenu;
      menu.instance.menuItems = this.menuItems;
      event.stopPropagation();
    }
  }
}
