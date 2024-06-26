import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../dto/auth.dto';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) { }

  loginForm = new FormGroup({
    UserName: new FormControl(),
    Password: new FormControl()
  });

  onFormSubmit() {
    var loginDto: LoginDto = {
      UserName: this.loginForm.controls.UserName.value,
      Password: this.loginForm.controls.Password.value
    };
    //TODO: incorrect username/password добавить
    this.authService.login(loginDto).subscribe();
  }
}
