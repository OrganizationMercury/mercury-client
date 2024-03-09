import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ButtonService {
    private src = new Subject<string>();
    private click = new Subject<(event: MouseEvent) => void>();

    src$ = this.src.asObservable();
    click$ = this.click.asObservable();

    setSrc(src: string) {
        this.src.next(src);
      }
    
    setClick(click: (event: MouseEvent) => void) {
        this.click.next(click);
    }
}