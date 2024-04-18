import { Component } from '@angular/core';
import { UpdateUserDto } from '../../../dto/user.dto';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.css'
})
export class SettingsFormComponent {
  constructor(private userService: UserService) { }

  applyForm = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    Bio: new FormControl(''),
    Username: new FormControl(''),
    File: new FormControl()
  });

  updateImageSrc(inputEvent: Event, image: any) {
    const input = inputEvent.target as HTMLInputElement;
    const file = input.files![0];
    console.log(file);
    this.applyForm.controls.File.setValue(file);

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      image.src = event.target!.result;
    };
    
    reader.readAsDataURL(file);
  }

  onFormSubmit = () => {
    let updateUserDto: UpdateUserDto = {
      id: "8e82ad0d-5e7d-46a8-a254-c7d7ccd7dcfa",
      firstname: this.applyForm.value.FirstName,
      lastname: this.applyForm.value.LastName,
      username: this.applyForm.value.Username,
      bio: this.applyForm.value.Bio,
      file: this.applyForm.value.File 
    };
    console.log(updateUserDto);
    this.userService.updateUser(updateUserDto).subscribe(response => {
      console.log(response);
    });
  }
}
