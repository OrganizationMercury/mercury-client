import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-round-button',
  templateUrl: './round-button.component.html',
  styleUrl: './round-button.component.css'
})
export class RoundButtonComponent{
  @Input() buttonIcon!: string;
}
