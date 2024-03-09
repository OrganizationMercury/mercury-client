import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, Renderer2, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css'
})
export class DropdownMenuComponent {
  @Input() mainMenu! : ViewContainerRef;
  @Input() menuItems! : {image:string, text:string}[];

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  deleteComponent() {
    this.renderer.addClass(this.el.nativeElement, 'fade-out');
    setTimeout(() => {
      this.mainMenu.clear();
      }, 500); 
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.deleteComponent();
    }
  }
}
