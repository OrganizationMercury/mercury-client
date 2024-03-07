import { ViewContainerRef, ViewChild, Component } from '@angular/core';
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
  @ViewChild('menuContainer', { read: ViewContainerRef }) menuContainer!: ViewContainerRef;

  openMenu = (event: MouseEvent) => {
    if(this.menuContainer.length === 0){
      let menu = this.menuContainer.createComponent(DropdownMenuComponent);
      menu.instance.menuContainer = this.menuContainer;
      event.stopPropagation();
    }
  }
}
