import { Component, Input } from '@angular/core';
import { UpdateUserDto, UserDto } from '../../../../../dto/user.dto';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../../../services/common/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'update-account',
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css'
})
export class UpdateAccountComponent {
  @Input() userData?: UserDto;
  @Input() userAvatarUrl?: string;
  constructor(private userService: UserService, private router: Router) {
    userService.getUserAvatar().subscribe(response => {
      this.userAvatarUrl = response;
    }, _ => {
      this.userAvatarUrl = 'assets/default-avatar.svg';
    });
    userService.getUser().subscribe(response => {
      this.userData = response as UserDto;
    });
  }

  applyForm = new FormGroup({
    Firstname: new FormControl(this.userData?.firstName),
    Lastname: new FormControl(this.userData?.lastName),
    Bio: new FormControl(this.userData?.bio),
    Username: new FormControl(this.userData?.userName),
    File: new FormControl()
  });

  updateImageSrc(inputEvent: Event, image: any) {
    const input = inputEvent.target as HTMLInputElement;
    const file = input.files![0];
    this.applyForm.controls.File.setValue(file);

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      image.src = event.target!.result;
    }
    
    reader.readAsDataURL(file);
  }

  onFormSubmit = () => {
    var { Firstname, Lastname, Username, Bio, File } = this.applyForm.value;
    if(File === null){
      fetch('assets/default-avatar.jpg')
      .then(response => File = response.blob());
    }
    let updateUserDto: UpdateUserDto = {
      firstname: Firstname,
      lastname: Lastname,
      username: Username,
      bio: Bio,
      file: File 
    };
    this.userService.updateUser(updateUserDto).subscribe(
      response => {
        this.router.navigateByUrl('home/account/info');
      },
      error => {
        console.error('Error:', error);
    });
  }
}
