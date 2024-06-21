import { Component, ViewChild, Input, ViewContainerRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrl: './sidebar-header.component.css'
})
export class SidebarHeaderComponent {
  @Input() buttonIcon!: string;
  @Input() onClick!: (event: MouseEvent) => void;
  @ViewChild('mainMenu', {read: ViewContainerRef}) mainMenu!: ViewContainerRef;
  @Input() hasSearchbar = true;

  constructor(public detector: ChangeDetectorRef) {}
}
