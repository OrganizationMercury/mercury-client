import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-round-button',
  standalone: true,
  imports: [],
  templateUrl: './round-button.component.html',
  styleUrl: './round-button.component.css'
})
export class RoundButtonComponent {
  @Input() src!: string;
}
