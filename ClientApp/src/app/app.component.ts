import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { DropdownMenuComponent } from './modules/dropdown-menu/dropdown-menu.component';
import { ChatComponent } from './modules/chat/chat.component';
import { CommonModule } from '@angular/common';
import { ButtonService } from './services/ButtonService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, ChatComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterContentChecked{
  @ViewChild('selectedSidebar', { read: ViewContainerRef }) sidebarContainer!: ViewContainerRef;
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  constructor(private buttonService: ButtonService, private detector: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    //Сомнительно, надо погуглить еще. не очень использовать и детект и ngAfterContent...
    this.buttonService.setSrc('../../../assets/menu.svg');
    this.buttonService.setClick(this.openMenu);
    this.detector.detectChanges();
  }

  openMenu = (event: MouseEvent) => {
    if(this.sidebar.mainMenu.length === 0){
      let menu = this.sidebar.mainMenu.createComponent(DropdownMenuComponent);
      menu.instance.mainMenu = this.sidebar.mainMenu;
      menu.instance.menuItems = this.sidebar.menuItems;
      event.stopPropagation();
    }
  }
}
