import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/common/auth.service';
import { LoginDto } from '../../dto/auth.dto';
import { Router } from '@angular/router';
import { TokenService } from '../../services/common/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService, private tokenService: TokenService) { }

  isError: boolean = false;
  loginForm = new FormGroup({
    UserName: new FormControl(),
    Password: new FormControl()
  });

  onFormSubmit() {
    var loginDto: LoginDto = {
      UserName: this.loginForm.controls.UserName.value,
      Password: this.loginForm.controls.Password.value
    };
    this.authService.login(loginDto).subscribe({
      next: token => {
        console.log(`token received: ${token}`);
        this.tokenService.token = token;
        this.router.navigateByUrl('home');
      },
      error: error => {
        console.log('error');
        if (error.status === 401 || error.status === 404) {
          console.log('if');
          this.isError = true;
        }
      }
    });
  }
}
