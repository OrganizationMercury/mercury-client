import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/common/user.service';
import { UserWithAvatarDto } from '../../../../dto/user.dto';
import { ChatsService } from '../../../../services/common/chats.service';
import { SignalrService } from '../../../../services/common/signalr.service';
import { pipe, tap } from 'rxjs';
import { TokenService } from '../../../../services/common/token.service';

@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrl: './add-chat.component.css'
})
export class AddChatComponent implements OnInit {
  addChatForm: FormGroup;
  headerButtonIcon = 'assets/arrow-left.svg';
  submitIcon = 'assets/arrow-right-white.svg';
  users!: UserWithAvatarDto[]; 
  isUserSelectionStage = true; 
  chatAvatarUrl = 'assets/default-avatar.svg';

  constructor(
    private builder: FormBuilder, 
    private router: Router, 
    private userService: UserService,
    private chatsService: ChatsService,
    private hub: SignalrService,
    token: TokenService
  ) {
    var userId = token.decodedToken.jti;
    this.addChatForm = new FormGroup({
      selectedUsers: new FormArray([new FormControl(userId)]),
      name: new FormControl(null),
      avatar: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.userService.getUserInterlocutors().subscribe(response =>
      this.users = response
    );
  }

  onCheckboxChange(event: any) {
    const selectedUsers = this.addChatForm.controls['selectedUsers'] as FormArray;
    if (event.target.checked) {
      selectedUsers.push(this.builder.control(event.target.value));
    } else {
      const index = selectedUsers.controls.findIndex(x => x.value === event.target.value);
      selectedUsers.removeAt(index);
    }
  }

  updateImageSrc(inputEvent: Event, image: any) {
    const input = inputEvent.target as HTMLInputElement;
    const file = input.files![0];
    this.addChatForm.controls['avatar'].setValue(file);

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      image.src = event.target!.result;
    }
    
    reader.readAsDataURL(file);
  }

  submitForm() {
    var { selectedUsers, name, avatar } = this.addChatForm.value;

    this.chatsService.addChat(selectedUsers, name, avatar)
      .pipe(
        tap(response => {
          this.hub.GroupChatCreated(response);
        })
      ).subscribe()
    
    this.router.navigateByUrl('home');
  }
  toMainSidebar = (event: MouseEvent) => {
    this.router.navigateByUrl('home');
  }
}
