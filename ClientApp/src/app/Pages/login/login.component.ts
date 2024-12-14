import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/common/auth.service';
import { LoginDto } from '../../dto/auth.dto';
import { Router } from '@angular/router';
import { TokenService } from '../../services/common/token.service';
import { SignalrService } from '../../services/common/signalr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private router: Router, 
    private authService: AuthService, 
    private tokenService: TokenService,
    private signalRService: SignalrService  
  ) { }

  isError: boolean = false;
  loginForm = new FormGroup({
    UserName: new FormControl('', [
      Validators.required,
    ]),
    Password: new FormControl('', [
      Validators.required,
    ]),
  });

  onFormSubmit() {
    var loginDto: LoginDto = {
      UserName: this.loginForm.controls.UserName.value!,
      Password: this.loginForm.controls.Password.value!
    };
    this.authService.login(loginDto).subscribe({
      next: token => {
        this.tokenService.token = token;
        this.signalRService.Connect();
        this.router.navigateByUrl('home');
      },
      error: error => {
        if (error.status === 401 || error.status === 404) {
          this.isError = true;
        }
      }
    });
  }
}
