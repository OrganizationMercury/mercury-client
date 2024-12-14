import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-item',
  standalone: true,
  imports: [],
  templateUrl: './chat-item.component.html',
  styleUrl: './chat-item.component.css'
})
export class ChatItemComponent {
  @Input() userIcon: string = "";
  @Input() fullName!: string;
  @Input() message!: string;
}
