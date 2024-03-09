import { Component, OnInit, HostListener } from '@angular/core';
import { ButtonService } from '../../services/ButtonService';

@Component({
  selector: 'app-round-button',
  standalone: true,
  imports: [],
  templateUrl: './round-button.component.html',
  styleUrl: './round-button.component.css'
})
export class RoundButtonComponent implements OnInit{
  buttonIcon!: string;

  constructor(private buttonService: ButtonService) {}


  ngOnInit(): void {
    this.buttonService.src$.subscribe(src => this.buttonIcon = src);
    this.buttonService.click$.subscribe(click => this.onClick = click);
  }

  @HostListener('click', ['$event']) onClick!: (event: MouseEvent) => void;
}
