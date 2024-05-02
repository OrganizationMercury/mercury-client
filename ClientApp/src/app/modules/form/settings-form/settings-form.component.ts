import { Component, Input } from '@angular/core';
import { UpdateUserDto, UserDto } from '../../../dto/user.dto';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.css'
})
export class SettingsFormComponent {
  @Input() userData?: UserDto;
  @Input() userAvatarUrl?: string;
  constructor(private userService: UserService) { }

  applyForm = new FormGroup({
    Firstname: new FormControl(this.userData?.firstname),
    Lastname: new FormControl(this.userData?.lastname),
    Bio: new FormControl(this.userData?.bio),
    Username: new FormControl(this.userData?.username),
    File: new FormControl()
  });

  updateImageSrc(inputEvent: Event, image: any) {
    const input = inputEvent.target as HTMLInputElement;
    const file = input.files![0];
    this.applyForm.controls.File.setValue(file);

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      image.src = event.target!.result;
    };
    
    reader.readAsDataURL(file);
  }

  onFormSubmit = () => {
    const { Firstname, Lastname, Username, Bio, File } = this.applyForm.value;
    let updateUserDto: UpdateUserDto = {
      id: "8e82ad0d-5e7d-46a8-a254-c7d7ccd7dcfa",
      firstname: Firstname,
      lastname: Lastname,
      username: Username,
      bio: Bio,
      file: File 
    };
    this.userService.updateUser(updateUserDto).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error:', error);
    });
  }
}
