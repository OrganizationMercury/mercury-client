import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PostDto } from '../../../../dto/post.dt';
import { PostService } from '../../../../services/common/post.service';
import { Router } from '@angular/router';

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
  postImage?: string;
  isLiked = false;
  likeIcon = 'assets/like.svg';

  constructor(readonly postService: PostService, readonly router: Router) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && this.post) {
      this.postService.isLiked(this.post?.id!).subscribe(response => {
        this.isLiked = response;
        this.likeIcon = this.isLiked ? 'assets/like-red.svg' : 'assets/like.svg'; 
        console.log(this.post);
      });
    }
  }

  closeModal(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close.emit(); 
    }
  }

  onLike(): void {
    const likeAction$ = this.isLiked
        ? this.postService.unlikePost(this.post?.id!)
        : this.postService.likePost(this.post?.id!);

    likeAction$.subscribe(_ => {
      this.isLiked = !this.isLiked;
      this.likeIcon = this.isLiked ? 'assets/like-red.svg' : 'assets/like.svg';
    })
  }

  onComment(): void {
    this.router.navigate([
      '/home',
      { outlets: { primary: null, main: ['chat', this.post?.commentsId]} }] );
  }
}
