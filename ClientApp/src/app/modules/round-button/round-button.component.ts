import { Component, Input, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-round-button',
  standalone: true,
  imports: [],
  templateUrl: './round-button.component.html',
  styleUrl: './round-button.component.css'
})
export class RoundButtonComponent implements OnInit{
  buttonIcon!: string;
  
  ngOnInit(): void {
      
  }

  @HostListener('click', ['$event']) onClick() {

  }
}
