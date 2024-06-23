import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDto } from '../../dto/auth.dto';
import { AuthService } from '../../services/auth.service';
import { hasLowercase, hasNumber, hasSpecialSymbol, hasUppercase } from '../../services/validators/auth.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router, private authService: AuthService) { }

  registerForm = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl(),
    UserName: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
    ]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      hasUppercase(),
      hasLowercase(),
      hasNumber(), 
      hasSpecialSymbol()
    ]),
  });

  onFormSubmit() {
    var { FirstName, LastName, UserName, Password } = this.registerForm.controls;

    var registerDto: RegisterDto = {
      FirstName: FirstName.value!,
      LastName: LastName.value,
      UserName: UserName.value!,
      Password: Password.value!
    };

    //TODO: CHECK IF USERNAME ALREADY EXISTS 

    this.authService.register(registerDto).subscribe(
      response => {
        console.log('Успешная регистрация:', response);
        this.router.navigateByUrl('home');
      },
      error => {
        console.error('Ошибка регистрации:', error);
      });
  }

  get password() {
    return this.registerForm.controls.Password;
  }

  get firstname() {
    return this.registerForm.controls.FirstName;
  }

  get username() {
    return this.registerForm.controls.UserName;
  }
}
