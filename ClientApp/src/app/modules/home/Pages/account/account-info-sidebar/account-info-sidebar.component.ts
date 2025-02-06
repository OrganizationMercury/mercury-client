import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from '../../../../../services/common/user.service';
import { UserDto, InterestDto } from '../../../../../dto/user.dto';
import { Router } from '@angular/router';
import { PostDto } from '../../../../../dto/post.dt';
import { PostService } from '../../../../../services/common/post.service';


@Component({
  selector: 'app-account-info-sidebar',
  templateUrl: './account-info-sidebar.component.html',
  styleUrl: './account-info-sidebar.component.css'
})
export class AccountInfoSidebarComponent {
  userData? : UserDto = undefined;
  userAvatarUrl?: string; 
  userInterests?: InterestDto[] = undefined;
  postList?: PostDto[] = [];
  isFormOpen = false;
  selectedPost: PostDto | null = null;
  isDropdownVisible = false; 
  dropdownPosition = { x: 0, y: 0 };
  isModalVisible: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private postService: PostService
  ) {
    postService.getPosts().subscribe(response =>{
      this.postList = response;
    });
    userService.getUserInterests().subscribe(response => {
      this.userInterests = response as InterestDto[];
    });
    userService.getUserAvatar().subscribe({ 
      next: response => {
        this.userAvatarUrl = response;
      }, error: _ => {
        this.userAvatarUrl = 'assets/default-avatar.svg';
      }
    });
    userService.getUser().subscribe(response => {
      this.userData = response as UserDto;
    });
  }

  //TODO: чекнуть комменты, когда захожу к другому пользователю

  applyForm = new FormGroup({
    Name: new FormControl(''),
  });

  onFormSubmit = () => {
    const { Name } = this.applyForm.value;
    const interest: InterestDto = { name: Name! };
    this.userService.linkUserInterest(interest).subscribe(
      _ => {
        this.userInterests?.push(interest);
        this.applyForm.reset();
      },
      error => {
        console.error('Error:', error);
    });
  }

  unlinkInterest = (interestName: string) => {
    const interest: InterestDto = { name: interestName };
    this.userService.unlinkUserInterest(interest).subscribe(
      response => {
        const indexToRemove = this.userInterests!.findIndex(interestItem => interestItem.name === interest.name);
        if (indexToRemove !== -1) {
          this.userInterests!.splice(indexToRemove, 1);
        }
      },
      error => {
        console.error('Error:', error);
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.postService.addPost(file).subscribe(post => {
          this.postList?.push(post);
        });
      };
      reader.readAsDataURL(file);
    }

    input.value = '';
  }
  
  openModal(post: PostDto): void {
    this.selectedPost = post;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedPost = null;
  }

  deletePost(post: PostDto) {
    this.postService.deletePost(post.id)
      .subscribe(_ => {
        this.postList = this.postList?.filter(p => p !== post); 
        this.closeDropdown();
      });
  }

  onRightClick(event: MouseEvent, post: PostDto): void {
    event.preventDefault();
    this.isDropdownVisible = true;
    this.dropdownPosition = { x: event.clientX, y: event.clientY };
    this.selectedPost = post;
  }

  closeDropdown(): void {
    this.isDropdownVisible = false;
    this.selectedPost = null;
  }
}