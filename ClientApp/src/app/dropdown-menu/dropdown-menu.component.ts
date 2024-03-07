import { AfterViewInit, Component, ElementRef, HostListener, Input, Renderer2, ViewContainerRef, input } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css'
})
export class DropdownMenuComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() menuContainer! : ViewContainerRef;

  deleteComponent() {
    this.renderer.addClass(this.el.nativeElement, 'fade-out');
    setTimeout(() => {
      this.menuContainer.clear();
      }, 500); 
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.deleteComponent();
    }
  }
}
