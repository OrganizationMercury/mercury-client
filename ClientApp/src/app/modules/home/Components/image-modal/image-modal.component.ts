import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { LikeDto, PostDto } from '../../../../dto/post.dt';
import { PostService } from '../../../../services/common/post.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../../services/common/token.service';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.css'
})

export class ImageModalComponent implements OnChanges {
  @Input() post: PostDto | null = null; 
  @Input() isVisible: boolean = false; 

  @Output() close = new EventEmitter<void>();
  isLiked = false;
  likeIcon = 'assets/like.svg';

  constructor(
    readonly postService: PostService, 
    readonly router: Router,
    readonly tokenService: TokenService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && this.post) {
      this.postService.isLiked(this.post?.id!).subscribe(response => {
        this.isLiked = response;
        this.likeIcon = this.isLiked ? 'assets/like-red.svg' : 'assets/like.svg'; 
      });
    }
  }

  closeModal(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close.emit(); 
    }
  }

  onLike(): void {
    if (!this.post) return; 

    if (this.isLiked) {
      this.postService.unlikePost(this.post?.id!).subscribe(likeId => {
        this.post!.likes = this.post!.likes.filter(like => like.id !== likeId);
        this.isLiked = false;
        this.likeIcon = 'assets/like.svg';
      });
    } else {
      this.postService.likePost(this.post?.id!).subscribe(likeId => {
        const likeDto: LikeDto = { id: likeId, postId: this.post?.id!, userId: '' };
        this.post?.likes.push(likeDto);
        this.isLiked = true;
        this.likeIcon = 'assets/like-red.svg';
      });
    }
  }

  onComment(): void {
    this.router.navigate([
      '/home',
      { outlets: { primary: null, main: ['chat', this.post?.commentsId]} }], 
      { queryParams: { postImage: this.post?.image }} );
  }
}
